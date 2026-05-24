export const site = {
  name: "OpenMantle",
  tagline: "The inference layer cloud providers charge you to reach.",
  description:
    "Open-source, cloud-neutral LLM inference platform. Event-sourced routing, QoS-aware scheduling, GPU fleet management - deployable to any Kubernetes cluster.",
  repoUrl: "https://github.com/openmantlehq/openmantle",
  docsUrl: "https://github.com/openmantlehq/openmantle#readme",
  discordUrl: "#",
};

export type Floor = {
  id: string;
  depth: string;
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
};

export const floors: Floor[] = [
  {
    id: "gateway",
    depth: "01",
    title: "Gateway",
    subtitle: "Chat Completions API + Messages API.",
    body: "Drop-in for the OpenAI Chat Completions API (/v1/chat/completions) and Anthropic Messages API (/v1/messages). Keep your clients, auth, and rate limits — swap the base URL.",
    tags: ["axum", "SSE streaming", "API-key auth", "tower middleware"],
  },
  {
    id: "router",
    depth: "02",
    title: "Router",
    subtitle: "Every request is an event.",
    body: "Event-sourced job state over a Kafka-compatible log. Replayable, recoverable, observable - every transition is a record on disk.",
    tags: [
      "Redpanda Pandaproxy",
      "in-memory materialized view",
      "JobSubmitted -> JobAssigned -> JobCompleted",
    ],
  },
  {
    id: "scheduler",
    depth: "03",
    title: "Scheduler",
    subtitle: "Fair queueing across models.",
    body: "Priority -> OnDemand -> Batch tiers. Lease-based dispatch with TTL reclaim. Tokens stream back through the same path.",
    tags: ["QoS tiers", "least-loaded backend selection", "SSE relay"],
  },
  {
    id: "gpu-agent",
    depth: "04",
    title: "GPU-Agent",
    subtitle: "Your GPUs, your rules.",
    body: "Runs on every GPU node. Pulls weights from HuggingFace Hub, S3, or any object store. Manages vLLM lifecycle, reports health upstream.",
    tags: ["HuggingFace Hub", "S3 / MinIO", "local path", "WebSocket JSON-RPC"],
  },
  {
    id: "mantle",
    depth: "05",
    title: "The Mantle",
    subtitle: "Raw vLLM. Raw silicon.",
    body: "PagedAttention, continuous batching, tensor parallelism. This is the layer Bedrock charges a markup to reach. You now own it.",
    tags: ["vLLM", "PagedAttention", "tensor parallel", "NVIDIA device plugin"],
  },
];

export type Cloud = {
  id: string;
  name: string;
  shortLabel: string;
  valuesFile: string;
  command: string;
  notes: string;
};

export const clouds: Cloud[] = [
  {
    id: "aws",
    name: "AWS EKS",
    shortLabel: "AWS",
    valuesFile: "values-aws",
    command:
      'helm upgrade --install openmantle oci://ghcr.io/openmantle/charts/openmantle -f values-aws --set vllm.model="mistralai/Mistral-7B-Instruct-v0.3"',
    notes: "Uses NLB and gp3 storage class. NVIDIA device plugin pre-configured.",
  },
  {
    id: "gcp",
    name: "GCP GKE",
    shortLabel: "GCP",
    valuesFile: "values-gcp",
    command:
      'helm upgrade --install openmantle oci://ghcr.io/openmantle/charts/openmantle -f values-gcp --set vllm.model="mistralai/Mistral-7B-Instruct-v0.3"',
    notes: "Uses GCE L4 LB and standard-rwo storage class. NVIDIA device plugin pre-configured.",
  },
  {
    id: "azure",
    name: "Azure AKS",
    shortLabel: "Azure",
    valuesFile: "values-azure",
    command:
      'helm upgrade --install openmantle oci://ghcr.io/openmantle/charts/openmantle -f values-azure --set vllm.model="mistralai/Mistral-7B-Instruct-v0.3"',
    notes: "Uses Azure LB and managed-csi storage class. NVIDIA device plugin pre-configured.",
  },
  {
    id: "onprem",
    name: "Bare-metal K8s",
    shortLabel: "On-prem",
    valuesFile: "values-onprem",
    command:
      'helm upgrade --install openmantle oci://ghcr.io/openmantle/charts/openmantle -f values-onprem --set vllm.model="mistralai/Mistral-7B-Instruct-v0.3"',
    notes: "Uses MetalLB and local-path storage class. NVIDIA device plugin pre-configured.",
  },
  {
    id: "local",
    name: "kind (laptop)",
    shortLabel: "Local",
    valuesFile: "values-local",
    command: "./scripts/clouds/local.sh",
    notes: "Uses port-forward and hostpath storage class. CPU-only mode for local testing.",
  },
];

