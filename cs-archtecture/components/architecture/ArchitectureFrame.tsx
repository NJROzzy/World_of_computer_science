"use client";

import { memo } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

export type ArchitectureFrameData = {
  width: number;
  height: number;
  dimmed: boolean;
};

export type ArchitectureFrameNode = Node<ArchitectureFrameData, "frame">;

/*
 * The box around a parent's children when they are wrapped into a grid.
 * The single edge from the parent into this box stands for "contains".
 */
function ArchitectureFrame({ data }: NodeProps<ArchitectureFrameNode>) {
  return (
    <div
      style={{ width: data.width, height: data.height }}
      className={
        data.dimmed
          ? "rounded-3xl border border-dashed border-border/50 bg-muted/10"
          : "rounded-3xl border border-dashed border-muted-foreground/30 bg-muted/30"
      }
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !min-h-0 !min-w-0 !border-2 !border-background !bg-muted-foreground/60"
      />
    </div>
  );
}

export default memo(ArchitectureFrame);
