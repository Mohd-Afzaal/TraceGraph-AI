import { Search, Bell, Video, Activity, ShieldAlert, Zap, ArrowUpRight } from "lucide-react";

export function DashboardView({ onNavigateToGraph }: { onNavigateToGraph: () => void }) {
  return (
    <div className="w-full h-full flex flex-col animate-in fade-in duration-500">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex-1 max-w-2xl relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search content, alerts, or platforms..." 
            className="w-full bg-[#111116] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/50"
          />
        </div>
        <button className="relative p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0a0a0b]"></span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#111116] border border-white/5 rounded-xl p-5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-zinc-400 text-sm font-medium">Registered Content</span>
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <Video className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">247</div>
          <div className="text-xs text-zinc-500 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3 text-zinc-400" /> 12% from last month
          </div>
        </div>

        <div className="bg-[#111116] border border-white/5 rounded-xl p-5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-zinc-400 text-sm font-medium">Active Tracked Media</span>
            <div className="bg-purple-500/10 p-2 rounded-lg">
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">156</div>
          <div className="text-xs text-zinc-500 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3 text-zinc-400" /> 8% from last month
          </div>
        </div>

        <div className="bg-[#111116] border border-white/5 rounded-xl p-5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-zinc-400 text-sm font-medium">Active Alerts</span>
            <div className="bg-orange-500/10 p-2 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">23</div>
          <div className="text-xs text-zinc-500 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3 text-zinc-400" /> 5 new today
          </div>
        </div>

        <div className="bg-[#111116] border border-white/5 rounded-xl p-5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-zinc-400 text-sm font-medium">Viral Spread Events</span>
            <div className="bg-green-500/10 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">8</div>
          <div className="text-xs text-zinc-500 flex items-center gap-1">
            <Activity className="w-3 h-3 text-zinc-400" /> This week
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Recently Registered Media */}
        <div className="lg:col-span-2 bg-[#111116] border border-white/5 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recently Registered Media</h3>
            <button className="text-sm text-zinc-400 hover:text-white flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            {[
              { title: "Product Launch Video", type: "video", time: "Registered 2h ago", tracked: 127, color: "bg-blue-500/20 text-blue-400" },
              { title: "Marketing Campaign Poster", type: "image", time: "Registered 5h ago", tracked: 89, color: "bg-purple-500/20 text-purple-400" },
              { title: "Tutorial Series Episode 1", type: "video", time: "Registered 1d ago", tracked: 342, color: "bg-blue-500/20 text-blue-400" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer" onClick={onNavigateToGraph}>
                <div className="w-32 h-20 bg-black/50 rounded-md relative flex items-center justify-center overflow-hidden border border-white/10">
                  <span className={`absolute top-2 left-2 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded backdrop-blur-md bg-black/60 ${item.color}`}>
                    {item.type}
                  </span>
                  <Video className="w-6 h-6 text-zinc-600" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-white font-medium mb-1">{item.title}</h4>
                  <span className="text-xs text-zinc-500 mb-2">{item.time}</span>
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-zinc-400">{item.tracked} instances tracked</span>
                    <span className="ml-2 text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded uppercase font-bold">Active</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-1 bg-[#111116] border border-white/5 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
            <button className="text-sm text-zinc-400 hover:text-white flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            {[
              { type: "Viral spike detected", media: "Product Launch Video", platform: "Reddit", time: "5m ago", dot: "bg-red-500" },
              { type: "Unauthorized reuse", media: "Marketing Campaign Poster", platform: "Twitter", time: "1h ago", dot: "bg-orange-500" },
              { type: "Cross-platform spread", media: "Tutorial Series Episode 1", platform: "YouTube", time: "3h ago", dot: "bg-yellow-500" },
            ].map((alert, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${alert.dot}`}></div>
                  <h4 className="text-sm font-semibold text-white">{alert.type}</h4>
                </div>
                <p className="text-xs text-zinc-500 mb-3 ml-4">{alert.media}</p>
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-[10px] text-zinc-400 border border-white/10 rounded px-2 py-0.5">{alert.platform}</span>
                  <span className="text-[10px] text-zinc-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