export const parityMatrix = {
  columns: ["AWS", "GCP", "Azure", "On-prem", "Local"],
  rows: [
    {
      feature: "Core services (gateway / router / scheduler / agent)",
      support: ["✅", "✅", "✅", "✅", "✅"],
    },
    {
      feature: "Event journal (Redpanda, Kafka-compatible)",
      support: ["✅", "✅", "✅", "✅", "✅"],
    },
    {
      feature: "Capacity manager + KEDA autoscaling",
      support: ["✅", "✅", "✅", "✅", "✅"],
    },
    {
      feature: "LoadBalancer for public endpoint",
      support: ["NLB", "GCE-LB", "Azure LB", "MetalLB", "port-forward"],
    },
    {
      feature: "StorageClass for model cache",
      support: ["gp3", "standard-rwo", "managed-csi", "local-path", "hostpath"],
    },
    {
      feature: "GPU scheduling",
      support: [
        "device-plugin",
        "device-plugin",
        "device-plugin",
        "device-plugin",
        "container toolkit",
      ],
    },
    {
      feature: "Model weights source",
      support: [
        "HF Hub / S3",
        "HF Hub / GCS",
        "HF Hub / Blob",
        "HF Hub / MinIO",
        "HF Hub / local",
      ],
    },
  ],
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Why run your own GPUs vs paying per token?",
    answer: "Renting or owning GPUs becomes significantly more cost-effective at scale. Paying per token means you're paying a massive markup for the provider's infrastructure and profit margins. By running OpenMantle on your own hardware or cloud instances, you pay flat compute costs while achieving the same or better throughput, latency, and reliability."
  },
  {
    question: "Is OpenMantle a drop-in replacement for the OpenAI and Anthropic APIs?",
    answer: "Yes. OpenMantle exposes both an OpenAI-compatible surface (/v1/chat/completions) and an Anthropic Messages API surface (/v1/messages). Point your existing SDK at your OpenMantle gateway URL and nothing else changes — same Bearer token auth, same SSE streaming protocol."
  },
  {
    question: "Do I need a GPU to try OpenMantle locally?",
    answer: "No. The gpu-agent ships with a built-in mock inference backend. Run 'docker compose -f docker-compose.dev.yml up --build' and the full six-service stack starts on your laptop — no GPU, no vLLM, no model weights required. The mock streams real SSE tokens so you can exercise the entire routing and scheduling path."
  },
  {
    question: "How does the event-sourced router work?",
    answer: "Every job state transition — JobSubmitted, JobAssigned, JobCompleted, JobLeaseExpired — is appended to a durable journal before any in-memory state changes. On restart the router replays the journal to rebuild its view. This means no state is ever silently lost: you can audit every routing decision, replay for debugging, or snapshot and truncate for storage efficiency."
  },
  {
    question: "What happens when a GPU node goes offline mid-request?",
    answer: "The router issues leases with a configurable TTL. A background reclaim loop scans for jobs whose lease has expired without a completion event and re-queues them for dispatch to a healthy backend. The eviction loop separately removes backends that miss heartbeat deadlines, so dead nodes are drained from the routing table automatically."
  },
  {
    question: "Can I connect external providers like OpenAI or Anthropic alongside local GPUs?",
    answer: "Yes. The proxy-agent registers as a standard backend with the router. Set OPENAI_API_KEY or ANTHROPIC_API_KEY in its environment and it will accept requests for those model IDs, translating between OpenMantle's internal wire format and the upstream provider's API. You can route to local GPUs for cost-sensitive traffic and fall back to external providers for burst capacity."
  },
  {
    question: "How does autoscaling work?",
    answer: "The capacity service exposes a Prometheus metrics endpoint that KEDA polls. When openmantle_queue_depth{tier='on_demand'} crosses the configured threshold, KEDA scales up the gpu-worker Deployment. When it drains below the threshold, replicas scale back down to the configured minimum. No custom operators or vendor-specific tooling required."
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "6", label: "Rust services" },
  { value: "~4k", label: "lines of Rust" },
  { value: "MIT", label: "licensed" },
  { value: "0", label: "vendor lock-in" },
  { value: "1 cmd", label: "to deploy" },
  { value: "0→N",    label: "KEDA autoscale" },
];
