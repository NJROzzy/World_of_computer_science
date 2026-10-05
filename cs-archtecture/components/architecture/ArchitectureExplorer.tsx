"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MarkerType,
  ReactFlowProvider,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react";
import { Link2, Maximize, Shrink } from "lucide-react";

import ArchitectureCanvas, {
  type FlowNode,
  type FocusTarget,
} from "@/components/architecture/ArchitectureCanvas";
import type {
  ArchitectureFlowNode,
  NodeEmphasis,
} from "@/components/architecture/ArchitectureNode";
import JourneyPanel from "@/components/architecture/JourneyPanel";
import NodeDetailsPanel from "@/components/architecture/NodeDetailsPanel";
import OverviewPanel from "@/components/architecture/OverviewPanel";
import SearchBox from "@/components/architecture/SearchBox";
import { Button } from "@/components/ui/button";
import { ROOT_NODE_ID } from "@/data/nodes";
import { categoryStyles } from "@/lib/categories";
import {
  crossRelationships,
  getAncestorIds,
  getChildIds,
  getConnectionCount,
  getConnections,
  getDescendantIds,
  getJourney,
  getNode,
  getVisibleNodeIds,
  isWithin,
  nodeById,
} from "@/lib/graph";
import { layoutTree, NODE_HEIGHT, NODE_WIDTH } from "@/lib/layout";
import { cn } from "@/lib/utils";

interface JourneyState {
  id: string;
  step: number;
}

/* A request to move the camera so these nodes are in view. */
interface FocusRequest {
  ids: string[];
}

export interface ArchitectureExplorerProps {
  /* The subtree to explore. Defaults to the whole of Computer Science. */
  rootId?: string;
  initialNodeId?: string | null;
  initialJourneyId?: string | null;
  /* Mirror the selection and journey into the URL so views can be shared. */
  syncUrl?: boolean;
  className?: string;
}

const TREE_EDGE_COLOR = "var(--border)";
const JOURNEY_COLOR = "var(--foreground)";

function withAncestors(expanded: Set<string>, ids: string[]) {
  const next = new Set(expanded);

  ids.forEach((id) => getAncestorIds(id).forEach((ancestor) => next.add(ancestor)));

  return next;
}

function getInitialState(
  rootId: string,
  initialNodeId?: string | null,
  initialJourneyId?: string | null
) {
  let expanded = new Set([rootId]);

  const journey =
    rootId === ROOT_NODE_ID && initialJourneyId
      ? getJourney(initialJourneyId)
      : undefined;

  if (journey) {
    expanded = withAncestors(
      expanded,
      journey.steps.map((step) => step.nodeId)
    );

    return {
      expanded,
      selectedId: null,
      journey: { id: journey.id, step: 0 },
      focus: { ids: [journey.steps[0].nodeId] },
    };
  }

  if (
    initialNodeId &&
    nodeById.has(initialNodeId) &&
    isWithin(initialNodeId, rootId)
  ) {
    return {
      expanded: withAncestors(expanded, [initialNodeId]),
      selectedId: initialNodeId,
      journey: null,
      focus: { ids: [initialNodeId] },
    };
  }

  return { expanded, selectedId: null, journey: null, focus: null };
}

