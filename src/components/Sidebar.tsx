import { Activity, LayoutDashboard, Search, Settings, ShieldAlert, Zap } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 border-r border-white/10 bg-[#09090b] h-screen p-4 flex flex-col">
      <div className="flex items-center gap-2 px-2 py-4 mb-8">
        <Zap className="w-6 h-6 text-purple-500" />
        <span className="text-xl font-bold tracking-tight">TraceGraph AI</span>
      </div>

      <nav className="flex-1 space-y-2">
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-white/10 text-white rounded-md">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          <Search className="w-4 h-4" />
          Trace Investigation
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          <Activity className="w-4 h-4" />
          Propagation Map
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          <ShieldAlert className="w-4 h-4" />
          Alerts
        </a>
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10">
        <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-md shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all flex items-center justify-center gap-2">
          + Register Content
        </button>
        <a href="#" className="flex items-center gap-3 px-3 py-2 mt-4 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </a>
      </div>
    </div>
  );
}
