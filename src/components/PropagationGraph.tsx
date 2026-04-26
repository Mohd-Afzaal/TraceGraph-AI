"use client";

import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, Node, Edge, Position, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Share2, FileVideo } from 'lucide-react';

interface GraphProps {
  data: { nodes: any[]; edges: any[] } | null;
  onNodeClick?: (nodeData: any) => void;
}

const CustomNode = ({ data }: any) => {
  const isOriginal = data.isOriginal;
  return (
    <div className={`px-4 py-2 shadow-xl rounded-lg border-2 transition-all hover:scale-105 hover:shadow-purple-500/20 ${isOriginal ? 'bg-purple-900/40 border-purple-500' : 'bg-[#111116] border-zinc-600 hover:border-purple-400'} flex flex-col items-center justify-center min-w-[120px] cursor-pointer`}>
      <Handle type="target" position={Position.Top} className="!bg-zinc-400 opacity-0" />
      <div className="flex items-center gap-2 mb-1">
        {isOriginal ? <FileVideo className="w-4 h-4 text-purple-300" /> : <Share2 className="w-4 h-4 text-blue-300" />}
        <span className="font-bold text-sm text-white">{data.label}</span>
      </div>
      {!isOriginal && (
        <div className="text-xs text-zinc-400 mt-1 flex flex-col items-center">
          <span className="bg-black/30 px-2 py-0.5 rounded text-[10px] uppercase mb-1">{data.type}</span>
          <span className="text-blue-300 font-mono">{(data.similarity * 100).toFixed(0)}% Match</span>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-zinc-400 opacity-0" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export function PropagationGraph({ data, onNodeClick }: GraphProps) {
  const nodes: Node[] = useMemo(() => {
    if (!data) return [];
    return data.nodes.map(n => ({
      id: n.id,
      position: n.position,
      data: n.data,
      type: 'custom'
    }));
  }, [data]);

  const edges: Edge[] = useMemo(() => {
    if (!data) return [];
    return data.edges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target,
      animated: true,
      style: { stroke: '#9333ea', strokeWidth: 2 },
    }));
  }, [data]);

  if (!data) return null;

  return (
    <div className="w-full h-[500px] border border-white/5 rounded-xl overflow-hidden bg-black/50">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes} 
        fitView
        onNodeClick={(_, node) => onNodeClick?.(node.data)}
      >
        <Background color="#27272a" gap={20} size={1} />
        <Controls className="!bg-[#111116] !border-white/10 !fill-white" />
      </ReactFlow>
    </div>
  );
}
