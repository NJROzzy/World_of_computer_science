import type { ArchitectureNode } from "@/types/architecture";

/*
 * Connected computing: networks, data, distributed systems, cloud and
 * security, the systems that link individual computers together.
 */
export const connectedNodes: ArchitectureNode[] = [
  /* ---------------------------------------------------------------------- */
  /* Networking                                                              */
  /* ---------------------------------------------------------------------- */
  {
    id: "networking",
    title: "Computer Networks",
    description:
      "How computers exchange data across a room or across the planet.",
    category: "networking",
    parent: "computer-science",
    details:
      "Networks are built in layers. Each layer solves one problem, such as moving bits over a wire, routing packets between networks, or delivering a reliable stream, and relies on the layer beneath it.",
  },
  {
    id: "network-layers",
    title: "Network Layer Model",
    description:
      "The OSI and TCP/IP stacks that divide networking into independent layers.",
    category: "networking",
    parent: "networking",
    details:
      "Each layer wraps the data from the layer above in its own header (encapsulation). That separation is why a web page can travel over Wi-Fi, fibre and 5G without the browser knowing the difference.",
    examples: ["Physical", "Link", "Network", "Transport", "Application"],
  },
  {
    id: "link-layer",
    title: "Physical & Link Layer",
    description:
      "Moving frames between directly connected machines over cables and radio.",
    category: "networking",
    parent: "networking",
    details:
      "The physical layer encodes bits as light, voltage or radio waves. The link layer groups them into frames, addresses them with MAC addresses, and handles access to shared media like Wi-Fi.",
    examples: ["Ethernet", "Wi-Fi (802.11)", "MAC addresses", "Fibre optics"],
  },
  {
    id: "internet-protocol",
    title: "IP & Routing",
    description:
      "Addressing every device and forwarding packets hop by hop across networks.",
    category: "networking",
    parent: "networking",
    details:
      "The Internet Protocol gives each host an address and delivers packets on a best-effort basis. Routers run protocols like BGP and OSPF to learn which neighbour is the best next hop toward any destination.",
    examples: ["IPv4 / IPv6", "Routers", "BGP", "NAT"],
  },
  {
    id: "transport-layer",
    title: "TCP & UDP",
    description:
      "Turning unreliable packets into reliable streams or fast datagrams between programs.",
    category: "networking",
    parent: "networking",
    details:
      "TCP adds ordering, acknowledgements, retransmission and congestion control on top of IP. UDP skips all of that for speed. Port numbers direct data to the right program on each machine.",
    examples: ["TCP handshake", "Congestion control", "UDP", "QUIC"],
  },
  {
    id: "dns",
    title: "DNS",
    description:
      "The internet's phone book, translating names like example.com into IP addresses.",
    category: "networking",
    parent: "networking",
    details:
      "DNS is a globally distributed, hierarchical database. A resolver walks from the root servers to the top-level domain to the domain's own name servers, caching answers along the way.",
    examples: ["Resolvers", "Root servers", "A / AAAA records", "Caching"],
  },
  {
    id: "http",
    title: "HTTP & Web Protocols",
    description:
      "The request/response protocol that the web and most APIs are built on.",
    category: "networking",
    parent: "networking",
    details:
      "A client sends a request with a method, path and headers; the server replies with a status code and body. HTTP/2 and HTTP/3 multiplex many requests over one connection for speed.",
    examples: ["GET / POST", "Status codes", "REST APIs", "WebSockets"],
  },
  {
    id: "network-hardware",
    title: "Switches & Routers",
    description:
      "The dedicated machines that forward traffic through local networks and the internet.",
    category: "networking",
    parent: "networking",
    details:
      "Switches forward frames within a local network using MAC addresses. Routers connect networks and forward packets by IP address, often using specialised chips to process millions of packets per second.",
    examples: ["Switches", "Routers", "Access points", "Undersea cables"],
  },

  /* ---------------------------------------------------------------------- */
  /* Data                                                                    */
  /* ---------------------------------------------------------------------- */
  {
    id: "databases",
    title: "Data & Databases",
    description:
      "Storing, querying and protecting structured data reliably at scale.",
    category: "data",
    parent: "computer-science",
    details:
      "Databases let many users safely read and change shared data. They combine data structures, storage hardware, concurrency control and query optimisation into one system.",
  },
  {
    id: "data-models",
    title: "Data Models",
    description:
      "Ways of shaping data: relational tables, documents, key-value pairs, graphs.",
    category: "data",
    parent: "databases",
    details:
      "The relational model organises data into tables linked by keys and is still dominant. NoSQL models such as documents, key-value stores and graphs trade some guarantees for flexibility or scale.",
    examples: ["Relational", "Document", "Key-value", "Graph", "Vector"],
  },
  {
    id: "sql",
    title: "SQL & Query Languages",
    description:
      "Declarative languages for asking for data without saying how to fetch it.",
    category: "data",
    parent: "databases",
    details:
      "With SQL you describe the result you want: which rows, joined how, filtered by what. The database decides how to actually compute it.",
    examples: ["SELECT … JOIN … WHERE", "Aggregations", "GraphQL"],
  },
  {
    id: "query-processing",
    title: "Query Processing",
    description:
      "Parsing, optimising and executing queries efficiently.",
    category: "data",
    parent: "databases",
    details:
      "A query optimiser considers many equivalent plans (which index to use, which join order) and estimates their cost from statistics, then picks the cheapest to execute.",
    examples: ["Query planner", "Join algorithms", "Cost estimation"],
  },
  {
    id: "indexing",
    title: "Indexing",
    description:
      "Auxiliary structures that let databases find rows without scanning everything.",
    category: "data",
    parent: "databases",
    details:
      "An index is like the index at the back of a book. B-tree indexes keep keys sorted for range queries; hash indexes give fast exact lookups; vector indexes find similar embeddings.",
    examples: ["B-tree index", "Hash index", "Inverted index", "Vector index"],
  },
  {
    id: "transactions",
    title: "Transactions",
    description:
      "Grouping operations so they happen all-or-nothing, even under concurrency and crashes.",
    category: "data",
    parent: "databases",
    details:
      "ACID transactions are atomic, consistent, isolated and durable. Write-ahead logging makes them survive crashes, and locking or multi-version concurrency control keeps concurrent users from seeing half-finished work.",
    examples: ["ACID", "Write-ahead log", "MVCC", "Isolation levels"],
  },
  {
    id: "storage-engines",
    title: "Storage Engines",
    description:
      "How a database lays data out on disk, using B-trees or log-structured merge trees.",
    category: "data",
    parent: "databases",
    details:
      "The storage engine translates rows into pages on disk and manages a buffer pool in memory. B-tree engines favour reads; LSM-tree engines batch writes sequentially for high write throughput.",
    examples: ["InnoDB", "RocksDB (LSM)", "Buffer pool", "Column stores"],
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    description:
      "Pipelines, warehouses and lakes that move and prepare data for analysis and ML.",
    category: "data",
    parent: "databases",
    details:
      "Organisations collect data from many sources, clean and transform it, and load it into analytical stores. These pipelines feed dashboards and supply training data for machine learning.",
    examples: ["ETL pipelines", "Data warehouses", "Spark", "Data lakes"],
  },

  /* ---------------------------------------------------------------------- */
  /* Distributed systems & cloud                                             */
  /* ---------------------------------------------------------------------- */
  {
    id: "distributed-systems",
    title: "Distributed Systems",
    description:
      "Many computers cooperating over a network to act as one reliable system.",
    category: "systems",
    parent: "computer-science",
    details:
      "Distributed systems give us scale and fault tolerance, but machines fail independently and messages can be delayed or lost. The field is about building correct systems despite this.",
  },
  {
    id: "client-server",
    title: "Client–Server & Web Servers",
    description:
      "Clients send requests; servers listen, process them, and send responses.",
    category: "systems",
    parent: "distributed-systems",
    details:
      "Most internet services follow this model. A web server accepts connections, routes each request to application code, which may consult databases and caches before returning a response.",
    examples: ["nginx", "Application servers", "APIs", "Microservices"],
  },
  {
    id: "load-balancing",
    title: "Load Balancing & Caching",
    description:
      "Spreading traffic across servers and keeping hot data close to users.",
    category: "systems",
    parent: "distributed-systems",
    details:
      "Load balancers distribute requests so no single server is overwhelmed and failed servers are bypassed. Caches like Redis and CDNs serve repeat requests without redoing the work.",
    examples: ["Load balancers", "Redis / Memcached", "CDNs"],
  },
  {
    id: "replication",
    title: "Replication",
    description:
      "Keeping copies of data on several machines for durability and availability.",
    category: "systems",
    parent: "distributed-systems",
    details:
      "If one machine dies, a replica can take over. The challenge is keeping copies in agreement, either by synchronously waiting for replicas or by accepting temporary differences.",
    examples: ["Leader-follower", "Multi-leader", "Quorums"],
  },
  {
    id: "partitioning",
    title: "Partitioning & Sharding",
    description:
      "Splitting data across machines so each holds and serves only a part.",
    category: "systems",
    parent: "distributed-systems",
    details:
      "When data outgrows one machine, it is divided by key range or by hash. Consistent hashing lets machines be added or removed while moving as little data as possible.",
    examples: ["Range partitioning", "Hash partitioning", "Consistent hashing"],
  },
  {
    id: "consensus",
    title: "Consensus",
    description:
      "Getting unreliable machines to agree on a single value or order of events.",
    category: "systems",
    parent: "distributed-systems",
    details:
      "Consensus algorithms like Paxos and Raft let a cluster agree on a log of operations as long as a majority of nodes are alive. They are the foundation of coordination services and replicated databases.",
    examples: ["Raft", "Paxos", "Leader election", "etcd / ZooKeeper"],
  },
  {
    id: "consistency-models",
    title: "Consistency & CAP",
    description:
      "The guarantees a distributed system offers about what readers will see.",
    category: "systems",
    parent: "distributed-systems",
    details:
      "The CAP theorem says that during a network partition a system must choose between consistency and availability. Consistency models range from strict linearizability to eventual consistency.",
    examples: ["CAP theorem", "Linearizability", "Eventual consistency"],
  },
  {
    id: "messaging",
    title: "Messaging & Streams",
    description:
      "Queues and logs that let services communicate asynchronously.",
    category: "systems",
    parent: "distributed-systems",
    details:
      "Instead of calling each other directly, services can publish events to a durable log or queue. This decouples producers from consumers and smooths out bursts of load.",
    examples: ["Kafka", "RabbitMQ", "Pub/sub", "Event sourcing"],
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    description:
      "Renting compute, storage and services on demand from huge shared data centres.",
    category: "systems",
    parent: "distributed-systems",
    details:
      "Cloud providers operate warehouse-scale computers and sell slices of them as virtual machines, containers, managed databases and functions, billed by usage.",
    examples: ["AWS", "Google Cloud", "Azure", "IaaS / PaaS / SaaS"],
  },
  {
    id: "virtualization",
    title: "Virtualization",
    description:
      "Running many isolated virtual machines on one physical server.",
    category: "systems",
    parent: "cloud-computing",
    details:
      "A hypervisor presents each guest OS with virtual CPUs, memory and devices, using hardware support to keep guests isolated and fast. It is the foundation of cloud infrastructure.",
    examples: ["KVM", "Xen", "VMware", "Firecracker"],
  },
  {
    id: "containers",
    title: "Containers",
    description:
      "Lightweight isolated environments that package an app with its dependencies.",
    category: "systems",
    parent: "cloud-computing",
    details:
      "Containers share the host kernel but use namespaces and cgroups to isolate processes, file systems and resources. They start in milliseconds and run the same everywhere.",
    examples: ["Docker", "Namespaces & cgroups", "OCI images"],
  },
  {
    id: "orchestration",
    title: "Orchestration",
    description:
      "Automatically deploying, scaling and healing containers across a cluster.",
    category: "systems",
    parent: "cloud-computing",
    details:
      "You declare the desired state and the orchestrator continually works to make reality match it: placing containers on machines, restarting failures and scaling with load.",
    examples: ["Kubernetes", "Autoscaling", "Service discovery"],
  },
  {
    id: "serverless",
    title: "Serverless",
    description:
      "Running code as on-demand functions without managing servers at all.",
    category: "systems",
    parent: "cloud-computing",
    details:
      "The platform starts an instance of your function when a request arrives and scales to zero when idle. You pay only for execution time.",
    examples: ["AWS Lambda", "Edge functions", "Cold starts"],
  },
  {
    id: "data-centers",
    title: "Data Centres",
    description:
      "Buildings full of servers, networks, power and cooling that host the cloud.",
    category: "systems",
    parent: "cloud-computing",
    details:
      "A modern data centre holds tens of thousands of servers linked by high-bandwidth fabrics. Power delivery and cooling are as much engineering challenges as the computers themselves.",
    examples: ["Racks", "Leaf-spine networks", "PUE", "GPU clusters"],
  },

  /* ---------------------------------------------------------------------- */
  /* Security                                                                */
  /* ---------------------------------------------------------------------- */
  {
    id: "security",
    title: "Cybersecurity",
    description:
      "Protecting systems and data from attackers at every layer of the stack.",
    category: "security",
    parent: "computer-science",
    details:
      "Security asks what can go wrong when someone is actively trying to break a system. Because every layer depends on the one below, a weakness anywhere, from transistors to applications, can compromise everything above it.",
  },
  {
    id: "cryptography",
    title: "Cryptography",
    description:
      "Mathematics for keeping secrets, proving identity and detecting tampering.",
    category: "security",
    parent: "security",
    details:
      "Modern cryptography builds on problems believed to be computationally hard, such as factoring large numbers. It provides confidentiality, integrity and authenticity.",
  },
  {
    id: "symmetric-crypto",
    title: "Symmetric Encryption",
    description:
      "One shared key to both encrypt and decrypt: fast and used for bulk data.",
    category: "security",
    parent: "cryptography",
    examples: ["AES", "ChaCha20", "Block & stream ciphers"],
  },
  {
    id: "public-key-crypto",
    title: "Public-Key Cryptography",
    description:
      "Key pairs that let strangers exchange secrets and verify signatures.",
    category: "security",
    parent: "cryptography",
    details:
      "Anyone can encrypt with your public key, but only your private key can decrypt. Digital signatures work in reverse. Key exchange protocols like Diffie-Hellman let two parties agree a secret over an open channel.",
    examples: ["RSA", "Elliptic curves", "Diffie-Hellman", "Digital signatures"],
  },
  {
    id: "hashing",
    title: "Cryptographic Hashing",
    description:
      "One-way fingerprints of data, used for integrity checks and password storage.",
    category: "security",
    parent: "cryptography",
    examples: ["SHA-256", "HMAC", "bcrypt / Argon2"],
  },
  {
    id: "tls",
    title: "TLS",
    description:
      "The protocol that encrypts and authenticates connections, putting the S in HTTPS.",
    category: "security",
    parent: "security",
    details:
      "During the TLS handshake the server proves its identity with a certificate signed by a trusted authority and both sides agree on session keys. Everything afterwards is encrypted and tamper-evident.",
    examples: ["Handshake", "Certificates", "Certificate authorities"],
  },
  {
    id: "authentication",
    title: "Authentication & Access Control",
    description:
      "Verifying who someone is and deciding what they are allowed to do.",
    category: "security",
    parent: "security",
    examples: ["Passwords & MFA", "OAuth / OpenID Connect", "Passkeys", "Permissions"],
  },
  {
    id: "software-security",
    title: "Software Security",
    description:
      "Preventing bugs that attackers can exploit, like buffer overflows and injection.",
    category: "security",
    parent: "security",
    details:
      "Many attacks exploit programs that trust their input too much. Memory-safe languages, input validation, sandboxing and fuzzing all reduce the attack surface.",
    examples: ["Buffer overflows", "SQL injection", "XSS", "Fuzzing"],
  },
  {
    id: "network-security",
    title: "Network Security",
    description:
      "Firewalls, segmentation and monitoring to control and inspect traffic.",
    category: "security",
    parent: "security",
    examples: ["Firewalls", "VPNs", "Intrusion detection", "Zero trust"],
  },
  {
    id: "system-security",
    title: "OS & Hardware Security",
    description:
      "Isolation, secure boot and trusted hardware that protect the foundations.",
    category: "security",
    parent: "security",
    details:
      "The OS isolates processes with privilege levels and virtual memory. Secure boot verifies each stage of startup, and secure enclaves protect secrets even from a compromised OS. Side-channel attacks like Spectre show hardware optimisations can leak data.",
    examples: ["Secure boot", "TPM / secure enclave", "Sandboxing", "Spectre"],
  },
];
