https://world-of-computer-science.vercel.app 

🧠 CS Architecture and beyond

Explore Computer Science from transistors to intelligent systems.

CS Architecture is an interactive visual project designed to show how the entire architecture of Computer Science fits together.

Instead of presenting Computer Science as a collection of isolated subjects, the project explores the connections between hardware, software, computation, systems, networking, artificial intelligence, and other areas of computing.

The goal is simple:

Understand not only what each part of Computer Science does, but how all the parts connect.

⸻

🌐 The Big Picture

At the highest level, the project begins with two fundamental sides of computing:

                    COMPUTER SCIENCE
                           │
               ┌───────────┴───────────┐
               │                       │
               ▼                       ▼
           HARDWARE                 SOFTWARE
               │                       │
               └───────────┬───────────┘
                           │
                           ▼
                      COMPUTATION

From here, users can travel deeper into each layer.

Hardware

Electrical Signals
        ↓
   Transistors
        ↓
   Logic Gates
        ↓
Digital Circuits
        ↓
       CPU
        ↓
Computer Architecture

Software

Machine Code
      ↓
Assembly
      ↓
Programming Languages
      ↓
Compilers / Interpreters
      ↓
Operating Systems
      ↓
Algorithms & Data Structures
      ↓
Software Systems

Eventually, these foundations expand into areas such as:

Computer Science
│
├── Hardware
├── Software
├── Algorithms
├── Operating Systems
├── Computer Networks
├── Databases
├── Distributed Systems
├── Cybersecurity
├── Cloud Computing
├── Artificial Intelligence
├── Machine Learning
├── Deep Learning
├── Computer Vision
├── Robotics
└── Emerging Computing Systems

⸻

💡 Core Idea

Most Computer Science resources teach concepts independently.

You might learn:

* What a CPU is
* What Python is
* What an operating system does
* What an algorithm is
* What a neural network is

But the relationship between these concepts can remain unclear.

CS Architecture focuses on those relationships.

For example, instead of only explaining Python, the project can visualize how a Python program eventually interacts with physical hardware:

Python Program
      ↓
Python Runtime
      ↓
Operating System
      ↓
Machine Instructions
      ↓
Instruction Set Architecture
      ↓
CPU
      ↓
Digital Logic
      ↓
Transistors
      ↓
Electrical Signals

The goal is to make these abstraction layers visible.

⸻

🔍 Follow the Computation

One of the long-term goals of the project is an interactive Follow the Computation system.

A user could start with something simple:

print("Hello, World!")

and visually follow what happens inside the computer.

Source Code
    ↓
Runtime
    ↓
Operating System
    ↓
System Calls
    ↓
Machine Instructions
    ↓
CPU
    ↓
Memory
    ↓
I/O
    ↓
Display

Rather than treating the computer as a black box, the project exposes the path between human-readable software and physical computation.

⸻

🗺️ Interactive Architecture

The project is intended to behave more like an interactive map than a traditional textbook.

Users will eventually be able to:

* Zoom through Computer Science abstraction layers
* Expand and collapse architecture nodes
* Explore relationships between concepts
* Follow computation paths
* Highlight dependencies
* Move between hardware and software
* Open detailed explanations for individual components
* Visualize how high-level systems depend on lower-level systems

Example:

                        COMPUTER SCIENCE
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
             HARDWARE                    SOFTWARE
                 │                           │
          ┌──────┼──────┐             ┌──────┼──────┐
          │      │      │             │      │      │
         CPU   Memory   I/O           OS  Languages Algorithms
          │
     ┌────┼────┐
     │    │    │
    ALU Registers Control
     │
   Adders
     │
 Logic Gates
     │
Transistors

⸻

🏗️ Architecture Philosophy

The project follows a simple principle:

Every abstraction exists because something underneath it makes it possible.

Instead of asking only:

“What is this?”

CS Architecture also asks:

“What is underneath this?”

“What does this depend on?”

“What depends on this?”

“How does information move through it?”

“Where does this sit in the larger computing system?”

This creates a connected model of Computer Science rather than a collection of definitions.

⸻

