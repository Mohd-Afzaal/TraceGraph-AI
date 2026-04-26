import { UploadCloud, File, Loader2 } from "lucide-react";
import { useCallback, useState, useEffect } from "react";

interface UploadAreaProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export function UploadArea({ onUpload, isLoading }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setLoadingStage(0);
      const timer1 = setTimeout(() => setLoadingStage(1), 800);
      const timer2 = setTimeout(() => setLoadingStage(2), 1600);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [isLoading]);

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

  const loadingTexts = [
    "Generating perceptual fingerprint (pHash)...",
    "Scanning platform databases...",
    "Building interactive propagation graph..."
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-[400px]">
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full h-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all ${
          isDragging ? "border-purple-500 bg-purple-500/10" : "border-zinc-700 bg-[#111116] hover:bg-zinc-800/50 hover:border-zinc-500"
        }`}
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-6 text-purple-400">
            <Loader2 className="w-12 h-12 animate-spin" />
            <p className="text-lg font-medium text-white">{loadingTexts[loadingStage]}</p>
            <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 transition-all duration-300 ease-out" 
                style={{ width: `${((loadingStage + 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <div className="p-4 rounded-full bg-zinc-800/80 mb-4 shadow-lg border border-white/5">
              <UploadCloud className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Register Original Content</h3>
            <p className="text-zinc-400 text-sm mb-6 text-center max-w-sm">
              Drop your video or image here or click to browse. Supported formats: MP4, MOV, AVI, JPG, PNG, WebP.
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
