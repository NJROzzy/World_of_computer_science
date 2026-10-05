# CS Architecture — app

The interactive map of Computer Science described in the [project README](../README.md).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all pages are prerendered)
npm run lint
```

## Features

- **Expand / collapse** any concept to see what it is made of. Wide levels are packed into a grid so they stay readable.
- **Select** a concept to open its details: breadcrumb, explanation, examples, what it is made of, *what is underneath it* and *what depends on it*. Related concepts are highlighted on the canvas and their connections drawn.
- **Connections** toggle shows every cross-domain dependency between visible concepts.
- **Search** (`/`) jumps to any concept and expands the path to it.
- **Follow the Computation** journeys trace a real operation step by step (`←` / `→` to step, `Esc` to exit):
  - running `print("Hello, World!")`, opening a website, clicking a mouse, generating an LLM token, a robot seeing an object.
- **Domain pages** (`/hardware`, `/software`, `/computation`, …) explore one domain, with a readable outline of every concept and the domains it connects to.
- **Shareable links**: `/?node=cpu` opens a concept, `/?journey=hello-world` starts a journey.

## Project structure

```
app/
  page.tsx              home: hero, full explorer, domain cards
  [domain]/page.tsx     one page per top-level domain (statically generated)
components/
  SiteHeader.tsx
  architecture/
    ArchitectureExplorer.tsx   state: expansion, selection, journeys, camera
    ArchitectureCanvas.tsx     React Flow rendering + camera movement
    ArchitectureNode.tsx       concept card
    ArchitectureFrame.tsx      box around grid-wrapped children
    NodeDetailsPanel.tsx  JourneyPanel.tsx  OverviewPanel.tsx
    SearchBox.tsx  NodeChip.tsx  HomeExplorer.tsx
data/
  nodes.ts              root node + aggregation
  nodes/                concepts by domain: hardware, software, theory,
                        connected (networks, data, distributed, security),
                        intelligence (AI, robotics, emerging)
  relationships.ts      containment (derived) + cross-domain links
  journeys.ts           Follow the Computation paths
lib/
  graph.ts              lookups, search, validation
  layout.ts             dagre tree layout with grid wrapping
  categories.ts         per-domain icon and colours
types/architecture.ts
```

## Adding to the architecture

1. Add a node to the right file in `data/nodes/`, with `parent` set to the concept that contains it. Containment edges are derived from `parent`.
2. Add cross-domain links in `data/relationships.ts` with `link(source, type, target, label)`. Each link reads as a sentence: *"CPU implements Instruction Set Architecture"*.
3. Journeys in `data/journeys.ts` reference nodes by id.

`validateArchitecture()` in `lib/graph.ts` reports duplicate ids and references to missing nodes.
