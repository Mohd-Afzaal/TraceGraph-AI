import { Fingerprint, BrainCircuit, Activity } from "lucide-react";

interface InvestigationPanelProps {
  fingerprint: string;
  summary: string;
}

export function InvestigationPanel({ fingerprint, summary }: InvestigationPanelProps) {
  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-5 w-full flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
        <Activity className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold">Investigation Details</h3>
      </div>

      <div className="mb-6 bg-black/40 p-4 rounded-lg border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <Fingerprint className="w-4 h-4 text-purple-500" />
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Digital Fingerprint</span>
        </div>
        <p className="font-mono text-sm text-purple-200 break-all">{fingerprint}</p>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <BrainCircuit className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">AI Summary (Gemini)</span>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg">
          <p className="text-sm text-zinc-300 leading-relaxed">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}
