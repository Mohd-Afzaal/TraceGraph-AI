import { Activity, LayoutDashboard, Search, Settings, ShieldAlert, Zap } from "lucide-react";

interface SidebarProps {
  activeView: "dashboard" | "graph";
  onViewChange: (view: "dashboard" | "graph") => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 border-r border-white/10 bg-[#0a0a0b] h-screen p-4 flex flex-col shrink-0">
      <div className="flex items-center gap-2 px-2 py-4 mb-8">
        <div className="bg-purple-600 p-1.5 rounded-lg">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-xl font-bold tracking-tight block leading-tight">TraceGraph AI</span>
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Content Intelligence</span>
        </div>
      </div>

      <button 
        onClick={() => onViewChange("graph")}
        className="w-full py-2.5 px-4 mb-6 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-md shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all flex items-center justify-center gap-2"
      >
        + Register Content
      </button>

      <nav className="flex-1 space-y-1.5">
        <button 
          onClick={() => onViewChange("dashboard")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeView === "dashboard" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
        <button 
          onClick={() => onViewChange("graph")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeView === "graph" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
        >
          <Activity className="w-4 h-4" />
          Graph View
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          <ShieldAlert className="w-4 h-4" />
          Alerts
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          <Search className="w-4 h-4" />
          Content Library
        </button>
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        
        <div className="mt-4 flex items-center gap-3 px-3 py-2 bg-white/5 rounded-md border border-white/5">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">U</div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-medium text-white">user@tracegraph.ai</span>
            <span className="text-[10px] text-purple-400">Pro Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
