import type { ArchitectureNode } from "@/types/architecture";

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "computer-science",
    title: "Computer Science",
    description:
      "The study of computation, information, and computational systems.",
    category: "root",
  },

  {
    id: "hardware",
    title: "Hardware",
    description:
      "The physical components and electronic systems that perform computation.",
    category: "hardware",
  },

  {
    id: "software",
    title: "Software",
    description:
      "Programs, instructions, and logical systems that control computation.",
    category: "software",
  },
];