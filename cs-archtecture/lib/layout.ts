import dagre from "@dagrejs/dagre";
import type { XYPosition } from "@xyflow/react";

export const NODE_WIDTH = 260;
export const NODE_HEIGHT = 168;

/* Siblings beyond this many are wrapped into a grid instead of one long row. */
const MAX_COLUMNS = 4;
const GRID_GAP = 24;
const FRAME_PADDING = 20;

/*
 * A box drawn around a parent's collapsed children when they are wrapped
 * into a grid. Dagre lays the whole box out as if it were a single node.
 */
export interface LayoutFrame {
  id: string;
  parentId: string;
  childIds: string[];
  position: XYPosition;
  width: number;
  height: number;
}

export interface TreeLayoutEdge {
  id: string;
  source: string;
  /* A node id, or a frame id when the children are wrapped in a grid. */
  target: string;
}

export interface TreeLayout {
  /* Top-left position of every visible node. */
  positions: Map<string, XYPosition>;
  frames: LayoutFrame[];
  edges: TreeLayoutEdge[];
}

export function getFrameId(parentId: string): string {
  return `frame:${parentId}`;
}

/*
 * Lay the visible part of the architecture out as a top-to-bottom tree.
 *
 * Children that are themselves expanded keep their place in the tree so
 * their subtrees can grow beneath them. Children with nothing visible below
 * them are leaves; when a parent has more than MAX_COLUMNS of those, they
 * are packed into a grid so wide levels stay readable.
 */
export function layoutTree(
  rootId: string,
  getVisibleChildIds: (id: string) => string[]
): TreeLayout {
  const graph = new dagre.graphlib.Graph();

  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({
    rankdir: "TB",
    ranksep: 90,
    nodesep: 48,
  });

  const edges: TreeLayoutEdge[] = [];
  const pendingFrames: Omit<LayoutFrame, "position">[] = [];
  const gridOffsets = new Map<string, { frameId: string; offset: XYPosition }>();

  function addEdge(source: string, target: string) {
    graph.setEdge(source, target);
    edges.push({ id: `${source}-contains-${target}`, source, target });
  }

  function visit(id: string) {
    graph.setNode(id, { width: NODE_WIDTH, height: NODE_HEIGHT });

    const children = getVisibleChildIds(id);
    const leaves = children.filter(
      (childId) => getVisibleChildIds(childId).length === 0
    );
    const useGrid = leaves.length > MAX_COLUMNS;
    let frame: Omit<LayoutFrame, "position"> | null = null;

    if (useGrid) {
      const frameId = getFrameId(id);
      const rows = Math.ceil(leaves.length / MAX_COLUMNS);
      const columns = Math.ceil(leaves.length / rows);
      const width =
        columns * NODE_WIDTH + (columns - 1) * GRID_GAP + FRAME_PADDING * 2;
      const height =
        rows * NODE_HEIGHT + (rows - 1) * GRID_GAP + FRAME_PADDING * 2;

      leaves.forEach((leafId, index) => {
        const row = Math.floor(index / columns);
        const column = index % columns;
        const itemsInRow = Math.min(columns, leaves.length - row * columns);
        /* Center a shorter final row. */
        const rowInset = ((columns - itemsInRow) * (NODE_WIDTH + GRID_GAP)) / 2;

        gridOffsets.set(leafId, {
          frameId,
          offset: {
            x: FRAME_PADDING + rowInset + column * (NODE_WIDTH + GRID_GAP),
            y: FRAME_PADDING + row * (NODE_HEIGHT + GRID_GAP),
          },
        });
      });

      frame = { id: frameId, parentId: id, childIds: leaves, width, height };
      pendingFrames.push(frame);
    }

    /* Insert the grid where its first child would have been, to keep order. */
    let frameAdded = false;

    children.forEach((childId) => {
      if (frame && leaves.includes(childId)) {
        if (!frameAdded) {
          graph.setNode(frame.id, { width: frame.width, height: frame.height });
          addEdge(id, frame.id);
          frameAdded = true;
        }
        return;
      }

      addEdge(id, childId);
      visit(childId);
    });
  }

  visit(rootId);

  dagre.layout(graph);

  function topLeft(id: string, width: number, height: number): XYPosition {
    const center = graph.node(id);
    return { x: center.x - width / 2, y: center.y - height / 2 };
  }

  const frames: LayoutFrame[] = pendingFrames.map((frame) => ({
    ...frame,
    position: topLeft(frame.id, frame.width, frame.height),
  }));
  const framePositions = new Map(frames.map((frame) => [frame.id, frame.position]));

  const positions = new Map<string, XYPosition>();

  graph.nodes().forEach((id) => {
    if (framePositions.has(id)) return;
    positions.set(id, topLeft(id, NODE_WIDTH, NODE_HEIGHT));
  });

  gridOffsets.forEach(({ frameId, offset }, id) => {
    const framePosition = framePositions.get(frameId)!;
    positions.set(id, {
      x: framePosition.x + offset.x,
      y: framePosition.y + offset.y,
    });
  });

  return { positions, frames, edges };
}
