import { computationJourneys } from "@/data/journeys";
import { architectureNodes, ROOT_NODE_ID } from "@/data/nodes";
import { architectureRelationships } from "@/data/relationships";
import type {
  ArchitectureNode,
  ArchitectureRelationship,
  ComputationJourney,
} from "@/types/architecture";

/*
 * Lookup tables over the architecture data. Everything here is computed once
 * at module load, so components can query the graph cheaply.
 */

export const nodeById = new Map<string, ArchitectureNode>(
  architectureNodes.map((node) => [node.id, node])
);

const childIdsByParent = new Map<string, string[]>();

architectureNodes.forEach((node) => {
  if (!node.parent) return;

  const siblings = childIdsByParent.get(node.parent) ?? [];
  siblings.push(node.id);
  childIdsByParent.set(node.parent, siblings);
});

/* Relationships other than containment, which is already the tree itself. */
export const crossRelationships = architectureRelationships.filter(
  (relationship) => relationship.type !== "contains"
);

export function getNode(id: string): ArchitectureNode {
  const node = nodeById.get(id);

  if (!node) {
    throw new Error(`Unknown architecture node: ${id}`);
  }

  return node;
}

export function getChildIds(id: string): string[] {
  return childIdsByParent.get(id) ?? [];
}

export function getChildren(id: string): ArchitectureNode[] {
  return getChildIds(id).map(getNode);
}

/* Ancestors ordered from the root down to the node's direct parent. */
export function getAncestorIds(id: string): string[] {
  const ancestors: string[] = [];
  let parent = nodeById.get(id)?.parent;

  while (parent) {
    ancestors.unshift(parent);
    parent = nodeById.get(parent)?.parent;
  }

  return ancestors;
}

export function getDescendantIds(id: string): string[] {
  return getChildIds(id).flatMap((childId) => [
    childId,
    ...getDescendantIds(childId),
  ]);
}

export function isWithin(id: string, rootId: string): boolean {
  return id === rootId || getAncestorIds(id).includes(rootId);
}

export interface Connection {
  relationship: ArchitectureRelationship;
  node: ArchitectureNode;
}

/*
 * Cross-cutting connections for a node. Outgoing connections read
 * "this node <label> other", incoming ones "other <label> this node".
 */
export function getConnections(id: string): {
  outgoing: Connection[];
  incoming: Connection[];
} {
  return {
    outgoing: crossRelationships
      .filter((relationship) => relationship.source === id)
      .map((relationship) => ({
        relationship,
        node: getNode(relationship.target),
      })),
    incoming: crossRelationships
      .filter((relationship) => relationship.target === id)
      .map((relationship) => ({
        relationship,
        node: getNode(relationship.source),
      })),
  };
}

const connectionCountById = new Map<string, number>();

crossRelationships.forEach(({ source, target }) => {
  connectionCountById.set(source, (connectionCountById.get(source) ?? 0) + 1);
  connectionCountById.set(target, (connectionCountById.get(target) ?? 0) + 1);
});

export function getConnectionCount(id: string): number {
  return connectionCountById.get(id) ?? 0;
}

/*
 * The nodes currently shown on the canvas: the root plus every node whose
 * ancestors (below the root) are all expanded. Returned in depth-first order.
 */
export function getVisibleNodeIds(
  rootId: string,
  expandedIds: ReadonlySet<string>
): string[] {
  const visible: string[] = [];

  function visit(id: string) {
    visible.push(id);

    if (!expandedIds.has(id)) return;

    getChildIds(id).forEach(visit);
  }

  visit(rootId);

  return visible;
}

export function getJourney(id: string): ComputationJourney | undefined {
  return computationJourneys.find((journey) => journey.id === id);
}

export function getJourneysThrough(id: string): ComputationJourney[] {
  return computationJourneys.filter((journey) =>
    journey.steps.some((step) => step.nodeId === id)
  );
}

/*
 * Rank nodes by how well they match a search query: title prefix first,
 * then title substring, then description and examples.
 */
export function searchNodes(
  query: string,
  rootId: string = ROOT_NODE_ID,
  limit = 8
): ArchitectureNode[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return [];

  const scored: { node: ArchitectureNode; score: number }[] = [];

  architectureNodes.forEach((node) => {
    if (!isWithin(node.id, rootId)) return;

    const title = node.title.toLowerCase();
    let score = 0;

    if (title.startsWith(normalizedQuery)) score = 3;
    else if (title.includes(normalizedQuery)) score = 2;
    else if (
      node.description.toLowerCase().includes(normalizedQuery) ||
      node.examples?.some((example) =>
        example.toLowerCase().includes(normalizedQuery)
      )
    )
      score = 1;

    if (score > 0) scored.push({ node, score });
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ node }) => node);
}

/*
 * Consistency checks for the architecture data. Returns a list of problems,
 * which is empty when every reference points at a real node.
 */
export function validateArchitecture(): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();

  architectureNodes.forEach((node) => {
    if (seen.has(node.id)) problems.push(`Duplicate node id: ${node.id}`);
    seen.add(node.id);

    if (node.parent && !nodeById.has(node.parent)) {
      problems.push(`${node.id} has unknown parent ${node.parent}`);
    }

    if (!node.parent && node.id !== ROOT_NODE_ID) {
      problems.push(`${node.id} has no parent`);
    }
  });

  const relationshipIds = new Set<string>();

  architectureRelationships.forEach((relationship) => {
    if (relationshipIds.has(relationship.id)) {
      problems.push(`Duplicate relationship id: ${relationship.id}`);
    }
    relationshipIds.add(relationship.id);

    [relationship.source, relationship.target].forEach((id) => {
      if (!nodeById.has(id)) {
        problems.push(`${relationship.id} references unknown node ${id}`);
      }
    });
  });

  computationJourneys.forEach((journey) => {
    journey.steps.forEach((step) => {
      if (!nodeById.has(step.nodeId)) {
        problems.push(`${journey.id} references unknown node ${step.nodeId}`);
      }
    });
  });

  return problems;
}
