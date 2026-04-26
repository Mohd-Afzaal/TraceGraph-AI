# TraceGraph AI

TraceGraph AI is a functional, interactive MVP that simulates tracing media propagation across the internet. It demonstrates content intelligence by calculating a perceptual hash (pHash) of uploaded images, comparing them dynamically against a mock dataset, and using Google Gemini AI to analyze the spread.

For a detailed explanation of the logic, algorithms, and components, please read [HOW_IT_WORKS.md](./HOW_IT_WORKS.md).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key (optional but recommended for AI analysis)

### 1. Installation

Clone or download the project, then install the dependencies:

```bash
npm install
```

### 2. Configuration

Create a `.env.local` file in the root directory to enable the Gemini AI Analyzer:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(If no key is provided, the app will still function and gracefully show a fallback message in the AI Analysis panel.)*

### 3. Running the Development Server

Start the local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. 
- Navigate to **Graph View** from the sidebar.
- Click **Select File** to upload an image.
- Watch the simulated scanning and generation of the interactive trace map!

---

## 🌐 Deployment

This project is built on Next.js App Router and is fully optimized for zero-config deployment on Vercel.

### Deploy to Vercel (Recommended)

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to [Vercel](https://vercel.com/) and sign in.
3. Click **Add New... > Project** and select your repository.
4. In the "Environment Variables" section, add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
5. Click **Deploy**. Vercel will automatically detect Next.js and build the project.

### Alternative Deployment (Docker / VPS)
To host on a standard VPS or container service (like Render, Railway, or AWS EC2):
1. Build the production application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm run start
   ```

## Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS v4, Lucide React, Framer Motion
- **Visualization:** React Flow (@xyflow/react)
- **Backend/Logic:** Next.js API Routes, Jimp (pHash calculation)
- **AI:** Google Gemini (`@google/genai`)