function Explorer({
  rootId = ROOT_NODE_ID,
  initialNodeId,
  initialJourneyId,
  syncUrl = false,
  className,
}: ArchitectureExplorerProps) {
  const router = useRouter();

  const [initialState] = useState(() =>
    getInitialState(rootId, initialNodeId, initialJourneyId)
  );

  const [expanded, setExpanded] = useState<Set<string>>(initialState.expanded);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialState.selectedId
  );
  const [journeyState, setJourneyState] = useState<JourneyState | null>(
    initialState.journey
  );
  const [focus, setFocus] = useState<FocusRequest | null>(initialState.focus);
  const [showAllConnections, setShowAllConnections] = useState(false);

  const journey = journeyState ? getJourney(journeyState.id) : undefined;

  /* ---------------------------------------------------------------------- */
  /* Layout: only recomputed when the set of visible nodes changes.          */
  /* ---------------------------------------------------------------------- */
  const visibleIds = useMemo(
    () => getVisibleNodeIds(rootId, expanded),
    [rootId, expanded]
  );

  const layout = useMemo(
    () =>
      layoutTree(rootId, (id) => (expanded.has(id) ? getChildIds(id) : [])),
    [rootId, expanded]
  );
  const { positions } = layout;

  /* ---------------------------------------------------------------------- */
  /* Emphasis: which nodes stand out for the current selection or journey.  */
  /* ---------------------------------------------------------------------- */
  const { emphasisById, journeyStepsById } = useMemo(() => {
    const emphasis = new Map<string, NodeEmphasis>();
    const journeySteps = new Map<string, number[]>();

    if (journey && journeyState) {
      const visited = journey.steps.slice(0, journeyState.step + 1);
      const currentId = journey.steps[journeyState.step].nodeId;

      visited.forEach((step, index) => {
        journeySteps.set(step.nodeId, [
          ...(journeySteps.get(step.nodeId) ?? []),
          index + 1,
        ]);
      });

      visibleIds.forEach((id) => {
        emphasis.set(
          id,
          id === currentId
            ? "journey-current"
            : journeySteps.has(id)
              ? "journey"
              : "dimmed"
        );
      });
    } else if (selectedId) {
      const node = getNode(selectedId);
      const { incoming, outgoing } = getConnections(selectedId);
      const related = new Set([
        ...getChildIds(selectedId),
        ...incoming.map((connection) => connection.node.id),
        ...outgoing.map((connection) => connection.node.id),
      ]);

      if (node.parent) related.add(node.parent);

      visibleIds.forEach((id) => {
        emphasis.set(
          id,
          id === selectedId ? "selected" : related.has(id) ? "related" : "dimmed"
        );
      });
    }

    return { emphasisById: emphasis, journeyStepsById: journeySteps };
  }, [journey, journeyState, selectedId, visibleIds]);

  /* ---------------------------------------------------------------------- */
  /* Actions                                                                 */
  /* ---------------------------------------------------------------------- */
  const handleToggle = useCallback(
    (id: string) => {
      const next = new Set(expanded);

      if (next.has(id)) {
        next.delete(id);
        setFocus({ ids: [id] });
      } else {
        next.add(id);
        setFocus({ ids: [id, ...getChildIds(id)] });
      }

      setExpanded(next);
    },
    [expanded]
  );

  /* Select a node, expanding whatever is needed to make it visible. */
  const revealNode = useCallback(
    (id: string) => {
      if (!isWithin(id, rootId)) {
        router.push(`/?node=${id}`);
        return;
      }

      setJourneyState(null);
      setExpanded((current) => withAncestors(current, [id]));
      setSelectedId(id);
      setFocus({ ids: [id] });
    },
    [rootId, router]
  );

  const revealConnections = useCallback(
    (id: string) => {
      const { incoming, outgoing } = getConnections(id);
      const connectedIds = [...incoming, ...outgoing]
        .map((connection) => connection.node.id)
        .filter((connectedId) => isWithin(connectedId, rootId));

      setExpanded((current) => withAncestors(current, [id, ...connectedIds]));
      setSelectedId(id);
      setFocus({ ids: [id, ...connectedIds] });
    },
    [rootId]
  );

  const expandSubtree = useCallback((id: string) => {
    const descendants = getDescendantIds(id);

    setExpanded((current) => {
      const next = new Set(current);
      [id, ...descendants].forEach((nodeId) => next.add(nodeId));
      return next;
    });
    setFocus({ ids: [id, ...descendants] });
  }, []);

  const collapseAll = useCallback(() => {
    setExpanded(new Set([rootId]));
    setJourneyState(null);
    setFocus({ ids: [rootId, ...getChildIds(rootId)] });
  }, [rootId]);

  const fitAll = useCallback(() => {
    setFocus({ ids: visibleIds });
  }, [visibleIds]);

  const startJourney = useCallback((id: string) => {
    const selectedJourney = getJourney(id);

    if (!selectedJourney) return;

    setExpanded((current) =>
      withAncestors(
        current,
        selectedJourney.steps.map((step) => step.nodeId)
      )
    );
    setSelectedId(null);
    setJourneyState({ id, step: 0 });
    setFocus({ ids: [selectedJourney.steps[0].nodeId] });
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (!journey) return;

      const bounded = Math.max(0, Math.min(journey.steps.length - 1, step));

      setJourneyState({ id: journey.id, step: bounded });
      setFocus({ ids: [journey.steps[bounded].nodeId] });
    },
    [journey]
  );

  const exitJourney = useCallback(() => {
    setJourneyState(null);
  }, []);

  const handlePaneClick = useCallback(() => {
    if (!journeyState) setSelectedId(null);
  }, [journeyState]);

  const handleNodeClick: NodeMouseHandler<FlowNode> = useCallback(
    (_, node) => {
      /* Clicking the empty space inside a grid frame acts like the pane. */
      if (node.type === "frame") {
        handlePaneClick();
        return;
      }

      if (journey && journeyState) {
        /* Jump to the nearest step at this node, searching forward first. */
        const stepIndexes = journey.steps
          .map((step, index) => (step.nodeId === node.id ? index : -1))
          .filter((index) => index >= 0);

        if (stepIndexes.length > 0) {
          goToStep(
            stepIndexes.find((index) => index > journeyState.step) ??
              stepIndexes[0]
          );
          return;
        }

        setJourneyState(null);
      }

      setSelectedId(node.id);
    },
    [goToStep, handlePaneClick, journey, journeyState]
  );

  /* Keyboard: arrows step through a journey, Escape backs out. */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;

      if (target?.closest("input, textarea, [contenteditable]")) return;

      if (event.key === "Escape") {
        if (journeyState) setJourneyState(null);
        else setSelectedId(null);
      }

      if (journeyState && event.key === "ArrowRight") {
        goToStep(journeyState.step + 1);
      }

      if (journeyState && event.key === "ArrowLeft") {
        goToStep(journeyState.step - 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep, journeyState]);

  /* Keep the URL shareable. */
  const journeyId = journeyState?.id;

  useEffect(() => {
    if (!syncUrl) return;

    const url = new URL(window.location.href);

    url.searchParams.delete("node");
    url.searchParams.delete("journey");

    if (journeyId) url.searchParams.set("journey", journeyId);
    else if (selectedId) url.searchParams.set("node", selectedId);

    window.history.replaceState(null, "", url);
  }, [journeyId, selectedId, syncUrl]);

  /* ---------------------------------------------------------------------- */
  /* React Flow nodes and edges                                              */
  /* ---------------------------------------------------------------------- */
  const nodes: FlowNode[] = useMemo(() => {
    const isFocused = (id: string) => {
      const emphasis = emphasisById.get(id);
      return emphasis !== undefined && emphasis !== "dimmed";
    };
    const hasEmphasis = emphasisById.size > 0;

    /* Frames come first so they render behind the nodes they contain. */
    const frameNodes: FlowNode[] = layout.frames.map((frame) => ({
      id: frame.id,
      type: "frame",
      position: frame.position,
      width: frame.width,
      height: frame.height,
      selectable: false,
      focusable: false,
      data: {
        width: frame.width,
        height: frame.height,
        dimmed: hasEmphasis && !frame.childIds.some(isFocused),
      },
    }));

    const architectureNodes: ArchitectureFlowNode[] = visibleIds.map((id) => {
      const node = getNode(id);

      return {
        id,
        type: "architecture",
        position: positions.get(id) ?? { x: 0, y: 0 },
        /* Fixed sizes keep the minimap and camera correct before measuring. */
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        data: {
          title: node.title,
          description: node.description,
          category: node.category,
          childCount: getChildIds(id).length,
          connectionCount: getConnectionCount(id),
          expanded: expanded.has(id),
          emphasis: emphasisById.get(id) ?? "none",
          journeySteps: journeyStepsById.get(id) ?? [],
          onToggle: handleToggle,
        },
      };
    });

    return [...frameNodes, ...architectureNodes];
  }, [
    emphasisById,
    expanded,
    handleToggle,
    journeyStepsById,
    layout.frames,
    positions,
    visibleIds,
  ]);

  const edges: Edge[] = useMemo(() => {
    const visible = new Set(visibleIds);
    const highlightTree = !journey && selectedId;

    const frameOf = new Map(
      layout.frames.flatMap((frame) =>
        frame.childIds.map((childId) => [childId, frame.id] as const)
      )
    );

    const styledTreeEdges: Edge[] = layout.edges.map((edge) => {
      const highlighted =
        highlightTree &&
        (edge.source === selectedId ||
          edge.target === selectedId ||
          edge.target === frameOf.get(selectedId));

      return {
        ...edge,
        type: "smoothstep",
        style: {
          stroke: highlighted ? "var(--foreground)" : TREE_EDGE_COLOR,
          strokeWidth: highlighted ? 2 : 1.5,
        },
      };
    });

    if (journey && journeyState) {
      const journeyEdges: Edge[] = journey.steps
        .slice(0, journeyState.step + 1)
        .map((step, index, visited) => ({ step, next: visited[index + 1], index }))
        .filter(({ step, next }) => next && step.nodeId !== next.nodeId)
        .map(({ step, next, index }) => ({
          id: `journey-${index}`,
          source: step.nodeId,
          target: next!.nodeId,
          animated: true,
          zIndex: 10,
          label: `${index + 1} → ${index + 2}`,
          labelStyle: { fill: "var(--background)", fontWeight: 600, fontSize: 11 },
          labelBgStyle: { fill: JOURNEY_COLOR },
          labelBgPadding: [6, 3] as [number, number],
          labelBgBorderRadius: 999,
          style: { stroke: JOURNEY_COLOR, strokeWidth: 2.5 },
          markerEnd: { type: MarkerType.ArrowClosed, color: JOURNEY_COLOR },
        }));

      return [...styledTreeEdges, ...journeyEdges];
    }

    const connectionEdges: Edge[] = crossRelationships
      .filter(
        ({ source, target }) =>
          visible.has(source) &&
          visible.has(target) &&
          (showAllConnections ||
            source === selectedId ||
            target === selectedId)
      )
      .map((relationship) => {
        const color =
          categoryStyles[getNode(relationship.source).category].color;

        return {
          id: relationship.id,
          source: relationship.source,
          target: relationship.target,
          animated: true,
          zIndex: 5,
          label: relationship.label,
          labelStyle: { fill: "var(--foreground)", fontSize: 11 },
          labelBgStyle: { fill: "var(--card)" },
          labelBgPadding: [6, 3] as [number, number],
          labelBgBorderRadius: 6,
          style: { stroke: color, strokeWidth: 2, strokeDasharray: "6 4" },
          markerEnd: { type: MarkerType.ArrowClosed, color },
        };
      });

    return [...styledTreeEdges, ...connectionEdges];
  }, [journey, journeyState, layout, selectedId, showAllConnections, visibleIds]);

  /* Turn the latest focus request into a bounding box for the camera. */
  const focusTarget: FocusTarget | null = useMemo(() => {
    if (!focus) return null;

    const points = focus.ids
      .map((id) => positions.get(id))
      .filter((point) => point !== undefined);

    if (points.length === 0) return null;

    const minX = Math.min(...points.map((point) => point.x));
    const minY = Math.min(...points.map((point) => point.y));
    const maxX = Math.max(...points.map((point) => point.x + NODE_WIDTH));
    const maxY = Math.max(...points.map((point) => point.y + NODE_HEIGHT));

    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }, [focus, positions]);

  /* ---------------------------------------------------------------------- */
  /* Render                                                                  */
  /* ---------------------------------------------------------------------- */
  let panel: React.ReactNode;

  if (journey && journeyState) {
    panel = (
      <JourneyPanel
        journey={journey}
        step={journeyState.step}
        onStep={goToStep}
        onExit={exitJourney}
        onInspect={(id) => {
          setJourneyState(null);
          revealNode(id);
        }}
      />
    );
  } else if (selectedId) {
    panel = (
      <NodeDetailsPanel
        key={selectedId}
        nodeId={selectedId}
        rootId={rootId}
        expanded={expanded.has(selectedId)}
        onSelect={revealNode}
        onToggle={handleToggle}
        onExpandSubtree={expandSubtree}
        onRevealConnections={revealConnections}
        onStartJourney={startJourney}
        onClose={() => setSelectedId(null)}
      />
    );
  } else {
    panel = (
      <OverviewPanel
        rootId={rootId}
        onSelect={revealNode}
        onStartJourney={startJourney}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl border bg-background shadow-sm lg:h-[calc(100vh-6rem)] lg:min-h-[640px] lg:flex-row",
        className
      )}
    >
      <div className="relative h-[70vh] min-h-[480px] lg:h-auto lg:min-w-0 lg:flex-1">
        <ArchitectureCanvas
          nodes={nodes}
          edges={edges}
          focusTarget={focusTarget}
          fitOnInit={!initialState.focus}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
        />

        {/* Toolbar */}
        <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap items-start justify-between gap-2">
          <div className="pointer-events-auto w-full max-w-xs">
            <SearchBox rootId={rootId} onPick={revealNode} />
          </div>

          <div className="pointer-events-auto flex gap-1.5 rounded-xl border bg-background/90 p-1 shadow-sm backdrop-blur">
            <Button
              variant={showAllConnections ? "default" : "ghost"}
              size="sm"
              aria-pressed={showAllConnections}
              onClick={() => setShowAllConnections((value) => !value)}
              title="Show every connection between visible concepts"
            >
              <Link2 />
              Connections
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={collapseAll}
              title="Collapse everything back to the top level"
            >
              <Shrink />
              Collapse
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={fitAll}
              title="Fit everything into view"
            >
              <Maximize />
              Fit
            </Button>
          </div>
        </div>
      </div>

      <aside className="max-h-[80vh] overflow-y-auto border-t bg-card/40 lg:max-h-none lg:w-[400px] lg:shrink-0 lg:border-t-0 lg:border-l">
        {panel}
      </aside>
    </div>
  );
}

export default function ArchitectureExplorer(props: ArchitectureExplorerProps) {
  return (
    <ReactFlowProvider>
      <Explorer {...props} />
    </ReactFlowProvider>
  );
}
