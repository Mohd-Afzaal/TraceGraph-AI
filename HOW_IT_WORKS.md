# How TraceGraph AI Works

TraceGraph AI is designed to look, feel, and function like a real-world enterprise intelligence platform, built on strict MVP constraints. This document breaks down the underlying mechanics.

## 1. Perceptual Fingerprinting (pHash)

When a user uploads an image, the system doesn't rely on random IDs or basic MD5 hashes. Instead, it uses **Jimp** in a server-side API route (`/api/analyze/route.ts`) to compute a genuine Perceptual Hash (pHash), specifically a `dHash` (Difference Hash).

**The algorithm:**
1. The uploaded image is resized down to 9x8 pixels.
2. It is converted to grayscale.
3. The server iterates row by row, comparing adjacent pixels. If a pixel is brighter than the one to its right, it outputs `1`; otherwise `0`.
4. The result is a 64-bit binary string representing the structural "skeleton" of the image.

This allows the system to detect similarity even if an image is slightly resized or color-graded.

## 2. Dynamic Similarity Matching

Since this is an MVP without a massive database of web images, the system simulates a realistic "tracking" scenario.

When a fingerprint is generated, the system creates a mock dataset on the fly by randomly mutating the uploaded fingerprint's binary string. We use the **Hamming Distance** (the number of differing bits between two strings) to calculate a strict similarity score:

- **> 90% Similarity**: Classified as a **Duplicate**. Identical structural integrity.
- **> 75% Similarity**: Classified as **Clipped**. Indicates cropping or aspect ratio changes.
- **> 60% Similarity**: Classified as **Remixed**. Indicates heavy filters, overlays, or partial combinations.

These scores generate 3 to 6 unique matches scattered across mocked platforms (Reddit, Twitter, YouTube, etc.). Because the mutation is randomized per upload, **no two uploads produce the exact same graph.**

## 3. The Interactive Graph View

The core interface is powered by **React Flow**. The nodes reflect the generated matches, colored and iconified based on their platform and origin status. 

When you click on a node in the graph, the **Matches Sidebar** intercepts the click and displays:
- The similarity percentage
- The classification (Duplicate/Clipped/Remixed)
- The calculated "reasoning" for that match

**Simulated Previews:** The sidebar provides a realistic image preview. Instead of serving random dummy images, it takes your originally uploaded image and applies CSS transformations (`scale`, `hue-rotate`, `saturate`) inside a modal to visually simulate what a "clipped" or "remixed" version of your own upload might look like on the internet.

## 4. AI-Powered Intelligence (Google Gemini)

The system passes the mathematical data (the platforms matched, their exact percentages, and their classification types) directly to the Google Gemini AI model (`gemini-2.5-flash`).

Instead of a generic summary, the AI acts as an **intelligence analyst**. It is strictly prompted to output a 4-line structured response:
- **Origin**: The most likely source platform based on match confidence.
- **Spread**: How the content migrated across the internet.
- **Insight**: Analytical thoughts on how the content was transformed (e.g., meme templates, short-form clips).
- **Prediction**: Where the content is statistically likely to surface next.

The frontend (`InvestigationPanel.tsx`) parses this raw structured text and renders it beautifully within the dark-mode aesthetic.

## 5. UI and Hydration Safety

The frontend strictly adheres to modern React standards. 
- The `DashboardView` acts as a static summary overview. 
- The `GraphView` is dynamic. 
- State navigation is managed purely by React hooks to prevent full-page reloads, ensuring smooth transitions.
- All dynamic value generation (IDs, timestamps, math calculations) happens strictly on the API Server or within `useEffect` hooks to ensure full React Hydration safety without rendering mismatches between the server and the client.
