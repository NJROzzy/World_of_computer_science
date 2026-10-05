import type { ArchitectureNode } from "@/types/architecture";

export const softwareNodes: ArchitectureNode[] = [
  {
    id: "software",
    title: "Software",
    description:
      "Programs, instructions, and logical systems that control computation.",
    category: "software",
    parent: "computer-science",
    details:
      "Software is a tower of abstractions. Each layer, from machine code to applications, hides the complexity of the layer below so people can describe what they want in increasingly human terms.",
  },

  /* ---------------------------------------------------------------------- */
  /* The lowest software layers                                              */
  /* ---------------------------------------------------------------------- */
  {
    id: "machine-code",
    title: "Machine Code",
    description:
      "Binary-encoded instructions that the CPU executes directly.",
    category: "software",
    parent: "software",
    details:
      "Machine code is the only language hardware truly understands: sequences of bits whose layout is defined by the ISA. Every program, whatever language it was written in, ends up here or is run by something that is.",
    examples: ["48 89 e5 (x86-64)", "Opcodes & operands", "Executable files (ELF, PE, Mach-O)"],
  },
  {
    id: "assembly",
    title: "Assembly Language",
    description:
      "Human-readable names for machine instructions, one line per instruction.",
    category: "software",
    parent: "software",
    details:
      "Assembly replaces bit patterns with mnemonics like MOV and ADD and lets programmers use labels instead of raw addresses. An assembler translates it almost one-to-one into machine code.",
    examples: ["mov rax, 1", "add, jmp, call", "Assemblers (NASM, GAS)"],
  },

  /* ---------------------------------------------------------------------- */
  /* Programming languages                                                   */
  /* ---------------------------------------------------------------------- */
  {
    id: "programming-languages",
    title: "Programming Languages",
    description:
      "Formal languages that let humans describe computation precisely.",
    category: "software",
    parent: "software",
    details:
      "A programming language has a syntax (what programs look like) and semantics (what they mean). Languages differ in how close they sit to the hardware and in the ideas they make easy to express.",
  },
  {
    id: "systems-languages",
    title: "Systems Languages",
    description:
      "C, C++, Rust and others that give direct control over memory and hardware.",
    category: "software",
    parent: "programming-languages",
    details:
      "Systems languages compile straight to machine code and expose pointers and memory layout. Operating systems, databases, browsers and language runtimes are typically written in them.",
    examples: ["C", "C++", "Rust", "Zig"],
  },
  {
    id: "high-level-languages",
    title: "High-Level Languages",
    description:
      "Python, JavaScript, Java and others that trade control for productivity.",
    category: "software",
    parent: "programming-languages",
    details:
      "High-level languages manage memory automatically and provide rich built-in types. They usually run on a runtime or virtual machine rather than compiling directly to the target CPU.",
    examples: ["Python", "JavaScript / TypeScript", "Java", "Go"],
  },
  {
    id: "paradigms",
    title: "Programming Paradigms",
    description:
      "Styles of structuring programs: imperative, object-oriented, functional, declarative.",
    category: "software",
    parent: "programming-languages",
    details:
      "Paradigms are different ways of thinking about a program: as a sequence of commands, as interacting objects, as composed mathematical functions, or as a description of the desired result.",
    examples: ["Imperative", "Object-oriented", "Functional", "Logic / declarative"],
  },
  {
    id: "type-systems",
    title: "Type Systems",
    description:
      "Rules that classify values and catch whole categories of mistakes before running.",
    category: "software",
    parent: "programming-languages",
    details:
      "Types say what kind of value something is and what operations make sense on it. Static type checkers prove certain errors impossible at compile time; dynamic languages check types as the program runs.",
    examples: ["Static vs dynamic", "Generics", "Type inference"],
  },

  /* ---------------------------------------------------------------------- */
  /* Translation and runtimes                                                */
  /* ---------------------------------------------------------------------- */
  {
    id: "language-translation",
    title: "Compilers & Interpreters",
    description:
      "Programs that translate or execute other programs.",
    category: "software",
    parent: "software",
    details:
      "Translators carry a program from the language a human wrote down to the instructions a machine can execute, either ahead of time, one statement at a time, or on the fly.",
  },
  {
    id: "compilers",
    title: "Compilers",
    description:
      "Translate a whole program into lower-level code ahead of time, optimising along the way.",
    category: "software",
    parent: "language-translation",
    details:
      "A compiler lexes and parses source code into a syntax tree, checks it, lowers it to an intermediate representation, optimises it, and finally generates machine code for a specific ISA.",
    examples: ["GCC", "Clang / LLVM", "rustc", "Lexing → parsing → IR → codegen"],
  },
  {
    id: "interpreters",
    title: "Interpreters",
    description:
      "Execute a program directly, often by compiling to bytecode and running it in a loop.",
    category: "software",
    parent: "language-translation",
    details:
      "Rather than producing a standalone executable, an interpreter reads the program and performs its actions itself. CPython, for example, compiles Python into bytecode and then evaluates each bytecode instruction in a big dispatch loop.",
    examples: ["CPython", "Ruby MRI", "Bash"],
  },
  {
    id: "jit-compilation",
    title: "JIT Compilation",
    description:
      "Compiling hot code to machine code while the program runs, using live profiling data.",
    category: "software",
    parent: "language-translation",
    details:
      "Just-in-time compilers start by interpreting, notice which functions run often, and compile those into optimised machine code using what they have learned about real types and values.",
    examples: ["V8 (JavaScript)", "HotSpot (Java)", "PyPy"],
  },
  {
    id: "linkers-loaders",
    title: "Linkers & Loaders",
    description:
      "Combine compiled pieces into an executable and place it in memory to run.",
    category: "software",
    parent: "language-translation",
    details:
      "The linker resolves references between object files and libraries into one executable. When you launch it, the OS loader maps it into memory, links shared libraries and jumps to its entry point.",
    examples: ["ld / lld", "Shared libraries (.so, .dll)", "Dynamic linking"],
  },
  {
    id: "runtime-systems",
    title: "Runtime Systems",
    description:
      "The support machinery that runs alongside a program: VMs, memory managers, libraries.",
    category: "software",
    parent: "software",
    details:
      "A runtime provides services a language promises but the hardware does not: automatic memory management, exceptions, threads, dynamic types and a standard library.",
  },
  {
    id: "virtual-machines-runtimes",
    title: "Language Virtual Machines",
    description:
      "Process-level VMs such as CPython, the JVM and V8 that execute bytecode.",
    category: "software",
    parent: "runtime-systems",
    details:
      "A language VM defines its own instruction set (bytecode) and executes it on any hardware. This makes programs portable and lets the VM add features like safety checks and JIT compilation.",
    examples: ["CPython VM", "JVM", "V8", ".NET CLR", "WebAssembly"],
  },
  {
    id: "garbage-collection",
    title: "Garbage Collection",
    description:
      "Automatically finding and reclaiming memory that a program no longer uses.",
    category: "software",
    parent: "runtime-systems",
    details:
      "Garbage collectors trace which objects are still reachable from the program and free the rest, or track reference counts. This removes a whole class of memory bugs at the cost of some runtime overhead.",
    examples: ["Reference counting", "Mark-and-sweep", "Generational GC"],
  },
  {
    id: "standard-libraries",
    title: "Standard Libraries",
    description:
      "Built-in code for I/O, strings, collections and more, wrapping OS services.",
    category: "software",
    parent: "runtime-systems",
    details:
      "Functions like Python's print or C's printf live in standard libraries. Underneath, they format data and call into the operating system to actually do I/O.",
    examples: ["libc", "Python stdlib", "Java Class Library"],
  },

  /* ---------------------------------------------------------------------- */
  /* Operating systems                                                       */
  /* ---------------------------------------------------------------------- */
  {
    id: "operating-systems",
    title: "Operating Systems",
    description:
      "Software that manages hardware and provides services and isolation to programs.",
    category: "software",
    parent: "software",
    details:
      "The OS shares the CPU, memory and devices among many programs, keeps them from interfering with each other, and gives them clean abstractions like processes, files and sockets.",
    examples: ["Linux", "Windows", "macOS", "Android / iOS"],
  },
  {
    id: "kernel",
    title: "Kernel",
    description:
      "The privileged core of the OS that runs with full control of the hardware.",
    category: "software",
    parent: "operating-systems",
    details:
      "The CPU has privilege levels. The kernel runs in the most privileged mode and can touch any memory or device; applications run in user mode and must ask the kernel for anything sensitive.",
    examples: ["Monolithic (Linux)", "Microkernel (seL4)", "Hybrid (XNU, NT)"],
  },
  {
    id: "system-calls",
    title: "System Calls",
    description:
      "The doorway from a user program into the kernel to request a service.",
    category: "software",
    parent: "operating-systems",
    details:
      "A system call is a special instruction that switches the CPU into kernel mode and jumps to a fixed kernel entry point. Reading a file, sending a packet or printing text all go through system calls.",
    examples: ["write()", "read()", "open()", "fork() / exec()"],
  },
  {
    id: "processes-threads",
    title: "Processes & Threads",
    description:
      "Running programs with their own memory, and the execution streams within them.",
    category: "software",
    parent: "operating-systems",
    details:
      "A process is a program in execution with its own address space and resources. Threads are independent paths of execution within a process that share its memory, enabling concurrency.",
    examples: ["PIDs", "Context switches", "Locks & mutexes"],
  },
  {
    id: "scheduling",
    title: "Scheduling",
    description:
      "Deciding which thread runs on which core, and for how long.",
    category: "software",
    parent: "operating-systems",
    details:
      "A timer interrupt fires many times per second so the scheduler can preempt the running thread and pick another, creating the illusion that hundreds of programs run at once.",
    examples: ["Round-robin", "Completely Fair Scheduler", "Priorities"],
  },
  {
    id: "virtual-memory",
    title: "Virtual Memory",
    description:
      "Gives every process its own private address space mapped onto physical RAM.",
    category: "software",
    parent: "operating-systems",
    details:
      "Programs use virtual addresses which the hardware's memory management unit translates using page tables maintained by the OS. This isolates processes and lets memory be swapped to disk.",
    examples: ["Pages & page tables", "TLB", "Page faults", "Swapping"],
  },
  {
    id: "file-systems",
    title: "File Systems",
    description:
      "Organise raw storage blocks into named files and directories.",
    category: "software",
    parent: "operating-systems",
    details:
      "A file system tracks which blocks belong to which file, maintains directories and permissions, and uses journaling or copy-on-write to survive crashes.",
    examples: ["ext4", "APFS", "NTFS", "ZFS"],
  },
  {
    id: "device-drivers",
    title: "Device Drivers",
    description:
      "Kernel code that knows how to talk to a specific piece of hardware.",
    category: "software",
    parent: "operating-systems",
    details:
      "Drivers translate generic OS requests like 'read this block' into the exact register writes and protocol a particular device expects, and handle that device's interrupts.",
    examples: ["GPU drivers", "USB HID driver", "NVMe driver"],
  },
  {
    id: "interrupts",
    title: "Interrupts",
    description:
      "Hardware signals that pause the CPU so the kernel can respond to an event.",
    category: "software",
    parent: "operating-systems",
    details:
      "When a key is pressed, a packet arrives or a timer fires, the device raises an interrupt. The CPU saves what it was doing and jumps to the kernel's handler, then resumes.",
    examples: ["Timer interrupts", "Interrupt handlers", "IRQs"],
  },

  /* ---------------------------------------------------------------------- */
  /* Software systems                                                        */
  /* ---------------------------------------------------------------------- */
  {
    id: "software-systems",
    title: "Software Systems",
    description:
      "The applications and platforms people actually use, built on every layer below.",
    category: "software",
    parent: "software",
    details:
      "Applications combine languages, runtimes, operating system services, networks and data storage into something useful to a person.",
  },
  {
    id: "applications",
    title: "Applications",
    description:
      "Programs that perform tasks for users: editors, games, browsers, tools.",
    category: "software",
    parent: "software-systems",
    details:
      "Most applications run an event loop: wait for input, update state, redraw the interface, repeat. They rely on the OS for windows, files and networking.",
    examples: ["Text editors", "Games", "Spreadsheets"],
  },
  {
    id: "user-interfaces",
    title: "User Interfaces & Graphics",
    description:
      "Windowing systems and rendering pipelines that draw what you see on screen.",
    category: "software",
    parent: "software-systems",
    details:
      "UI toolkits lay out widgets, a compositor combines every window into one image, and graphics APIs send drawing commands to the GPU, which fills the framebuffer the display shows.",
    examples: ["Window compositors", "OpenGL / Vulkan / Metal", "UI toolkits"],
  },
  {
    id: "web-applications",
    title: "Web Applications",
    description:
      "Apps delivered through browsers using HTML, CSS and JavaScript.",
    category: "software",
    parent: "software-systems",
    details:
      "A browser downloads a page, parses HTML into a DOM tree, applies CSS, runs JavaScript, then lays out and paints the result. Frameworks like React structure how that UI is built.",
    examples: ["Browsers", "DOM", "React / Next.js"],
  },
  {
    id: "mobile-systems",
    title: "Mobile Systems",
    description:
      "Apps and platforms for phones and tablets, shaped by battery, sensors and touch.",
    category: "software",
    parent: "software-systems",
    details:
      "Mobile operating systems aggressively manage power, sandbox every app, and expose sensors like GPS and accelerometers. Apps must cope with intermittent connectivity and small screens.",
    examples: ["Android", "iOS", "Swift / Kotlin"],
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    description:
      "Practices for building reliable software in teams: design, testing, version control.",
    category: "software",
    parent: "software-systems",
    details:
      "Large programs are built by many people over many years. Software engineering covers how to structure code, test it, review it, track changes and deliver it continuously.",
    examples: ["Git", "Automated testing", "CI/CD", "Design patterns"],
  },
];
