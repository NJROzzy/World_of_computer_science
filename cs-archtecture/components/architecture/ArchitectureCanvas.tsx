"use client";

import { useEffect } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
  useStoreApi,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import ArchitectureFrame, {
  type ArchitectureFrameNode,
} from "@/components/architecture/ArchitectureFrame";
import ArchitectureNode, {
  type ArchitectureFlowNode,
} from "@/components/architecture/ArchitectureNode";
import { categoryStyles } from "@/lib/categories";

const nodeTypes = {
  architecture: ArchitectureNode,
  frame: ArchitectureFrame,
};

export type FlowNode = ArchitectureFlowNode | ArchitectureFrameNode;

/* A region of the canvas, in flow coordinates, to bring into view. */
export interface FocusTarget {
  x: number;
  y: number;
  width: number;
  height: number;
}

const FOCUS_PADDING = 80;
const FOCUS_MAX_ZOOM = 0.9;
const MIN_ZOOM = 0.1;

interface ArchitectureCanvasProps {
  nodes: FlowNode[];
  edges: Edge[];
  focusTarget: FocusTarget | null;
  /* Fit the whole graph on first render (when nothing else is focused). */
  fitOnInit: boolean;
  onNodeClick: NodeMouseHandler<FlowNode>;
  onPaneClick: () => void;
}

export default function ArchitectureCanvas({
  nodes,
  edges,
  focusTarget,
  fitOnInit,
  onNodeClick,
  onPaneClick,
}: ArchitectureCanvasProps) {
  const { setCenter } = useReactFlow();
  const store = useStoreApi();

  /*
   * Smoothly move the camera whenever a new focus target arrives. The
   * target is computed from our own layout, so it doesn't depend on React
   * Flow having measured newly revealed nodes yet.
   */
  useEffect(() => {
    if (!focusTarget) return;

    const frame = requestAnimationFrame(() => {
      const { width, height } = store.getState();

      if (!width || !height) return;

      const zoom = Math.max(
        MIN_ZOOM,
        Math.min(
          FOCUS_MAX_ZOOM,
          width / (focusTarget.width + FOCUS_PADDING * 2),
          height / (focusTarget.height + FOCUS_PADDING * 2)
        )
      );

      setCenter(
        focusTarget.x + focusTarget.width / 2,
        focusTarget.y + focusTarget.height / 2,
        { zoom, duration: 600 }
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [focusTarget, setCenter, store]);

  return (
    <ReactFlow
      className="architecture-flow"
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      colorMode="system"
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      /*
       * Center the architecture when the page first loads, unless a deep
       * link already asked to focus something specific.
       */
      fitView={fitOnInit}
      fitViewOptions={{
        padding: 0.2,
        maxZoom: 1,
      }}
      minZoom={MIN_ZOOM}
      maxZoom={2}
      /*
       * The architecture controls positioning, and selection is handled by
       * the explorer rather than React Flow.
       */
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
    >
      <Background gap={24} size={1} />

      <Controls showInteractive={false} position="bottom-left" />

      <MiniMap<FlowNode>
        position="bottom-right"
        pannable
        zoomable
        className="!hidden overflow-hidden rounded-xl border sm:!block"
        nodeColor={(node) =>
          node.type === "architecture"
            ? categoryStyles[node.data.category].color
            : "transparent"
        }
        nodeBorderRadius={16}
      />
    </ReactFlow>
  );
}
