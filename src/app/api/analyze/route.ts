import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 1. Generate a mock fingerprint based on filename/time
    const fingerprint = `fp_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;

    // 2. Mock Dataset matching
    const dataset = [
      { id: "match_1", platform: "Reddit", similarity: 0.94, type: "duplicate" },
      { id: "match_2", platform: "Twitter", similarity: 0.87, type: "clipped" },
      { id: "match_3", platform: "YouTube", similarity: 0.76, type: "remixed" },
      { id: "match_4", platform: "TikTok", similarity: 0.45, type: "unrelated" },
    ];

    const matches = dataset.filter((d) => d.similarity > 0.75);

    // 3. Build Graph JSON
    const nodes = [
      { id: "original", data: { label: "Original Upload", isOriginal: true }, position: { x: 250, y: 50 } },
    ];
    const edges = [];

    matches.forEach((match, index) => {
      nodes.push({
        id: match.id,
        data: { label: match.platform, similarity: match.similarity, type: match.type },
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

    // 4. Alert Generation
    let alert = null;
    const highestSimilarity = Math.max(...matches.map((m) => m.similarity), 0);
    if (highestSimilarity > 0.85) {
      alert = {
        type: "viral_spike",
        severity: "high",
        message: `High similarity content detected on ${matches.find(m => m.similarity === highestSimilarity)?.platform}. Possible viral spread.`,
      };
    }

    // 5. AI Summary via Gemini
    let summary = "AI analysis skipped (no API key).";
    if (process.env.GEMINI_API_KEY) {
      try {
        const platformsStr = matches.map((m) => `${m.platform} (${Math.round(m.similarity * 100)}% match)`).join(", ");
        const prompt = `Explain how this content spread across platforms and identify its origin. Here is the data: The original content was uploaded. We found similar content on: ${platformsStr}. Keep the response to 2-3 short sentences. Focus on the viral spread.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        summary = response.text || "Failed to generate summary.";
      } catch (err) {
        console.error("Gemini API Error:", err);
        summary = "Error generating AI summary.";
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
