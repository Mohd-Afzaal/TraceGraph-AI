"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { UploadArea } from "@/components/UploadArea";
import { PropagationGraph } from "@/components/PropagationGraph";
import { AlertsPanel } from "@/components/AlertsPanel";
import { InvestigationPanel } from "@/components/InvestigationPanel";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Analysis failed");

      const data = await res.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze media");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-white overflow-hidden font-sans">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Trace Investigation</h1>
            <p className="text-zinc-400">Upload media to trace its origin and propagation across the internet.</p>
          </div>
        </header>

        {!analysisResult ? (
          <div className="mt-20">
            <UploadArea onUpload={handleUpload} isLoading={isLoading} />
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
            
            {/* Top Row: Graph */}
            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4 text-zinc-100">Propagation Map</h2>
              <PropagationGraph data={analysisResult.graph} />
            </div>

            {/* Bottom Row: Details and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <InvestigationPanel 
                  fingerprint={analysisResult.fingerprint}
                  summary={analysisResult.summary}
                />
              </div>
              <div className="lg:col-span-1">
                <AlertsPanel alert={analysisResult.alert} />
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => setAnalysisResult(null)}
                className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors border border-white/10"
              >
                Analyze New Media
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
