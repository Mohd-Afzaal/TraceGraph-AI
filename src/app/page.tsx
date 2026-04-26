"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { GraphView } from "@/components/GraphView";
import { DashboardView } from "@/components/DashboardView";

export default function Home() {
  const [activeView, setActiveView] = useState<"dashboard" | "graph">("dashboard");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex h-screen w-full bg-[#0a0a0b] text-white overflow-hidden font-sans">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 overflow-y-auto p-8 relative">
        {activeView === "dashboard" ? <DashboardView onNavigateToGraph={() => setActiveView("graph")} /> : <GraphView />}
      </main>
    </div>
  );
}
