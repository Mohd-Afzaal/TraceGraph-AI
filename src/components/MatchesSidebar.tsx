import { X, ExternalLink, ShieldAlert, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface MatchesSidebarProps {
  nodeData: any;
  previewUrl: string | null;
  onClose: () => void;
}

export function MatchesSidebar({ nodeData, previewUrl, onClose }: MatchesSidebarProps) {
  const [showPreview, setShowPreview] = useState(false);

  if (!nodeData) return null;

  // Apply CSS filters based on relation type to simulate the modification
  let filterStyle = "";
  let transformStyle = "";
  if (nodeData.type === "clipped") {
    transformStyle = "scale(1.2) translate(5%, 5%)"; // Simulate crop
  } else if (nodeData.type === "remixed") {
    filterStyle = "hue-rotate(45deg) saturate(150%) contrast(110%)"; // Simulate color remix
  }

  return (
    <div className="w-80 bg-[#111116] border-l border-white/5 h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
      <div className="p-6 flex flex-col h-full overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Match Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-md transition-colors text-zinc-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {nodeData.isOriginal ? (
          <div className="flex-1">
            <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-xl mb-4">
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Source</span>
              <h4 className="text-white font-medium mt-1">Original Upload</h4>
            </div>
            {previewUrl && (
              <div className="w-full h-40 bg-black/50 rounded-lg overflow-hidden border border-white/10 mb-4 flex items-center justify-center">
                <img src={previewUrl} alt="Original Preview" className="max-w-full max-h-full object-contain" />
              </div>
            )}
            <p className="text-sm text-zinc-400">This is the original media file registered in the system.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">{nodeData.label}</span>
                <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">{nodeData.type}</span>
              </div>
              <div className="flex items-end gap-2 mt-4">
                <span className="text-3xl font-bold text-white">{(nodeData.similarity * 100).toFixed(1)}%</span>
                <span className="text-xs text-zinc-500 mb-1">similarity</span>
              </div>
            </div>

            {previewUrl && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Visual Match</h4>
                <div 
                  className="w-full h-32 bg-black/50 rounded-lg overflow-hidden border border-white/10 cursor-pointer group relative flex items-center justify-center"
                  onClick={() => setShowPreview(true)}
                >
                  <img 
                    src={previewUrl} 
                    alt="Match Preview" 
                    className="max-w-full max-h-full object-cover transition-all duration-500 group-hover:scale-110" 
                    style={{ filter: filterStyle, transform: transformStyle }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-semibold text-white mb-2">AI Analysis</h4>
              <div className="bg-purple-900/10 border border-purple-500/20 p-3 rounded-lg text-sm text-zinc-300">
                <span className="block font-medium text-purple-400 mb-1">Reasoning:</span>
                {nodeData.reasoning}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Source Link</h4>
              <a 
                href={nodeData.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 p-3 rounded-lg text-sm text-blue-400 transition-colors"
              >
                <span className="truncate pr-4">{nodeData.url}</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>
            
            {nodeData.similarity > 0.85 && (
              <div className="mt-4 bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-400">This match triggered a high-severity alert due to high structural similarity.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Preview */}
      {showPreview && previewUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-8 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white capitalize">{nodeData.type} Match on {nodeData.label}</h2>
            <button onClick={() => setShowPreview(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 w-full flex items-center justify-center overflow-hidden border border-white/10 rounded-xl bg-[#0a0a0b]">
            <img 
              src={previewUrl} 
              alt="Full Preview" 
              className="max-w-full max-h-full object-contain" 
              style={{ filter: filterStyle, transform: transformStyle }}
            />
          </div>
          <div className="mt-6 text-zinc-400 max-w-2xl text-center">
            <p><strong>Note:</strong> This preview uses the originally uploaded media. CSS transformations simulate {nodeData.type === 'clipped' ? 'cropping' : 'color/filter remixing'} representing the detected divergence ({((1 - nodeData.similarity)*100).toFixed(1)}% altered).</p>
          </div>
        </div>
      )}
    </div>
  );
}