🛠️ Technology Stack

The initial version is being built with:

Layer	Technology
Framework	Next.js
Language	TypeScript
UI	React
Styling	Tailwind CSS
Architecture Visualization	React Flow / XYFlow
Animation	Motion
Components	shadcn/ui
Icons	Lucide React
Architecture Data	TypeScript / JSON
Version Control	Git + GitHub
Deployment	Vercel

The initial version intentionally avoids unnecessary backend infrastructure.

The architecture itself is represented as structured data and rendered dynamically by the visualization system.

⸻

📁 Planned Project Structure

cs-architecture/
│
├── src/
│   │
│   ├── app/
│   │   ├── page.tsx
│   │   ├── hardware/
│   │   └── software/
│   │
│   ├── components/
│   │   ├── architecture/
│   │   ├── hardware/
│   │   ├── software/
│   │   └── ui/
│   │
│   ├── data/
│   │   ├── hardware.ts
│   │   ├── software.ts
│   │   └── connections.ts
│   │
│   ├── lib/
│   │   ├── graph.ts
│   │   └── paths.ts
│   │
│   └── types/
│       └── architecture.ts
│
├── public/
├── package.json
└── README.md

⸻

🚧 Development Roadmap

Phase 1 — Foundations

Build the core interactive architecture.

Computer Science
      ↓
Hardware ↔ Software

Initial hardware exploration:

Hardware
   ↓
CPU
   ↓
ALU
   ↓
Digital Logic
   ↓
Logic Gates
   ↓
Transistors

Phase 2 — Complete Hardware Architecture

Expand into:

* CPU
* GPU
* Memory
* Cache
* RAM
* Storage
* Motherboard
* I/O
* Buses
* Networking hardware
* Instruction Set Architecture

Phase 3 — Software Architecture

Build the software side:

* Machine code
* Assembly
* Programming languages
* Compilers
* Interpreters
* Operating systems
* Algorithms
* Data structures
* Runtime systems

Phase 4 — Connected Computing

Connect the foundational architecture to:

* Databases
* Networking
* Distributed systems
* Cloud computing
* Cybersecurity
* Web systems
* Mobile systems

Phase 5 — Intelligence

Extend the architecture into:

Algorithms
    ↓
Statistics
    ↓
Machine Learning
    ↓
Neural Networks
    ↓
Deep Learning
    ↓
Transformers
    ↓
Foundation Models
    ↓
AI Agents
    ↓
Embodied AI
    ↓
Robotics

Phase 6 — Follow the Computation

Allow users to select a real operation and trace it across the architecture.

Examples:

"What happens when I run Python?"
"What happens when I open a website?"
"What happens when I click a mouse?"
"What happens when an LLM generates a token?"
"What happens when a robot sees an object?"

⸻

🎯 Current Focus

The project is currently starting from the foundations:

              COMPUTER SCIENCE
                     │
          ┌──────────┴──────────┐
          │                     │
      HARDWARE              SOFTWARE
          │                     │
          ▼                     ▼
   Physical Computing     Logical Computing

The first objective is to build a small but polished interactive hardware architecture before expanding into the rest of Computer Science.

⸻

🚀 Running Locally

Clone the repository:

git clone <repository-url>

Enter the project:

cd cs-architecture

Install dependencies:

npm install

Start the development server:

npm run dev

Then open:

http://localhost:3000

⸻

🌱 Project Status

Early Development

The architecture, visualization system, and initial hardware map are currently being designed and implemented.

The project will grow incrementally rather than attempting to model all of Computer Science at once.

⸻

🔭 Vision

Computer Science is often taught as separate courses:

Algorithms
Operating Systems
Networks
Databases
Architecture
AI
Machine Learning
Security

But computers do not operate as separate courses.

They operate as connected systems of abstractions.

CS Architecture aims to make those connections visible.

From:

Transistor

to:

Logic Gate

to:

Processor

to:

Machine Instruction

to:

Operating System

to:

Programming Language

to:

Algorithm

to:

Artificial Intelligence

to:

Autonomous Systems

stay connected 

Computer Science — connected.