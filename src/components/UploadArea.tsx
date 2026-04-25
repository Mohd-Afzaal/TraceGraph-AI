import { UploadCloud, File, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";

interface UploadAreaProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export function UploadArea({ onUpload, isLoading }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files[0]);
    }
  }, [onUpload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-[400px]">
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full h-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all ${
          isDragging ? "border-purple-500 bg-purple-500/10" : "border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-500"
        }`}
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 text-purple-400">
            <Loader2 className="w-12 h-12 animate-spin" />
            <p className="text-lg font-medium">Analyzing Media & Extracting Fingerprint...</p>
          </div>
        ) : (
          <>
            <div className="p-4 rounded-full bg-zinc-800/80 mb-4 shadow-lg border border-white/5">
              <UploadCloud className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Source Media</h3>
            <p className="text-zinc-400 text-sm mb-6 text-center max-w-sm">
              Drag & drop your image or video here to begin tracing its propagation across the internet.
            </p>
            <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-[0_0_20px_rgba(147,51,234,0.4)]">
              Select File
              <input type="file" className="hidden" accept="image/*,video/*" onChange={handleChange} />
            </label>
          </>
        )}
      </div>
    </div>
  );
}
