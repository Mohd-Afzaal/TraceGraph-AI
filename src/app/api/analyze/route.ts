import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { computeDHash, hammingDistance, similarityFromDistance } from "@/lib/hash";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Local Mock Dataset of 10 items
const DATASET = [
  { id: "item_1", platform: "Reddit", hash: "1111000011110000111100001111000011110000111100001111000011110000", url: "https://reddit.com/r/pics/1a2b" },
  { id: "item_2", platform: "Twitter", hash: "1111000011110000111100001111000011110000111100001111000011000000", url: "https://twitter.com/user/status/123" },
  { id: "item_3", platform: "YouTube", hash: "0000111100001111000011110000111100001111000011110000111100001111", url: "https://youtube.com/watch?v=xyz" },
  { id: "item_4", platform: "Instagram", hash: "1111111100000000111111110000000011111111000000001111111100000000", url: "https://instagram.com/p/456" },
  { id: "item_5", platform: "TikTok", hash: "1010101010101010101010101010101010101010101010101010101010101010", url: "https://tiktok.com/@user/video/789" },
  { id: "item_6", platform: "Reddit", hash: "1100110011001100110011001100110011001100110011001100110011001100", url: "https://reddit.com/r/videos/3c4d" },
  { id: "item_7", platform: "Twitter", hash: "1111000011110000111100001111000011110000111100001111000011111111", url: "https://twitter.com/news/status/999" },
  { id: "item_8", platform: "Facebook", hash: "0000000011111111000000001111111100000000111111110000000011111111", url: "https://facebook.com/post/000" },
  { id: "item_9", platform: "Pinterest", hash: "1111000011110000111100001111000011110000000000000000000000000000", url: "https://pinterest.com/pin/111" },
  { id: "item_10", platform: "LinkedIn", hash: "0101010101010101010101010101010101010101010101010101010101010101", url: "https://linkedin.com/post/222" },
];

// Helper to mutate target hash slightly to ensure matches occur based on random or actual uploaded image
function ensureMatchableDataset(sourceHash: string) {
  // We will mutate the DATASET in-memory for this request so it finds matches against the actual uploaded file.
  // This simulates a "real" database that happens to have related content.
  const platforms = ["Reddit", "Twitter", "YouTube", "Instagram", "TikTok", "Facebook"];
  const dynamicDataset = [];

  // Create 3 to 6 matches
  const numMatches = Math.floor(Math.random() * 4) + 3; 
  
  for(let i=0; i < numMatches; i++) {
    const platform = platforms[i % platforms.length];
    
    // Vary similarity: 65% to 98%
    const targetSimilarity = 0.65 + (Math.random() * 0.33);
    const targetDistance = Math.floor((1 - targetSimilarity) * 64);
    
    // Mutate sourceHash by targetDistance bits
    let matchHash = sourceHash.split("");
    let mutatedIndices = new Set();
    while(mutatedIndices.size < targetDistance) {
      mutatedIndices.add(Math.floor(Math.random() * 64));
    }
    mutatedIndices.forEach(idx => {
      matchHash[idx as number] = matchHash[idx as number] === '0' ? '1' : '0';
    });
    
    const finalHash = matchHash.join("");
    const actualSimilarity = similarityFromDistance(hammingDistance(sourceHash, finalHash));
    
    let type = "unrelated";
    let reasoning = "";
    if (actualSimilarity > 0.90) { type = "duplicate"; reasoning = "High structural similarity"; }
    else if (actualSimilarity >= 0.75) { type = "clipped"; reasoning = "Aspect ratio difference / Cropped"; }
    else if (actualSimilarity >= 0.60) { type = "remixed"; reasoning = "Partial visual overlap / Edits detected"; }

    dynamicDataset.push({
      id: `match_${i}_${Date.now()}`,
      platform,
      hash: finalHash,
      similarity: actualSimilarity,
      type,
      reasoning,
      url: `https://${platform.toLowerCase()}.com/post/${Math.random().toString(36).substring(7)}`,
      timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString()
    });
  }
  return dynamicDataset;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fingerprint = await computeDHash(buffer);

    // Generate matches based on the uploaded file's hash (so we always get some results for the demo)
    const matches = ensureMatchableDataset(fingerprint).filter((d) => d.similarity > 0.60);

    // Build Graph JSON
    const nodes: any[] = [
      { id: "original", data: { label: "Original Upload", isOriginal: true, url: "" }, position: { x: 250, y: 50 } },
    ];
    const edges: any[] = [];

    matches.forEach((match, index) => {
      nodes.push({
        id: match.id,
        data: { 
          label: match.platform, 
          similarity: match.similarity, 
          type: match.type, 
          url: match.url,
          reasoning: match.reasoning
        },
        position: { x: 100 + index * 150, y: 200 + (index % 2) * 50 },
      });
      edges.push({
        id: `e-original-${match.id}`,
        source: "original",
        target: match.id,
        label: match.type,
      });
    });

    const graph = { nodes, edges };

    // Alert Generation
    let alert = null;
    const highestSimilarity = Math.max(...matches.map((m) => m.similarity), 0);
    if (highestSimilarity > 0.85) {
      alert = {
        type: "viral_spike",
        severity: "high",
        message: `High similarity content detected on ${matches.find(m => m.similarity === highestSimilarity)?.platform}. Possible viral spread.`,
      };
    }

    // AI Summary via Gemini
    let summary = "AI analysis skipped (no API key).";
    if (process.env.GEMINI_API_KEY) {
      try {
        const platformsData = matches.map((m) => `${m.platform} (${Math.round(m.similarity * 100)}% match, ${m.type})`).join(", ");
        const prompt = `Act as an intelligence analyst tracking media propagation. 
Analyze this spread: Original uploaded. Found matches: ${platformsData}.
Output EXACTLY these 4 lines:
Origin: [Identify likely origin platform based on data or state 'Direct Upload']
Spread: [Briefly explain the path across platforms]
Insight: [Identify transformations like clipping or remixing]
Prediction: [Predict the next likely platform to see this content]
Keep each line to a maximum of 1 sentence.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        summary = response.text || "Failed to generate summary.";
      } catch (err) {
        console.error("Gemini API Error:", err);
        summary = "Error generating AI analysis.";
      }
    }

    return NextResponse.json({
      fingerprint,
      matches,
      graph,
      alert,
      summary,
    });
  } catch (error) {
    console.error("Analyze Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
