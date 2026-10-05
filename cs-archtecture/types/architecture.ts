export type ArchitectureCategory =
  | "root"
  | "hardware"
  | "software"
  | "system"
  | "concept";

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
  description: string;
  category: ArchitectureCategory;
}

export interface ArchitectureRelationship {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  label?: string;
}