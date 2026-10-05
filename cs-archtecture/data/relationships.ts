import type { ArchitectureRelationship } from "@/types/architecture";

export const architectureRelationships: ArchitectureRelationship[] = [
  {
    id: "cs-contains-hardware",
    source: "computer-science",
    target: "hardware",
    type: "contains",
  },

  {
    id: "cs-contains-software",
    source: "computer-science",
    target: "software",
    type: "contains",
  },
];