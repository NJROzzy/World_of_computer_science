import type { ArchitectureNode } from "@/types/architecture";

export const hardwareNodes: ArchitectureNode[] = [
  {
    id: "hardware",
    title: "Hardware",
    description:
      "The physical components and electronic systems that perform computation.",
    category: "hardware",
    parent: "computer-science",
    details:
      "Hardware is computation made physical. It starts with electrons moving through silicon and builds, layer by layer, into processors, memory and devices. Every piece of software eventually becomes voltages switching inside this hardware.",
  },

  /* ---------------------------------------------------------------------- */
  /* Digital electronics: from physics to logic                              */
  /* ---------------------------------------------------------------------- */
  {
    id: "digital-electronics",
    title: "Digital Electronics",
    description:
      "How physical electricity is shaped into reliable 0s and 1s and combined into logic.",
    category: "hardware",
    parent: "hardware",
    details:
      "Digital electronics is the bridge between physics and computation. By treating voltages as either high or low, circuits become tolerant to noise, which makes it possible to stack billions of components and still get the exact same answer every time.",
  },
  {
    id: "electrical-signals",
    title: "Electrical Signals",
    description:
      "Voltages and currents that carry information as high (1) or low (0) levels.",
    category: "hardware",
    parent: "digital-electronics",
    details:
      "At the very bottom of every computer is electricity. A wire held near the supply voltage represents 1 and a wire near ground represents 0. Clock signals, data and instructions are all just patterns of these voltage levels changing over time.",
    examples: ["Voltage levels", "Clock edges", "Signal noise margins"],
  },
  {
    id: "semiconductors",
    title: "Semiconductors",
    description:
      "Materials like silicon whose conductivity can be precisely controlled.",
    category: "hardware",
    parent: "digital-electronics",
    details:
      "Pure silicon barely conducts, but adding tiny amounts of other elements (doping) creates regions rich in electrons (n-type) or holes (p-type). Junctions between these regions let an electric field switch current on and off, which is the physical basis of the transistor.",
    examples: ["Silicon", "Doping", "Photolithography"],
  },
  {
    id: "transistors",
    title: "Transistors",
    description:
      "Microscopic electrically controlled switches, the fundamental building block of chips.",
    category: "hardware",
    parent: "digital-electronics",
    details:
      "A MOSFET transistor has a gate that, when charged, lets current flow between its source and drain. Modern chips contain tens of billions of them. CMOS logic pairs n-type and p-type transistors so a circuit only draws significant power while switching.",
    examples: ["MOSFET", "CMOS", "FinFET / GAA"],
  },
  {
    id: "logic-gates",
    title: "Logic Gates",
    description:
      "Small transistor circuits that implement Boolean operations like AND, OR and NOT.",
    category: "hardware",
    parent: "digital-electronics",
    details:
      "A NAND gate needs only four transistors, and every other Boolean function can be built out of NAND gates alone. Gates are where physics turns into logic: from here up, designers reason about 0s and 1s rather than voltages.",
    examples: ["AND / OR / NOT", "NAND (universal)", "XOR"],
  },
  {
    id: "digital-circuits",
    title: "Digital Circuits",
    description:
      "Networks of logic gates that compute values, store state and keep time.",
    category: "hardware",
    parent: "digital-electronics",
    details:
      "Combining gates produces circuits with a purpose: adding numbers, choosing between inputs, or remembering a bit. These are the components that processors are assembled from.",
  },
  {
    id: "combinational-logic",
    title: "Combinational Logic",
    description:
      "Circuits whose output depends only on current inputs: adders, multiplexers, decoders.",
    category: "hardware",
    parent: "digital-circuits",
    details:
      "Combinational circuits have no memory. A full adder, for example, takes two bits and a carry and immediately produces a sum and carry-out. Chained together they become the arithmetic heart of the ALU.",
    examples: ["Full adder", "Multiplexer", "Decoder"],
  },
  {
    id: "sequential-logic",
    title: "Sequential Logic",
    description:
      "Circuits with memory, like latches and flip-flops, whose output depends on past inputs.",
    category: "hardware",
    parent: "digital-circuits",
    details:
      "By feeding a circuit's output back into its input, it can hold a value. Flip-flops store a single bit and update only on a clock edge. Registers, counters and state machines are all built from them.",
    examples: ["SR latch", "D flip-flop", "Finite state machines"],
  },
  {
    id: "clock",
    title: "Clock",
    description:
      "An oscillating signal that synchronises when every part of the chip updates.",
    category: "hardware",
    parent: "digital-circuits",
    details:
      "A crystal oscillator and phase-locked loop generate a steady square wave, often billions of ticks per second. On each tick, flip-flops capture new values, giving the whole processor a shared heartbeat.",
    examples: ["GHz clock rates", "Clock domains", "Dynamic frequency scaling"],
  },

  /* ---------------------------------------------------------------------- */
  /* Computer architecture                                                   */
  /* ---------------------------------------------------------------------- */
  {
    id: "computer-architecture",
    title: "Computer Architecture",
    description:
      "The design of how a processor is organised and how software talks to it.",
    category: "hardware",
    parent: "hardware",
    details:
      "Computer architecture sits between digital circuits and software. It defines what instructions exist, how they are executed efficiently, and how memory is organised so the processor is never left waiting.",
  },
  {
    id: "isa",
    title: "Instruction Set Architecture",
    description:
      "The contract between hardware and software: the instructions a CPU understands.",
    category: "hardware",
    parent: "computer-architecture",
    details:
      "The ISA lists the instructions, registers, data types and memory model that software can rely on. Compilers target the ISA, and any chip that implements it can run the same machine code, no matter how it is built internally.",
    examples: ["x86-64", "ARM64", "RISC-V"],
  },
  {
    id: "instruction-cycle",
    title: "Instruction Cycle",
    description:
      "The fetch, decode, execute, write-back loop that every processor repeats.",
    category: "hardware",
    parent: "computer-architecture",
    details:
      "The processor fetches the instruction at the program counter, decodes it to work out what to do, executes it in the ALU or memory unit, and writes the result back. Then it moves to the next instruction, billions of times per second.",
    examples: ["Fetch", "Decode", "Execute", "Write-back"],
  },
  {
    id: "pipelining",
    title: "Pipelining & Speculation",
    description:
      "Overlapping instructions and guessing branches to keep every stage busy.",
    category: "hardware",
    parent: "computer-architecture",
    details:
      "Like an assembly line, a pipeline works on several instructions at once, each in a different stage. Branch predictors guess which way code will go and out-of-order engines run independent instructions early, so the processor rarely stalls.",
    examples: ["Branch prediction", "Out-of-order execution", "Superscalar"],
  },
  {
    id: "parallelism",
    title: "Parallel Architectures",
    description:
      "Multiple cores, SIMD lanes and threads working on problems simultaneously.",
    category: "hardware",
    parent: "computer-architecture",
    details:
      "When clock speeds stopped rising, performance came from doing more at once. Multicore CPUs run separate threads, SIMD instructions apply one operation to many values, and GPUs push this idea to thousands of lanes.",
    examples: ["Multicore", "SIMD / vector units", "SMT / Hyper-Threading"],
  },
  {
    id: "memory-hierarchy",
    title: "Memory Hierarchy",
    description:
      "Layers of storage trading speed for size: registers, cache, RAM, then disk.",
    category: "hardware",
    parent: "computer-architecture",
    details:
      "Fast memory is small and expensive; large memory is slow. The hierarchy keeps the data you are using right now in the fastest layers, relying on locality: programs tend to reuse recent data and data stored nearby.",
    examples: ["Registers ~1 cycle", "L1 cache ~4 cycles", "RAM ~100 ns", "SSD ~100 µs"],
  },

  /* ---------------------------------------------------------------------- */
  /* The computer as a system                                                */
  /* ---------------------------------------------------------------------- */
  {
    id: "computer",
    title: "Computer",
    description:
      "A system of hardware components working together to process, store, and communicate information.",
    category: "hardware",
    parent: "hardware",
    details:
      "Almost every computer follows the von Neumann model: a processor, a memory holding both programs and data, storage for persistence, and input/output devices, all linked by interconnects.",
  },
  {
    id: "processing",
    title: "Processing",
    description:
      "Hardware responsible for executing instructions and performing computations.",
    category: "hardware",
    parent: "computer",
  },
  {
    id: "cpu",
    title: "CPU",
    description:
      "The general-purpose processor responsible for executing program instructions.",
    category: "hardware",
    parent: "processing",
    details:
      "The central processing unit runs the instruction cycle for the operating system and every application. It is optimised for low latency on a few threads, with deep pipelines, large caches and sophisticated prediction.",
    examples: ["Intel Core", "AMD Ryzen", "Apple M-series"],
  },
  {
    id: "alu",
    title: "ALU",
    description:
      "The Arithmetic Logic Unit performs arithmetic and logical operations.",
    category: "hardware",
    parent: "cpu",
    details:
      "The ALU takes values from registers, performs an operation such as add, subtract, AND or compare, and returns the result plus status flags like zero or overflow.",
  },
  {
    id: "adders",
    title: "Adders",
    description:
      "Circuits that add binary numbers, chaining one full adder per bit.",
    category: "hardware",
    parent: "alu",
    details:
      "A ripple-carry adder passes the carry from bit to bit; faster designs like carry-lookahead compute carries in parallel. Subtraction reuses the adder with two's complement, so this single circuit does a lot of the ALU's work.",
    examples: ["Ripple-carry", "Carry-lookahead", "Two's complement"],
  },
  {
    id: "control-unit",
    title: "Control Unit",
    description:
      "Coordinates instruction execution and controls the movement of data inside the CPU.",
    category: "hardware",
    parent: "cpu",
    details:
      "The control unit decodes each instruction and generates the signals that tell the ALU, registers and memory what to do on each clock cycle.",
  },
  {
    id: "registers",
    title: "Registers",
    description:
      "Extremely fast storage locations located directly inside the processor.",
    category: "hardware",
    parent: "cpu",
    details:
      "Registers hold the values an instruction is working on right now, plus special state such as the program counter and stack pointer. They are built from flip-flops and accessed within a single cycle.",
    examples: ["Program counter", "Stack pointer", "General-purpose registers"],
  },
  {
    id: "cache",
    title: "Cache",
    description:
      "Small, high-speed memory that keeps frequently needed data close to the processor.",
    category: "hardware",
    parent: "cpu",
    details:
      "Caches are organised in levels (L1, L2, L3). When the CPU needs data it checks the cache first; a hit costs a few cycles while a miss can cost hundreds waiting on RAM.",
    examples: ["L1 / L2 / L3", "Cache lines", "Cache coherence"],
  },
  {
    id: "gpu",
    title: "GPU",
    description:
      "A highly parallel processor designed to perform many computations simultaneously.",
    category: "hardware",
    parent: "processing",
    details:
      "GPUs trade single-thread speed for thousands of simple cores running the same instruction on different data. Originally built for drawing pixels, they now power scientific computing and almost all modern deep learning.",
    examples: ["Shader cores", "Tensor cores", "HBM memory"],
  },
  {
    id: "accelerators",
    title: "AI Accelerators",
    description:
      "Specialised chips like TPUs and NPUs built for matrix-heavy machine learning work.",
    category: "hardware",
    parent: "processing",
    details:
      "Accelerators drop general-purpose flexibility in exchange for huge throughput on specific workloads. Systolic arrays, for example, stream numbers through a grid of multiply-add units to compute matrix products very efficiently.",
    examples: ["Google TPU", "Apple Neural Engine", "FPGAs"],
  },
  {
    id: "memory",
    title: "Memory",
    description:
      "High-speed storage used to hold data and instructions needed during computation.",
    category: "hardware",
    parent: "computer",
  },
  {
    id: "ram",
    title: "RAM",
    description:
      "Main memory: large, byte-addressable and volatile, holding running programs.",
    category: "hardware",
    parent: "memory",
    details:
      "DRAM stores each bit as charge in a tiny capacitor that must be refreshed thousands of times per second. Every running program, its code, stack and heap live here while the computer is on.",
    examples: ["DDR5", "LPDDR", "HBM"],
  },
  {
    id: "firmware",
    title: "ROM & Firmware",
    description:
      "Non-volatile code that starts the machine before the operating system loads.",
    category: "hardware",
    parent: "memory",
    details:
      "When power arrives, the CPU begins executing firmware stored in flash. It initialises hardware, runs self-tests and hands control to a bootloader, which in turn loads the operating system kernel.",
    examples: ["UEFI / BIOS", "Bootloaders", "Microcode"],
  },
  {
    id: "storage",
    title: "Storage",
    description:
      "Hardware used to preserve programs and data for long-term use.",
    category: "hardware",
    parent: "computer",
  },
  {
    id: "ssd",
    title: "SSD",
    description:
      "Flash-based storage with no moving parts, fast random access and high throughput.",
    category: "hardware",
    parent: "storage",
    details:
      "SSDs trap charge in NAND flash cells to store bits persistently. A controller handles wear levelling and error correction, and NVMe connects them directly over PCIe for very low latency.",
    examples: ["NAND flash", "NVMe", "Wear levelling"],
  },
  {
    id: "hdd",
    title: "Hard Disk Drive",
    description:
      "Spinning magnetic platters read by moving heads: cheap, large, but slow to seek.",
    category: "hardware",
    parent: "storage",
    details:
      "Bits are stored as magnetised regions on platters spinning thousands of times per minute. Moving the head to a new track takes milliseconds, so HDDs favour large sequential reads and remain popular for bulk and archival storage.",
  },
  {
    id: "io",
    title: "Input / Output",
    description:
      "Hardware that allows a computer to receive information and communicate results.",
    category: "hardware",
    parent: "computer",
  },
  {
    id: "input-devices",
    title: "Input Devices",
    description:
      "Keyboards, mice, touchscreens, cameras and sensors that turn the world into signals.",
    category: "hardware",
    parent: "io",
    details:
      "Input devices convert physical actions into electrical signals, digitise them, and report them to the computer, usually by raising an interrupt so the CPU notices immediately.",
    examples: ["Keyboard", "Mouse", "Touchscreen", "Camera"],
  },
  {
    id: "output-devices",
    title: "Displays & Output",
    description:
      "Screens, speakers and printers that turn digital results back into the physical world.",
    category: "hardware",
    parent: "io",
    details:
      "A display controller reads a framebuffer from memory dozens of times per second and drives each pixel's colour. Speakers, printers and haptic motors do the same for sound, paper and touch.",
    examples: ["LCD / OLED", "Framebuffer", "Speakers"],
  },
  {
    id: "network-interface",
    title: "Network Interface",
    description:
      "The hardware that sends and receives bits over cables or radio waves.",
    category: "hardware",
    parent: "io",
    details:
      "A network interface card (NIC) converts packets in memory into electrical, optical or radio signals and back again. It is where the computer physically joins a network.",
    examples: ["Ethernet NIC", "Wi-Fi radio", "5G modem"],
  },
  {
    id: "interconnects",
    title: "Buses & Interconnects",
    description:
      "The motherboard pathways that move data between CPU, memory and devices.",
    category: "hardware",
    parent: "computer",
    details:
      "Components talk over shared or point-to-point links. The memory bus connects CPU and RAM, PCIe connects GPUs and SSDs, and USB connects peripherals. DMA lets devices copy data into memory without bothering the CPU.",
    examples: ["PCIe", "USB", "Memory bus", "DMA"],
  },
];
