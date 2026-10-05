"use client";

import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import ArchitectureNode from "@/components/architecture/ArchitectureNode";
import { architectureNodes } from "@/data/nodes";
import { architectureRelationships } from "@/data/relationships";

const nodeTypes = {
  architecture: ArchitectureNode,
};

const positions: Record<string, { x: number; y: number }> = {
  "computer-science": { x: 370, y: 40 },
  hardware: { x: 150, y: 300 },
  software: { x: 590, y: 300 },
};

const nodes: Node[] = architectureNodes.map((node) => ({
  id: node.id,
  type: "architecture",
  position: positions[node.id] ?? { x: 0, y: 0 },

  data: {
    title: node.title,
    description: node.description,
    category: node.category,
  },
}));

const edges: Edge[] = architectureRelationships.map((relationship) => ({
  id: relationship.id,
  source: relationship.source,
  target: relationship.target,
  type: "smoothstep",
  label: relationship.label,
}));

export default function ArchitectureCanvas() {
  return (
    <div className="h-[650px] w-full overflow-hidden rounded-3xl border bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.25,
        }}
        minZoom={0.5}
        maxZoom={1.8}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
      >
        <Background gap={24} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}