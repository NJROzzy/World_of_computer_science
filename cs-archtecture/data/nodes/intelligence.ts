import type { ArchitectureNode } from "@/types/architecture";

/*
 * Intelligence: artificial intelligence, robotics and emerging computing.
 */
export const intelligenceNodes: ArchitectureNode[] = [
  /* ---------------------------------------------------------------------- */
  /* Artificial intelligence                                                 */
  /* ---------------------------------------------------------------------- */
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    description:
      "Building systems that perceive, reason, learn and act intelligently.",
    category: "intelligence",
    parent: "computer-science",
    details:
      "AI began with hand-written rules and search, and today is dominated by machine learning, where behaviour is learned from data rather than programmed. It sits on top of almost every other layer of computer science.",
  },
  {
    id: "search-planning",
    title: "Search & Planning",
    description:
      "Classical AI that explores possible actions to find a path to a goal.",
    category: "intelligence",
    parent: "artificial-intelligence",
    details:
      "Many problems, from chess to route planning, can be framed as searching a space of states. Heuristics like A* guide the search toward promising states.",
    examples: ["A* search", "Minimax", "Constraint satisfaction"],
  },
  {
    id: "knowledge-reasoning",
    title: "Knowledge & Reasoning",
    description:
      "Representing facts and rules so a system can draw logical conclusions.",
    category: "intelligence",
    parent: "artificial-intelligence",
    examples: ["Logic programming", "Knowledge graphs", "Expert systems"],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description:
      "Algorithms that improve at a task by learning patterns from data.",
    category: "intelligence",
    parent: "artificial-intelligence",
    details:
      "Instead of writing rules, you choose a model with adjustable parameters and an objective, then let an optimiser fit the parameters to data. The result generalises to examples it has never seen.",
  },
  {
    id: "supervised-learning",
    title: "Supervised Learning",
    description:
      "Learning a mapping from inputs to labelled outputs: classification and regression.",
    category: "intelligence",
    parent: "machine-learning",
    examples: ["Linear regression", "Decision trees", "Image classification"],
  },
  {
    id: "unsupervised-learning",
    title: "Unsupervised Learning",
    description:
      "Discovering structure in unlabelled data: clusters, embeddings, compression.",
    category: "intelligence",
    parent: "machine-learning",
    examples: ["k-means", "PCA", "Autoencoders", "Self-supervised learning"],
  },
  {
    id: "reinforcement-learning",
    title: "Reinforcement Learning",
    description:
      "Learning to act by trial and error, maximising reward from an environment.",
    category: "intelligence",
    parent: "machine-learning",
    details:
      "An agent takes actions, observes results and receives rewards, gradually learning a policy. RL trained AlphaGo, controls robots and is used to align language models with human preferences (RLHF).",
    examples: ["Q-learning", "Policy gradients", "RLHF"],
  },
  {
    id: "training-optimization",
    title: "Training & Optimisation",
    description:
      "Gradient descent and its variants that tune model parameters to reduce error.",
    category: "intelligence",
    parent: "machine-learning",
    details:
      "Training repeatedly measures how wrong the model is (the loss) and nudges every parameter in the direction that reduces it. Large models train on thousands of accelerators for weeks.",
    examples: ["Loss functions", "SGD / Adam", "Overfitting & regularisation"],
  },
  {
    id: "inference-serving",
    title: "Inference & Serving",
    description:
      "Running trained models efficiently to answer real requests.",
    category: "intelligence",
    parent: "machine-learning",
    details:
      "Serving a model means loading its weights onto accelerators and running forward passes as fast and cheaply as possible, using techniques like batching, quantisation and caching.",
    examples: ["Batching", "Quantisation", "KV cache", "Model servers"],
  },
  {
    id: "neural-networks",
    title: "Neural Networks",
    description:
      "Layers of weighted sums and nonlinearities, loosely inspired by neurons.",
    category: "intelligence",
    parent: "machine-learning",
    details:
      "Each layer multiplies its input by a weight matrix, adds a bias and applies a nonlinear function. Stacked layers can approximate extraordinarily complex functions.",
    examples: ["Perceptrons", "Activation functions", "Multilayer perceptrons"],
  },
  {
    id: "backpropagation",
    title: "Backpropagation",
    description:
      "Computing how every weight affects the loss by applying the chain rule backwards.",
    category: "intelligence",
    parent: "neural-networks",
    details:
      "Backpropagation runs the network forward, then walks backwards through each layer computing gradients. Automatic differentiation frameworks do this for you.",
    examples: ["Chain rule", "Autograd", "PyTorch / JAX"],
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    description:
      "Very large, many-layered neural networks trained on massive datasets.",
    category: "intelligence",
    parent: "neural-networks",
    details:
      "Depth lets networks learn hierarchies of features, from edges to shapes to objects. Deep learning took off once GPUs made training such networks practical.",
  },
  {
    id: "cnns",
    title: "Convolutional Networks",
    description:
      "Networks that slide small filters over images to detect local patterns.",
    category: "intelligence",
    parent: "deep-learning",
    examples: ["Convolutions", "Pooling", "ResNet"],
  },
  {
    id: "transformers",
    title: "Transformers",
    description:
      "The attention-based architecture behind modern language and vision models.",
    category: "intelligence",
    parent: "deep-learning",
    details:
      "Introduced in 2017, transformers process whole sequences in parallel and let every token attend to every other. They scale remarkably well with data and compute.",
    examples: ["Encoder / decoder", "Positional encoding", "Multi-head attention"],
  },
  {
    id: "attention",
    title: "Attention",
    description:
      "A mechanism that lets each token weigh how relevant every other token is.",
    category: "intelligence",
    parent: "transformers",
    details:
      "Each token produces a query, key and value vector. Comparing a query to every key gives weights, which mix the values together. At its heart, attention is matrix multiplication and a softmax.",
    examples: ["Queries, keys & values", "Softmax", "Self-attention"],
  },
  {
    id: "foundation-models",
    title: "Foundation Models",
    description:
      "Huge models pretrained on broad data, then adapted to many tasks.",
    category: "intelligence",
    parent: "transformers",
    details:
      "Rather than training a new model for each task, a single model is pretrained on vast data and then fine-tuned or prompted for specific uses.",
    examples: ["Pretraining", "Fine-tuning", "Multimodal models"],
  },
  {
    id: "large-language-models",
    title: "Large Language Models",
    description:
      "Foundation models that generate text one token at a time.",
    category: "intelligence",
    parent: "foundation-models",
    details:
      "An LLM predicts a probability distribution over the next token given all previous tokens, samples one, appends it and repeats. Trained at scale, this simple loop produces fluent reasoning, code and conversation.",
    examples: ["Next-token prediction", "Sampling & temperature", "Context windows"],
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    description:
      "Models that plan, use tools and take multi-step actions toward goals.",
    category: "intelligence",
    parent: "foundation-models",
    details:
      "Agents wrap a model in a loop: observe, think, call a tool (a search, a program, an API), observe the result, and continue until the task is done.",
    examples: ["Tool use", "Planning loops", "Coding agents"],
  },
  {
    id: "natural-language-processing",
    title: "Natural Language Processing",
    description:
      "Getting computers to understand and generate human language.",
    category: "intelligence",
    parent: "artificial-intelligence",
    examples: ["Translation", "Summarisation", "Speech recognition"],
  },
  {
    id: "tokenization",
    title: "Tokenisation & Embeddings",
    description:
      "Splitting text into tokens and mapping each to a vector of numbers.",
    category: "intelligence",
    parent: "natural-language-processing",
    details:
      "Models cannot read characters directly. A tokeniser splits text into subword pieces with integer IDs, and an embedding table turns each ID into a vector the network can process.",
    examples: ["Byte-pair encoding", "Token IDs", "Embedding vectors"],
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description:
      "Extracting meaning from images and video: recognising, locating and tracking.",
    category: "intelligence",
    parent: "artificial-intelligence",
    details:
      "Vision systems turn raw pixel arrays into labels, bounding boxes, segmentation masks or 3D understanding, typically using CNNs or vision transformers.",
    examples: ["Classification", "Object detection", "Segmentation", "Depth estimation"],
  },

  /* ---------------------------------------------------------------------- */
  /* Robotics                                                                */
  /* ---------------------------------------------------------------------- */
  {
    id: "robotics",
    title: "Robotics",
    description:
      "Machines that sense the physical world, decide, and act within it.",
    category: "intelligence",
    parent: "computer-science",
    details:
      "Robotics closes the loop between computation and the physical world: sensors feed perception, perception feeds planning, planning feeds control, and control drives motors, many times per second.",
  },
  {
    id: "sensors",
    title: "Sensors",
    description:
      "Cameras, LiDAR, IMUs and touch sensors that measure the environment.",
    category: "intelligence",
    parent: "robotics",
    examples: ["Cameras", "LiDAR", "IMU", "Force / torque sensors"],
  },
  {
    id: "perception",
    title: "Perception",
    description:
      "Turning raw sensor data into an understanding of objects and surroundings.",
    category: "intelligence",
    parent: "robotics",
    examples: ["Object detection", "Sensor fusion", "Pose estimation"],
  },
  {
    id: "localization-mapping",
    title: "Localisation & Mapping",
    description:
      "Working out where the robot is while building a map of where it has been.",
    category: "intelligence",
    parent: "robotics",
    examples: ["SLAM", "Kalman filters", "Particle filters"],
  },
  {
    id: "motion-planning",
    title: "Motion Planning",
    description:
      "Finding collision-free paths and movements to reach a goal.",
    category: "intelligence",
    parent: "robotics",
    examples: ["RRT", "Trajectory optimisation", "Inverse kinematics"],
  },
  {
    id: "control-systems",
    title: "Control Systems",
    description:
      "Feedback loops that continuously correct motion to follow a plan.",
    category: "intelligence",
    parent: "robotics",
    details:
      "A controller compares where the robot is with where it should be and adjusts motor commands to shrink the error, often hundreds or thousands of times per second.",
    examples: ["PID control", "Model predictive control", "Real-time loops"],
  },
  {
    id: "actuators",
    title: "Actuators",
    description:
      "Motors, servos and grippers that convert signals into physical motion.",
    category: "intelligence",
    parent: "robotics",
    examples: ["Electric motors", "Servos", "Grippers", "Hydraulics"],
  },
  {
    id: "embodied-ai",
    title: "Embodied AI",
    description:
      "Learned models that perceive and act in the physical world end to end.",
    category: "intelligence",
    parent: "robotics",
    details:
      "Embodied AI applies foundation models and reinforcement learning to robots, so behaviour like grasping or walking is learned rather than hand-engineered.",
    examples: ["Vision-language-action models", "Sim-to-real", "Humanoids"],
  },

  /* ---------------------------------------------------------------------- */
  /* Emerging computing                                                      */
  /* ---------------------------------------------------------------------- */
  {
    id: "emerging-computing",
    title: "Emerging Computing",
    description:
      "New computing paradigms beyond classical transistor-based machines.",
    category: "emerging",
    parent: "computer-science",
    details:
      "As transistor scaling slows, researchers are exploring fundamentally different ways to compute, each suited to particular kinds of problems.",
  },
  {
    id: "quantum-computing",
    title: "Quantum Computing",
    description:
      "Computing with qubits that use superposition and entanglement.",
    category: "emerging",
    parent: "emerging-computing",
    details:
      "Qubits can be in combinations of 0 and 1, and quantum algorithms use interference to amplify correct answers. Shor's algorithm could break today's public-key cryptography on a large enough machine.",
    examples: ["Qubits", "Quantum gates", "Shor's algorithm", "Error correction"],
  },
  {
    id: "neuromorphic-computing",
    title: "Neuromorphic Computing",
    description:
      "Chips that mimic the brain's spiking neurons for ultra-efficient processing.",
    category: "emerging",
    parent: "emerging-computing",
    examples: ["Spiking neural networks", "Intel Loihi", "Event cameras"],
  },
  {
    id: "edge-iot",
    title: "Edge & IoT",
    description:
      "Billions of small connected devices computing close to where data is created.",
    category: "emerging",
    parent: "emerging-computing",
    examples: ["Microcontrollers", "TinyML", "Smart sensors"],
  },
  {
    id: "photonic-computing",
    title: "Photonic Computing",
    description:
      "Using light instead of electrons to move and process data.",
    category: "emerging",
    parent: "emerging-computing",
    examples: ["Optical interconnects", "Photonic matrix multipliers"],
  },
];
