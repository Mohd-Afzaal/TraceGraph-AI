import { useState } from "react";
import { UploadArea } from "./UploadArea";
import { PropagationGraph } from "./PropagationGraph";
import { AlertsPanel } from "./AlertsPanel";
import { InvestigationPanel } from "./InvestigationPanel";
import { MatchesSidebar } from "./MatchesSidebar";
import { Loader2 } from "lucide-react";

export function GraphView() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setAnalysisResult(null);
    setSelectedNodeData(null);
    
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Simulate network delay for the staged loading to be visible
      await new Promise(r => setTimeout(r, 2000));

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
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Trace Investigation</h1>
          <p className="text-zinc-400">Upload media to trace its origin and propagation across the internet.</p>
        </div>
      </header>

      {!analysisResult ? (
        <div className="flex-1 flex items-center justify-center">
          <UploadArea onUpload={handleUpload} isLoading={isLoading} />
        </div>
      ) : (
        <div className="flex flex-1 gap-6 min-h-0 overflow-hidden">
          {/* Main content area */}
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-8 custom-scrollbar">
            
            {/* Top Row: Graph */}
            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4 text-white">Propagation Map</h2>
              <PropagationGraph data={analysisResult.graph} onNodeClick={setSelectedNodeData} />
            </div>

            {/* Bottom Row: Details and Alerts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <InvestigationPanel 
                  fingerprint={analysisResult.fingerprint}
                  summary={analysisResult.summary}
                />
              </div>
              <div className="xl:col-span-1">
                <AlertsPanel alert={analysisResult.alert} />
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => setAnalysisResult(null)}
                className="px-6 py-2 bg-[#111116] hover:bg-zinc-800 text-white rounded-lg font-medium transition-colors border border-white/5"
              >
                Analyze New Media
              </button>
            </div>
          </div>

          {/* Right Sidebar for Node Details */}
          {selectedNodeData && (
            <MatchesSidebar 
              nodeData={selectedNodeData} 
              previewUrl={previewUrl}
              onClose={() => setSelectedNodeData(null)} 
            />
          )}
        </div>
      )}
    </div>
  );
}
