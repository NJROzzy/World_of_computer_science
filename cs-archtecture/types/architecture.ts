/*
 * The domain a node belongs to. Drives the node's icon and accent colour.
 */
export type ArchitectureCategory =
  | "root"
  | "hardware"
  | "software"
  | "theory"
  | "networking"
  | "data"
  | "systems"
  | "security"
  | "intelligence"
  | "emerging";

export type RelationshipType =
  | "contains"
  | "part-of"
  | "depends-on"
  | "communicates-with"
  | "executes"
  | "manages"
  | "translates-to"
  | "stores"
  | "runs-on"
  | "implements";

export interface ArchitectureNode {
  id: string;
  title: string;
  /* One or two sentences shown on the node card. */
  description: string;
  category: ArchitectureCategory;
  /*
   * The node this one sits inside. "contains" relationships are derived
   * from this field, so the containment tree is defined in one place.
   */
  parent?: string;
  /* Longer explanation shown in the details panel. */
  details?: string;
  examples?: string[];
}

export interface ArchitectureRelationship {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  label?: string;
}

export interface JourneyStep {
  nodeId: string;
  title: string;
  explanation: string;
}

/*
 * A "Follow the Computation" path: an ordered walk across the architecture
 * that explains what happens during a real operation.
 */
export interface ComputationJourney {
  id: string;
  question: string;
  summary: string;
  steps: JourneyStep[];
}
