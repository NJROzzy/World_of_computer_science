"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Cpu, Code2, Network } from "lucide-react";

type ArchitectureNodeData = {
  title: string;
  description: string;
  category: "root" | "hardware" | "software";
};

const categoryConfig = {
  root: {
    icon: Network,
    label: "Architecture",
  },
  hardware: {
    icon: Cpu,
    label: "Hardware",
  },
  software: {
    icon: Code2,
    label: "Software",
  },
};

export default function ArchitectureNode({
  data,
}: NodeProps) {
  const nodeData = data as ArchitectureNodeData;
  const config = categoryConfig[nodeData.category];
  const Icon = config.icon;

  return (
    <div className="w-[260px] rounded-2xl border border-border bg-background/95 p-5 shadow-lg backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      {nodeData.category !== "root" && (
        <Handle
          type="target"
          position={Position.Top}
          className="!h-2 !w-2 !border-0 !bg-muted-foreground"
        />
      )}

      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-muted">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            {config.label}
          </p>

          <h2 className="font-semibold tracking-tight">
            {nodeData.title}
          </h2>
        </div>
      </div>

      <p className="text-sm leading-6 text-muted-foreground">
        {nodeData.description}
      </p>

      {nodeData.category === "root" && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!h-2 !w-2 !border-0 !bg-muted-foreground"
        />
      )}
    </div>
  );
}