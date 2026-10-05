import type { ComputationJourney } from "@/types/architecture";

/*
 * "Follow the Computation": real operations traced step by step across the
 * architecture. Each step points at a node, which the explorer reveals and
 * focuses as the user walks through the journey.
 */
export const computationJourneys: ComputationJourney[] = [
  {
    id: "hello-world",
    question: 'What happens when I run print("Hello, World!")?',
    summary:
      "From one line of Python down to transistors, and back out to pixels on your screen.",
    steps: [
      {
        nodeId: "high-level-languages",
        title: "You write Python",
        explanation:
          'print("Hello, World!") is a single line of a high-level language. It says what to do and says nothing about registers, memory addresses or devices.',
      },
      {
        nodeId: "interpreters",
        title: "CPython compiles it to bytecode",
        explanation:
          "The interpreter parses the source into a syntax tree and compiles it into bytecode instructions such as LOAD_NAME print, LOAD_CONST 'Hello, World!', CALL.",
      },
      {
        nodeId: "virtual-machines-runtimes",
        title: "The VM executes the bytecode",
        explanation:
          "CPython's evaluation loop reads each bytecode instruction and runs the C code that implements it, eventually calling the built-in print function.",
      },
      {
        nodeId: "standard-libraries",
        title: "print writes to stdout",
        explanation:
          "print converts its argument to text, appends a newline, and writes the bytes to sys.stdout. The runtime's I/O layer hands them to the operating system.",
      },
      {
        nodeId: "system-calls",
        title: "A write() system call",
        explanation:
          'The runtime calls write(1, "Hello, World!\\n", 14). A special instruction switches the CPU from user mode into kernel mode.',
      },
      {
        nodeId: "kernel",
        title: "The kernel takes over",
        explanation:
          "The kernel checks that file descriptor 1 is valid, then copies the 14 bytes into the buffer of the terminal device the program's output is attached to.",
      },
      {
        nodeId: "machine-code",
        title: "Everything is machine code",
        explanation:
          "The interpreter, the runtime and the kernel are themselves compiled programs. Every step so far has been millions of machine instructions.",
      },
      {
        nodeId: "control-unit",
        title: "Fetch and decode",
        explanation:
          "For each instruction, the control unit fetches it from the address in the program counter, decodes its bits and sends control signals to the rest of the CPU.",
      },
      {
        nodeId: "alu",
        title: "Execute in the ALU",
        explanation:
          "Copying bytes, comparing values and computing addresses are all arithmetic and logic operations performed by the ALU on values held in registers.",
      },
      {
        nodeId: "transistors",
        title: "Billions of switches",
        explanation:
          "Each ALU operation is a cascade of logic gates, each gate a handful of transistors switching on or off as voltages change.",
      },
      {
        nodeId: "cache",
        title: "Data flows through cache",
        explanation:
          "The string, the bytecode and the interpreter's own code are pulled from RAM into the caches so the CPU can reach them in a few cycles.",
      },
      {
        nodeId: "ram",
        title: "Main memory holds it all",
        explanation:
          "The Python process, its objects and the kernel's buffers all live in RAM, translated from virtual to physical addresses by the MMU.",
      },
      {
        nodeId: "user-interfaces",
        title: "The terminal draws the text",
        explanation:
          "Your terminal emulator reads the bytes from the kernel, looks up the glyph for each character in a font, and asks the GPU to draw them.",
      },
      {
        nodeId: "gpu",
        title: "The GPU renders the frame",
        explanation:
          "The GPU rasterises the glyphs, the compositor combines the terminal window with everything else on screen, and the result lands in a framebuffer.",
      },
      {
        nodeId: "output-devices",
        title: "Pixels light up",
        explanation:
          "The display controller scans the framebuffer and sets each pixel's colour. Hello, World! appears, roughly a few milliseconds after you pressed Enter.",
      },
    ],
  },

  {
    id: "open-website",
    question: "What happens when I open a website?",
    summary:
      "A URL becomes a DNS lookup, encrypted packets across the world, a server and a database, then a rendered page.",
    steps: [
      {
        nodeId: "web-applications",
        title: "The browser parses the URL",
        explanation:
          "You type example.com and press Enter. The browser works out the scheme (https), the host name and the path it needs to fetch.",
      },
      {
        nodeId: "dns",
        title: "Look up the address",
        explanation:
          "The browser asks a DNS resolver for example.com. The resolver walks from the root servers to the .com servers to the domain's own name servers and returns an IP address.",
      },
      {
        nodeId: "transport-layer",
        title: "Open a connection",
        explanation:
          "The browser opens a TCP connection (or QUIC over UDP) to port 443 on that IP address, exchanging handshake packets to set up a reliable stream.",
      },
      {
        nodeId: "tls",
        title: "Secure it with TLS",
        explanation:
          "The server presents a certificate proving it really is example.com. Both sides use public-key cryptography to agree on session keys, and all traffic from here on is encrypted.",
      },
      {
        nodeId: "http",
        title: "Send an HTTP request",
        explanation:
          "Inside the encrypted channel the browser sends GET / with headers describing what it accepts, its cookies and more.",
      },
      {
        nodeId: "internet-protocol",
        title: "Packets are routed",
        explanation:
          "The request is split into IP packets. Each one is forwarded router by router toward the destination address, possibly taking a different path from the others.",
      },
      {
        nodeId: "link-layer",
        title: "Over Wi-Fi and fibre",
        explanation:
          "On each hop the packet is wrapped in a link-layer frame: radio waves to your Wi-Fi router, then light pulses through fibre.",
      },
      {
        nodeId: "network-hardware",
        title: "Across the internet backbone",
        explanation:
          "Switches, routers and undersea cables carry the packets between networks, guided by the BGP routes each network advertises.",
      },
      {
        nodeId: "load-balancing",
        title: "A load balancer or CDN answers",
        explanation:
          "The request lands at a nearby CDN edge or load balancer. Cached content may be returned immediately; otherwise the request is forwarded to a healthy server.",
      },
      {
        nodeId: "client-server",
        title: "The application server runs",
        explanation:
          "Application code decodes the request, checks the session, and works out what data the page needs.",
      },
      {
        nodeId: "query-processing",
        title: "The database is queried",
        explanation:
          "The server sends SQL to the database, which picks an efficient plan using its indexes and returns the matching rows.",
      },
      {
        nodeId: "jit-compilation",
        title: "The browser builds the page",
        explanation:
          "The HTML response streams back. The browser parses it into a DOM, fetches CSS and JavaScript, and its engine JIT-compiles the scripts so they run quickly.",
      },
      {
        nodeId: "user-interfaces",
        title: "Layout and paint",
        explanation:
          "The browser computes the position of every element, paints them into layers, and has the GPU composite those layers into a frame.",
      },
      {
        nodeId: "output-devices",
        title: "The page appears",
        explanation:
          "The finished frame reaches your display. Dozens of network round trips and billions of instructions later, the page is visible.",
      },
    ],
  },

  {
    id: "mouse-click",
    question: "What happens when I click a mouse?",
    summary:
      "A tiny switch closes, an interrupt fires, the OS routes the event, and an app redraws itself.",
    steps: [
      {
        nodeId: "input-devices",
        title: "The button closes a switch",
        explanation:
          "Pressing the button closes a small mechanical switch. A microcontroller inside the mouse notices and builds a report saying which button changed.",
      },
      {
        nodeId: "electrical-signals",
        title: "A change in voltage",
        explanation:
          "The click is first just a voltage changing on a wire, sampled and debounced by the mouse's microcontroller.",
      },
      {
        nodeId: "interconnects",
        title: "Sent over USB or Bluetooth",
        explanation:
          "The report travels as a USB HID packet (or over Bluetooth radio) to the host controller, which writes it into memory using DMA.",
      },
      {
        nodeId: "interrupts",
        title: "An interrupt fires",
        explanation:
          "The host controller raises an interrupt. The CPU pauses what it was doing, saves its state and jumps into the kernel's interrupt handler.",
      },
      {
        nodeId: "device-drivers",
        title: "The driver decodes it",
        explanation:
          "The USB and HID drivers decode the report into a generic event: button 1 pressed at the current pointer position.",
      },
      {
        nodeId: "scheduling",
        title: "The UI thread wakes up",
        explanation:
          "The event is queued for the window system. The scheduler wakes the thread that was waiting for input so it can run on a core.",
      },
      {
        nodeId: "user-interfaces",
        title: "The window system hit-tests",
        explanation:
          "The window server works out which window and which widget sits under the pointer and delivers the click to that application.",
      },
      {
        nodeId: "applications",
        title: "The app's event loop handles it",
        explanation:
          "The application's event loop receives the click, runs the handler for that button, and updates its state.",
      },
      {
        nodeId: "gpu",
        title: "A new frame is rendered",
        explanation:
          "The app redraws the parts of its interface that changed, the GPU renders them, and the compositor builds the next frame.",
      },
      {
        nodeId: "output-devices",
        title: "You see the result",
        explanation:
          "At the next display refresh the new frame appears, usually within a few tens of milliseconds of the click.",
      },
    ],
  },

  {
    id: "llm-token",
    question: "What happens when an LLM generates a token?",
    summary:
      "Text becomes vectors, flows through dozens of transformer layers on GPUs, and becomes a probability over the next token.",
    steps: [
      {
        nodeId: "tokenization",
        title: "Text becomes tokens",
        explanation:
          "The prompt is split into subword tokens, each with an integer ID, and every ID is looked up in an embedding table to get a vector.",
      },
      {
        nodeId: "large-language-models",
        title: "A forward pass begins",
        explanation:
          "The model's job is to predict the next token. The sequence of vectors enters the first of many identical layers.",
      },
      {
        nodeId: "transformers",
        title: "Through the transformer layers",
        explanation:
          "Each layer applies attention, then a feed-forward network, with residual connections and normalisation. Large models stack dozens of these layers.",
      },
      {
        nodeId: "attention",
        title: "Attention looks back",
        explanation:
          "The newest token's query is compared with the keys of every previous token, cached from earlier steps in the KV cache, to decide which context matters most.",
      },
      {
        nodeId: "linear-algebra",
        title: "It's all matrix multiplication",
        explanation:
          "Attention and feed-forward layers are mostly huge matrix multiplications between activations and billions of learned weights.",
      },
      {
        nodeId: "inference-serving",
        title: "The serving system batches requests",
        explanation:
          "An inference server batches your request with many others so the hardware stays busy, and manages the KV cache in GPU memory.",
      },
      {
        nodeId: "gpu",
        title: "Tensor cores do the maths",
        explanation:
          "GPU kernels split each matrix multiply across thousands of cores. Tensor cores multiply small blocks of low-precision numbers in a single instruction.",
      },
      {
        nodeId: "memory-hierarchy",
        title: "Weights stream from memory",
        explanation:
          "Generating one token means reading every weight from high-bandwidth memory. Memory bandwidth, not arithmetic, is often the real bottleneck.",
      },
      {
        nodeId: "transistors",
        title: "Trillions of switches",
        explanation:
          "Underneath, every multiply-add is a pattern of transistors switching, trillions of times for a single token.",
      },
      {
        nodeId: "probability-statistics",
        title: "Sample the next token",
        explanation:
          "The final layer produces a score for every token in the vocabulary. A softmax turns them into probabilities and one token is sampled, shaped by temperature.",
      },
      {
        nodeId: "http",
        title: "Stream it back and repeat",
        explanation:
          "The token is decoded to text and streamed to you, then appended to the sequence. The whole loop runs again for the next token.",
      },
    ],
  },

  {
    id: "robot-sees",
    question: "What happens when a robot sees an object?",
    summary:
      "Photons become pixels, pixels become objects, and objects become motion through a real-time loop.",
    steps: [
      {
        nodeId: "sensors",
        title: "Light hits the camera",
        explanation:
          "Photons strike the camera's image sensor, where each pixel converts light into a voltage that is digitised into a number.",
      },
      {
        nodeId: "information-representation",
        title: "An image is just numbers",
        explanation:
          "A frame is a grid of millions of numbers, three colour channels per pixel, arriving 30 or more times per second.",
      },
      {
        nodeId: "computer-vision",
        title: "Vision finds the object",
        explanation:
          "A vision model scans the frame to detect objects, drawing a box around the cup and labelling it with a confidence score.",
      },
      {
        nodeId: "cnns",
        title: "Neural features",
        explanation:
          "Inside, layers of convolutional filters (or a vision transformer) build up from edges to textures to shapes to whole objects.",
      },
      {
        nodeId: "accelerators",
        title: "On an onboard accelerator",
        explanation:
          "To keep up in real time, the model runs on an embedded GPU or NPU that performs the matrix maths with very little power.",
      },
      {
        nodeId: "perception",
        title: "Fuse into a 3D understanding",
        explanation:
          "Perception combines the detection with depth from stereo or LiDAR to estimate exactly where the object is in 3D space.",
      },
      {
        nodeId: "localization-mapping",
        title: "Place it on the map",
        explanation:
          "The robot knows where it is from SLAM, so it can place the object's position in its own map of the world.",
      },
      {
        nodeId: "motion-planning",
        title: "Plan a movement",
        explanation:
          "A planner searches for a collision-free path for the arm, and inverse kinematics converts the target pose into joint angles.",
      },
      {
        nodeId: "control-systems",
        title: "Close the control loop",
        explanation:
          "A controller compares the arm's actual joint positions with the plan hundreds of times per second and corrects any error.",
      },
      {
        nodeId: "actuators",
        title: "Motors move",
        explanation:
          "The commands drive electric motors, and the gripper closes around the object. The camera keeps watching, and the loop continues.",
      },
    ],
  },
];
