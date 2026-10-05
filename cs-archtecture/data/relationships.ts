import type {
  ArchitectureRelationship,
  RelationshipType,
} from "@/types/architecture";

import { architectureNodes } from "@/data/nodes";

/*
 * Containment ("contains") relationships come straight from each node's
 * `parent` field, so the tree is only defined once.
 */
const containmentRelationships: ArchitectureRelationship[] = architectureNodes
  .filter((node) => node.parent)
  .map((node) => ({
    id: `${node.parent}-contains-${node.id}`,
    source: node.parent!,
    target: node.id,
    type: "contains",
  }));

/*
 * Cross-cutting relationships between concepts in different parts of the
 * tree. Read each one as "source <label> target".
 */
function link(
  source: string,
  type: RelationshipType,
  target: string,
  label: string
): ArchitectureRelationship {
  return { id: `${source}-${type}-${target}`, source, target, type, label };
}

const crossRelationships: ArchitectureRelationship[] = [
  /* The big picture */
  link("software", "runs-on", "hardware", "runs on"),
  link("hardware", "implements", "computation", "physically performs"),
  link("software", "implements", "computation", "expresses"),

  /* Physics to logic */
  link("transistors", "depends-on", "semiconductors", "are built from"),
  link("transistors", "depends-on", "electrical-signals", "switch"),
  link("electrical-signals", "implements", "information-representation", "physically encode"),
  link("logic-gates", "depends-on", "transistors", "are built from"),
  link("logic-gates", "implements", "boolean-logic", "implement"),
  link("digital-circuits", "depends-on", "logic-gates", "are built from"),
  link("adders", "depends-on", "combinational-logic", "are built from"),
  link("registers", "depends-on", "sequential-logic", "are built from"),
  link("cpu", "depends-on", "clock", "is paced by"),

  /* Architecture */
  link("cpu", "implements", "isa", "implements"),
  link("control-unit", "executes", "instruction-cycle", "drives"),
  link("cpu", "depends-on", "pipelining", "speeds up with"),
  link("gpu", "depends-on", "parallelism", "is built around"),
  link("registers", "part-of", "memory-hierarchy", "are the top of"),
  link("cache", "part-of", "memory-hierarchy", "is a level of"),
  link("ram", "part-of", "memory-hierarchy", "is a level of"),
  link("ssd", "part-of", "memory-hierarchy", "is a level of"),
  link("cpu", "communicates-with", "ram", "reads & writes"),
  link("cpu", "communicates-with", "interconnects", "talks to devices via"),
  link("accelerators", "depends-on", "linear-algebra", "accelerate"),
  link("firmware", "executes", "kernel", "boots"),

  /* Software layers */
  link("cpu", "executes", "machine-code", "executes"),
  link("machine-code", "depends-on", "isa", "is defined by"),
  link("assembly", "translates-to", "machine-code", "assembles to"),
  link("compilers", "translates-to", "assembly", "emit"),
  link("compilers", "depends-on", "models-of-computation", "parse with"),
  link("systems-languages", "depends-on", "compilers", "are compiled by"),
  link("high-level-languages", "depends-on", "interpreters", "are run by"),
  link("interpreters", "depends-on", "virtual-machines-runtimes", "execute bytecode in"),
  link("virtual-machines-runtimes", "depends-on", "jit-compilation", "speed up with"),
  link("virtual-machines-runtimes", "depends-on", "garbage-collection", "manage memory with"),
  link("linkers-loaders", "depends-on", "virtual-memory", "map programs into"),
  link("standard-libraries", "depends-on", "system-calls", "call"),
  link("system-calls", "depends-on", "kernel", "enter"),

  /* Operating systems */
  link("kernel", "runs-on", "cpu", "runs on"),
  link("virtual-memory", "depends-on", "ram", "maps onto"),
  link("file-systems", "stores", "ssd", "organise"),
  link("file-systems", "depends-on", "trees", "index with"),
  link("scheduling", "depends-on", "interrupts", "is triggered by"),
  link("input-devices", "communicates-with", "interrupts", "raise"),
  link("device-drivers", "manages", "input-devices", "control"),
  link("device-drivers", "manages", "interconnects", "program"),
  link("applications", "runs-on", "operating-systems", "run on"),
  link("applications", "depends-on", "user-interfaces", "draw with"),
  link("user-interfaces", "runs-on", "gpu", "render on"),
  link("user-interfaces", "communicates-with", "output-devices", "draw to"),
  link("web-applications", "depends-on", "http", "load over"),
  link("web-applications", "depends-on", "jit-compilation", "run JavaScript with"),
  link("mobile-systems", "runs-on", "operating-systems", "run on"),

  /* Theory */
  link("algorithms", "depends-on", "data-structures", "operate on"),
  link("algorithms", "depends-on", "complexity-theory", "are analysed by"),
  link("computability", "depends-on", "models-of-computation", "is defined by"),
  link("boolean-logic", "depends-on", "discrete-mathematics", "is part of"),
  link("graph-algorithms", "depends-on", "graphs", "traverse"),
  link("data-structures", "stores", "ram", "are laid out in"),

  /* Networking */
  link("link-layer", "depends-on", "network-interface", "is transmitted by"),
  link("internet-protocol", "depends-on", "link-layer", "is carried over"),
  link("internet-protocol", "depends-on", "graph-algorithms", "routes with"),
  link("transport-layer", "depends-on", "internet-protocol", "runs over"),
  link("transport-layer", "runs-on", "kernel", "is implemented in"),
  link("dns", "depends-on", "transport-layer", "queries over"),
  link("http", "depends-on", "tls", "is secured by"),
  link("http", "depends-on", "dns", "finds servers with"),
  link("network-hardware", "implements", "internet-protocol", "forward"),

  /* Security */
  link("tls", "depends-on", "transport-layer", "runs over"),
  link("tls", "depends-on", "public-key-crypto", "authenticates with"),
  link("tls", "depends-on", "symmetric-crypto", "encrypts with"),
  link("cryptography", "depends-on", "discrete-mathematics", "is built on"),
  link("authentication", "depends-on", "hashing", "stores passwords with"),
  link("authentication", "depends-on", "public-key-crypto", "signs with"),
  link("network-security", "manages", "internet-protocol", "filters"),
  link("system-security", "depends-on", "kernel", "isolates with"),
  link("system-security", "depends-on", "firmware", "verifies"),

  /* Data */
  link("indexing", "depends-on", "trees", "use"),
  link("indexing", "depends-on", "hash-tables", "use"),
  link("sql", "depends-on", "query-processing", "is executed by"),
  link("query-processing", "depends-on", "algorithms", "uses join & sort"),
  link("storage-engines", "depends-on", "file-systems", "store pages in"),
  link("transactions", "depends-on", "storage-engines", "log changes in"),

  /* Distributed systems & cloud */
  link("client-server", "depends-on", "http", "speak"),
  link("client-server", "depends-on", "databases", "query"),
  link("load-balancing", "manages", "client-server", "distribute traffic to"),
  link("replication", "depends-on", "consensus", "agrees via"),
  link("replication", "depends-on", "consistency-models", "is governed by"),
  link("partitioning", "depends-on", "hash-tables", "use consistent hashing from"),
  link("virtualization", "runs-on", "cpu", "uses hardware support in"),
  link("containers", "depends-on", "kernel", "isolate with"),
  link("orchestration", "manages", "containers", "schedules"),
  link("serverless", "depends-on", "virtualization", "isolates with"),
  link("data-centers", "depends-on", "network-hardware", "are wired with"),

  /* Intelligence */
  link("machine-learning", "depends-on", "probability-statistics", "is built on"),
  link("machine-learning", "depends-on", "data-engineering", "is trained on data from"),
  link("neural-networks", "depends-on", "linear-algebra", "compute with"),
  link("backpropagation", "implements", "training-optimization", "computes gradients for"),
  link("training-optimization", "runs-on", "gpu", "runs on"),
  link("training-optimization", "runs-on", "accelerators", "runs on"),
  link("attention", "depends-on", "linear-algebra", "is matrix maths from"),
  link("large-language-models", "depends-on", "tokenization", "read & write"),
  link("inference-serving", "runs-on", "gpu", "runs on"),
  link("inference-serving", "runs-on", "data-centers", "is hosted in"),
  link("ai-agents", "depends-on", "large-language-models", "are powered by"),
  link("computer-vision", "depends-on", "cnns", "uses"),
  link("search-planning", "depends-on", "graph-algorithms", "searches with"),

  /* Robotics */
  link("sensors", "part-of", "input-devices", "are a kind of"),
  link("perception", "depends-on", "sensors", "reads"),
  link("perception", "depends-on", "computer-vision", "uses"),
  link("localization-mapping", "depends-on", "probability-statistics", "estimates with"),
  link("motion-planning", "depends-on", "search-planning", "searches with"),
  link("control-systems", "communicates-with", "actuators", "command"),
  link("embodied-ai", "depends-on", "foundation-models", "builds on"),
  link("embodied-ai", "depends-on", "reinforcement-learning", "learns with"),

  /* Emerging */
  link("quantum-computing", "depends-on", "linear-algebra", "is described by"),
  link("neuromorphic-computing", "depends-on", "neural-networks", "is inspired by"),
  link("edge-iot", "depends-on", "networking", "connects via"),
  link("photonic-computing", "depends-on", "linear-algebra", "accelerates"),
];

export const architectureRelationships: ArchitectureRelationship[] = [
  ...containmentRelationships,
  ...crossRelationships,
];
