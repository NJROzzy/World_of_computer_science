"use client";

import { memo } from "react";
import {
  Handle,
  Position,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { ChevronDown, ChevronUp, Link2 } from "lucide-react";
import { motion } from "motion/react";

import { categoryStyles } from "@/lib/categories";
import { NODE_HEIGHT, NODE_WIDTH } from "@/lib/layout";
import { cn } from "@/lib/utils";
import type { ArchitectureCategory } from "@/types/architecture";

/*
 * How a node should stand out given the current selection or journey.
 */
export type NodeEmphasis =
  | "none"
  | "selected"
  | "related"
  | "journey"
  | "journey-current"
  | "dimmed";

export type ArchitectureNodeData = {
  title: string;
  description: string;
  category: ArchitectureCategory;
  childCount: number;
  connectionCount: number;
  expanded: boolean;
  emphasis: NodeEmphasis;
  /* 1-based step numbers when this node is part of the active journey. */
  journeySteps: number[];
  onToggle: (id: string) => void;
};

export type ArchitectureFlowNode = Node<ArchitectureNodeData, "architecture">;

const handleClassName =
  "!h-2 !w-2 !min-h-0 !min-w-0 !border-2 !border-background !bg-muted-foreground/60";

function ArchitectureNode({ id, data }: NodeProps<ArchitectureFlowNode>) {
  const config = categoryStyles[data.category];
  const Icon = config.icon;
  const isJourney =
    data.emphasis === "journey" || data.emphasis === "journey-current";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ width: NODE_WIDTH, height: NODE_HEIGHT }}
    >
      <div
        className={cn(
          "group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card p-4 pt-5 text-card-foreground shadow-sm transition-[box-shadow,opacity,border-color,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lg",
          data.emphasis === "selected" &&
            "border-foreground shadow-xl ring-4 ring-foreground/10",
          data.emphasis === "related" && "border-foreground/40 shadow-md",
          data.emphasis === "journey" && "border-foreground/50",
          data.emphasis === "journey-current" &&
            "border-foreground shadow-xl ring-4 ring-foreground/15",
          data.emphasis === "dimmed" && "opacity-35 hover:opacity-80"
        )}
      >
        {/* Category accent */}
        <div className={cn("absolute inset-x-0 top-0 h-1", config.bar)} />

        {data.category !== "root" && (
          <Handle
            type="target"
            position={Position.Top}
            className={handleClassName}
          />
        )}

        {isJourney && data.journeySteps.length > 0 && (
          <div className="absolute top-3 right-3 flex gap-1">
            {data.journeySteps.map((step) => (
              <span
                key={step}
                className="flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground px-1.5 text-xs font-semibold text-background"
              >
                {step}
              </span>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="mb-3 flex items-center gap-3 pr-8">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105",
              config.badge
            )}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
              {config.label}
            </p>
            <h2 className="truncate leading-tight font-semibold tracking-tight">
              {data.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
          {data.description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          {data.childCount > 0 ? (
            <button
              type="button"
              aria-expanded={data.expanded}
              aria-label={`${data.expanded ? "Collapse" : "Expand"} ${data.title}`}
              onClick={(event) => {
                event.stopPropagation();
                data.onToggle(id);
              }}
              className="nodrag inline-flex items-center gap-1 rounded-lg border bg-muted/60 px-2 py-1 text-xs font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {data.expanded ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  Expand · {data.childCount}
                </>
              )}
            </button>
          ) : (
            <span />
          )}

          {data.connectionCount > 0 && (
            <span
              className="inline-flex items-center gap-1 text-xs text-muted-foreground"
              title={`${data.connectionCount} connections to other concepts`}
            >
              <Link2 className="h-3.5 w-3.5" />
              {data.connectionCount}
            </span>
          )}
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          className={handleClassName}
        />
      </div>
    </motion.div>
  );
}

export default memo(ArchitectureNode);
