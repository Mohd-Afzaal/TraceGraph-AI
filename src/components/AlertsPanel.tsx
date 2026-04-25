import { ShieldAlert, AlertTriangle, Info } from "lucide-react";

interface AlertsPanelProps {
  alert: any;
}

export function AlertsPanel({ alert }: AlertsPanelProps) {
  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-5 w-full">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
        <ShieldAlert className="w-5 h-5 text-red-400" />
        <h3 className="text-lg font-semibold">Active Alerts</h3>
      </div>

      <div className="space-y-3">
        {alert ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-400 font-semibold mb-1 capitalize text-sm">{alert.type.replace('_', ' ')}</h4>
              <p className="text-zinc-300 text-sm">{alert.message}</p>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-800/50 border border-white/5 rounded-lg p-4 flex gap-3 items-start">
            <Info className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-zinc-300 font-semibold mb-1 text-sm">No Active Alerts</h4>
              <p className="text-zinc-500 text-sm">Similarity thresholds have not triggered any critical alerts for this source.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
