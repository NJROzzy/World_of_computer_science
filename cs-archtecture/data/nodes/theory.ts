import type { ArchitectureNode } from "@/types/architecture";

export const theoryNodes: ArchitectureNode[] = [
  {
    id: "computation",
    title: "Computation",
    description:
      "What can be computed, how efficiently, and the methods for doing it.",
    category: "theory",
    parent: "computer-science",
    details:
      "Computation is where hardware and software meet. Theory studies it independently of any particular machine: how information is represented, what problems can be solved at all, and how fast the best algorithms can be.",
  },
  {
    id: "information-representation",
    title: "Binary & Information",
    description:
      "Encoding numbers, text, images and sound as sequences of bits.",
    category: "theory",
    parent: "computation",
    details:
      "Everything a computer handles is ultimately bits. Integers use binary and two's complement, real numbers use floating point, text uses encodings like UTF-8, and media is sampled into numbers. Information theory measures how much information those bits really carry.",
    examples: ["Two's complement", "IEEE 754 floats", "UTF-8", "Entropy"],
  },
  {
    id: "boolean-logic",
    title: "Boolean Logic",
    description:
      "The algebra of true and false that underlies both circuits and conditions in code.",
    category: "theory",
    parent: "computation",
    details:
      "George Boole's algebra of AND, OR and NOT was a 19th-century mathematical idea. Claude Shannon showed in 1937 that it could describe switching circuits, and it became the bridge between logic and electronics.",
    examples: ["Truth tables", "De Morgan's laws", "Karnaugh maps"],
  },
  {
    id: "discrete-mathematics",
    title: "Discrete Mathematics",
    description:
      "Sets, logic, combinatorics, graphs and proofs: the mathematical language of CS.",
    category: "theory",
    parent: "computation",
    details:
      "Discrete maths deals with countable structures rather than continuous ones, which is exactly what computers manipulate. It provides the tools for proving programs and algorithms correct.",
    examples: ["Induction", "Combinatorics", "Graph theory", "Number theory"],
  },
  {
    id: "models-of-computation",
    title: "Models of Computation",
    description:
      "Abstract machines, like Turing machines and automata, that define what computing is.",
    category: "theory",
    parent: "computation",
    details:
      "A Turing machine is an idealised device with a tape and a finite rule table. Remarkably, it can compute anything any real computer can. Simpler models such as finite automata underpin regular expressions and parsers.",
    examples: ["Turing machines", "Finite automata", "Lambda calculus"],
  },
  {
    id: "computability",
    title: "Computability",
    description:
      "Which problems can be solved by any algorithm at all, and which provably cannot.",
    category: "theory",
    parent: "computation",
    details:
      "Turing proved that no program can decide, for every program and input, whether it will halt. Computability theory maps out these fundamental limits that no amount of hardware can overcome.",
    examples: ["Halting problem", "Church–Turing thesis", "Decidability"],
  },
  {
    id: "complexity-theory",
    title: "Complexity Theory",
    description:
      "How much time and memory problems need; home of the famous P vs NP question.",
    category: "theory",
    parent: "computation",
    details:
      "Complexity theory classifies problems by the resources required to solve them. Big-O notation describes how cost grows with input size, and classes like P and NP group problems of similar difficulty.",
    examples: ["Big-O notation", "P vs NP", "NP-completeness"],
  },
  {
    id: "algorithms",
    title: "Algorithms",
    description:
      "Step-by-step procedures for solving problems correctly and efficiently.",
    category: "theory",
    parent: "computation",
    details:
      "An algorithm is a precise recipe that terminates with the right answer. Choosing a better algorithm often matters far more than faster hardware: sorting a million items with an O(n log n) method instead of O(n²) is the difference between milliseconds and hours.",
  },
  {
    id: "sorting-searching",
    title: "Sorting & Searching",
    description:
      "Ordering data and finding items in it, the most fundamental algorithmic tasks.",
    category: "theory",
    parent: "algorithms",
    examples: ["Binary search", "Merge sort", "Quicksort", "Heapsort"],
  },
  {
    id: "graph-algorithms",
    title: "Graph Algorithms",
    description:
      "Traversing and optimising over networks: shortest paths, spanning trees, flows.",
    category: "theory",
    parent: "algorithms",
    details:
      "Road maps, social networks, the internet and dependency trees are all graphs. Algorithms such as Dijkstra's shortest path power routing protocols and navigation apps.",
    examples: ["BFS / DFS", "Dijkstra", "Minimum spanning tree", "Max flow"],
  },
  {
    id: "algorithm-design",
    title: "Algorithm Design",
    description:
      "General strategies: divide and conquer, greedy choices, dynamic programming.",
    category: "theory",
    parent: "algorithms",
    details:
      "Rather than inventing every algorithm from scratch, designers reuse strategies. Divide and conquer splits problems in half, greedy algorithms make the locally best choice, and dynamic programming reuses answers to overlapping subproblems.",
    examples: ["Divide & conquer", "Greedy", "Dynamic programming", "Randomised"],
  },
  {
    id: "data-structures",
    title: "Data Structures",
    description:
      "Ways of organising data in memory so the operations you need are fast.",
    category: "theory",
    parent: "computation",
    details:
      "The right data structure makes an algorithm simple and fast. Each structure trades off the speed of insertion, lookup, ordering and memory use.",
  },
  {
    id: "linear-structures",
    title: "Arrays, Lists, Stacks & Queues",
    description:
      "Sequential structures: contiguous arrays, linked lists, LIFO stacks and FIFO queues.",
    category: "theory",
    parent: "data-structures",
    details:
      "Arrays sit contiguously in memory and are extremely cache-friendly. Stacks power function calls; queues power schedulers and message systems.",
    examples: ["Dynamic arrays", "Linked lists", "Call stack", "Ring buffers"],
  },
  {
    id: "trees",
    title: "Trees",
    description:
      "Hierarchical structures such as binary search trees, heaps and B-trees.",
    category: "theory",
    parent: "data-structures",
    details:
      "Balanced trees keep data sorted with logarithmic-time operations. B-trees, with their wide nodes, are designed around disk blocks and are the backbone of database indexes and file systems.",
    examples: ["Binary search tree", "Heap", "B-tree", "Trie"],
  },
  {
    id: "hash-tables",
    title: "Hash Tables",
    description:
      "Map keys to values in near-constant time using a hash function.",
    category: "theory",
    parent: "data-structures",
    details:
      "A hash function turns a key into an array index. Hash tables back Python dictionaries, JavaScript objects, caches and database joins.",
    examples: ["Dictionaries / maps", "Open addressing", "Consistent hashing"],
  },
  {
    id: "graphs",
    title: "Graphs",
    description:
      "Nodes connected by edges, stored as adjacency lists or matrices.",
    category: "theory",
    parent: "data-structures",
    details:
      "Graphs model relationships of any kind. This very project is a graph: concepts are nodes and their dependencies are edges.",
    examples: ["Adjacency list", "Adjacency matrix", "Directed acyclic graphs"],
  },
  {
    id: "probability-statistics",
    title: "Probability & Statistics",
    description:
      "Reasoning about uncertainty and learning patterns from data.",
    category: "theory",
    parent: "computation",
    details:
      "Probability describes uncertain outcomes; statistics infers truths from samples. Together they underpin randomised algorithms, networking models, A/B testing, and the whole of machine learning.",
    examples: ["Distributions", "Bayes' theorem", "Estimation", "Hypothesis testing"],
  },
  {
    id: "linear-algebra",
    title: "Linear Algebra",
    description:
      "Vectors and matrices, the mathematics behind graphics and neural networks.",
    category: "theory",
    parent: "computation",
    details:
      "Rotating a 3D model, compressing an image and running a neural network are all matrix operations. This is why GPUs and AI accelerators are built around fast matrix multiplication.",
    examples: ["Matrix multiplication", "Vectors & embeddings", "Eigenvalues"],
  },
];
