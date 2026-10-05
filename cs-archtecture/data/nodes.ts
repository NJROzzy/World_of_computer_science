import type { ArchitectureNode } from "@/types/architecture";

import { connectedNodes } from "@/data/nodes/connected";
import { hardwareNodes } from "@/data/nodes/hardware";
import { intelligenceNodes } from "@/data/nodes/intelligence";
import { softwareNodes } from "@/data/nodes/software";
import { theoryNodes } from "@/data/nodes/theory";

export const ROOT_NODE_ID = "computer-science";

const rootNode: ArchitectureNode = {
  id: ROOT_NODE_ID,
  title: "Computer Science",
  description:
    "The study of computation, information, and computational systems.",
  category: "root",
  details:
    "Computer Science spans everything from electrons in silicon to systems that learn. Every abstraction exists because something underneath it makes it possible. Expand any node to see what it is made of, and select it to see what it depends on.",
};

export const architectureNodes: ArchitectureNode[] = [
  rootNode,
  ...hardwareNodes,
  ...softwareNodes,
  ...theoryNodes,
  ...connectedNodes,
  ...intelligenceNodes,
];
