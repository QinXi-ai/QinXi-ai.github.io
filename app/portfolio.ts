// Public contribution snapshot checked against GitHub on 2026-11-25.
export const portfolioUpdated = '2026-11-25';
export const contributionStats = { merged: 98, repositories: 28, recent: 31 };
export const researchUpdated = '2026-11-25';
export const researchStats = { papers: 4, accepted: 1, preprints: 3 };

export const latestPaper = {
  title:
    'Failure Steps Are Not Repair Intents: Measuring Actionable Ambiguity in Multi-Agent System Diagnosis',
  href: '#failure-steps-are-not-repair-intents',
  venue: 'WSDM 2027 Findings',
  status: 'Accepted',
  author: 'First author: Xi Qin',
};

export const identityPaper = {
  title:
    "Instance-Optimal Identity Testing at the Original Total-Variation Radius: Resolving Canonne's 2024 Open Question 1",
  href: 'https://zenodo.org/records/23584756',
  pdf: 'https://zenodo.org/records/23584756/files/instance_optimal_identity_testing_v1.pdf',
  source:
    'https://zenodo.org/records/23584756/files/instance_optimal_identity_testing_v1_source.zip',
  doi: '10.5281/zenodo.23584756',
  leanRepo: 'https://github.com/QinXi-ai/identity-testing-lean',
  leanModules: 530,
};

export const mergedSearch =
  'https://github.com/search?q=is%3Apr+author%3AQinXi-ai+is%3Amerged+is%3Apublic+-user%3AQinXi-ai&type=pullrequests';

export const selectionPaper = {
  title: 'Exact Three-Example Selection in Every Dimension',
  date: '2026-10-03',
  doi: '10.5281/zenodo.23119254',
  href: 'https://zenodo.org/records/23119254',
  pdf: 'https://zenodo.org/records/23119254/files/exact-three-example-selection.pdf',
  source:
    'https://zenodo.org/records/23119254/files/exact-three-example-selection-source-v1.0.zip',
};

export const projects = [
  {
    name: 'identity-testing-lean',
    description:
      "530-module Lean 4 formalization of instance-optimal identity testing at the original TV radius, including certified rational interval evaluation and axiom audit.",
    language: 'Lean 4',
    href: 'https://github.com/QinXi-ai/identity-testing-lean',
  },
  {
    name: 'Pocket MOSS Image',
    description:
      'Low-memory MOSS-Image inference: the original 9B text encoder with packed INT6 weights and a streamed, fused INT8 DiT. No retraining or replacement encoder.',
    language: 'Python / PyTorch',
    href: 'https://github.com/QinXi-ai/pocket-moss-image',
  },
  {
    name: 'evalspec-audit',
    description:
      'Reproducible audits of how evaluation choices affect scores, rankings, and the claims a benchmark supports.',
    language: 'Python',
    href: 'https://github.com/QinXi-ai/evalspec-audit',
  },
  {
    name: 'FastRead',
    description:
      'A paper-reading workspace with page-linked evidence, research reports, notes, and conversations grounded in the original PDF.',
    language: 'Python / TypeScript',
    href: 'https://github.com/FastR-D/FastRead',
  },
  {
    name: 'MoonCat · 月薪喵',
    description:
      'An openvela wearable recovery coach combining an LVGL interface, scheduled reminders, and on-device INT8 intent routing.',
    language: 'C / openvela',
    href: 'https://github.com/open-vela/contest2026_477_smartband',
  },
  {
    name: 'moonguard',
    description:
      'Public API compatibility checks and semantic-versioning safeguards for MoonBit libraries.',
    language: 'MoonBit',
    href: 'https://github.com/QinXi-ai/moonguard',
  },
  {
    name: 'AstroTwin · public demo',
    description:
      'A browser-based astronomy research demo with TESS evidence snapshots, guided analyses, and optional Qwen-assisted research planning.',
    language: 'JavaScript',
    href: 'https://github.com/QinXi-ai/astrotwin-demo',
  },
  {
    name: 'openvela-smarthome-agent',
    description:
      'A smart-home agent with simulated devices, a DeepSeek tool-calling loop, and a reproducible offline mode on the openvela emulator.',
    language: 'C / openvela',
    href: 'https://github.com/QinXi-ai/openvela-smarthome-agent',
  },
];

export const contributions = [
  {
    repo: 'dllm-labs / mojo-dllm',
    number: '#175',
    title: 'Calibrate DiffusionGemma parity on fixed reference inputs',
    category: 'GPU & Mojo',
    summary:
      'Established deterministic reference calibration and numerical parity checks for DiffusionGemma inference paths across cached and uncached execution.',
    proof: 'Fixed-reference parity suite · cached path verification',
    stats: '+10,825 −129 · 20 files',
    mergedAt: '2026-11-24',
    href: 'https://github.com/dllm-labs/mojo-dllm/pull/175',
  },
  {
    repo: 'lacs-project / sysknife',
    number: '#786',
    title: 'Export both audit chains and verify them offline',
    category: 'Agent security',
    summary:
      'Added offline export and cryptographic verification for dual audit chains, letting operators inspect and validate execution integrity without a live daemon.',
    proof: 'Tamper-detection tests · end-to-end chain verification',
    stats: '+306 −28 · 11 files',
    mergedAt: '2026-11-15',
    href: 'https://github.com/lacs-project/sysknife/pull/786',
  },
  {
    repo: 'apache / datafusion',
    number: '#25988',
    title: 'Add opt-in native grouped integer DISTINCT counts',
    category: 'Query engines',
    summary:
      'Implemented an opt-in native grouped integer path for COUNT(DISTINCT), bypassing generic accumulator overhead on high-cardinality integer columns.',
    proof: 'SQL logic tests · planner & accumulator benchmarks',
    stats: '+779 −12 · 21 files',
    mergedAt: '2026-11-08',
    href: 'https://github.com/apache/datafusion/pull/25988',
  },
  {
    repo: 'dllm-labs / mojo-dllm',
    number: '#73',
    title: 'Batch long GQA loads without changing softmax order',
    category: 'GPU & Mojo',
    summary:
      'Batched long grouped-query attention loads to improve memory throughput while preserving exact floating-point softmax accumulation order.',
    proof: 'Order-preserving numerical checks · long-context GQA tests',
    stats: '+7,108 −82 · 12 files',
    mergedAt: '2026-11-04',
    href: 'https://github.com/dllm-labs/mojo-dllm/pull/73',
  },
  {
    repo: 'dllm-labs / mojo-dllm',
    number: '#71',
    title: 'Tune Q4_K tile dispatch for RTX Blackwell with 6000D benchmarks',
    category: 'GPU & Mojo',
    summary:
      'Profiled and tuned Q4_K quantized matmul tile dispatch schedules specifically for RTX Blackwell GPUs, backed by reproducible RTX PRO 6000D benchmarks.',
    proof: 'RTX PRO 6000D benchmarks · quantized kernel parity',
    stats: '+5,739 −14 · 19 files',
    mergedAt: '2026-11-03',
    href: 'https://github.com/dllm-labs/mojo-dllm/pull/71',
  },
  {
    repo: 'apache / datafusion',
    number: '#25765',
    title: 'Give lazy generators a serialization hook',
    category: 'Query engines',
    summary:
      'Let LazyMemoryExec generators encode themselves while preserving the existing single-generator wire format, extension fallback, and repeatable execution after a round trip.',
    proof: 'Legacy wire compatibility · round-trip execution tests',
    stats: '+804 −240 · 11 files',
    mergedAt: '2026-10-19',
    href: 'https://github.com/apache/datafusion/pull/25765',
  },
  {
    repo: 'microsoft / vscode-eslint',
    number: '#2227',
    title: 'Keep linting inside the workspace',
    category: 'Developer tools',
    summary:
      'Added an opt-in setting to skip local files outside the workspace, while retaining standalone-file, untitled, and virtual-document behavior.',
    proof: '30 client/server tests · workspace boundary regressions',
    stats: '+229 −73 · 8 files',
    mergedAt: '2026-10-16',
    href: 'https://github.com/microsoft/vscode-eslint/pull/2227',
  },
  {
    repo: 'lacs-project / sysknife',
    number: '#573',
    title: 'Redact credentials before tools reach the model',
    category: 'Agent security',
    summary:
      'Screen read-tool results and retained provider context for plaintext credentials, preserving useful log records and ordinary host information.',
    proof: 'Recording-provider regression · 1,949 Linux tests',
    stats: '+617 −7 · 10 files',
    mergedAt: '2026-10-12',
    href: 'https://github.com/lacs-project/sysknife/pull/573',
  },
  {
    repo: 'apache / datafusion',
    number: '#25150',
    title: 'Skip hashing for fully ordered group keys',
    category: 'Query engines',
    summary:
      'Added a columnar path for supported, fully ordered multi-column aggregations. Adjacent equal keys share a group without a hash table, reducing grouping work and retained state.',
    proof:
      'Differential tests · cross-batch coverage · reproducible benchmarks',
    stats: '+779 −2 · 7 files',
    mergedAt: '2026-10-01',
    href: 'https://github.com/apache/datafusion/pull/25150',
  },
  {
    repo: 'pydata / xarray',
    number: '#11552',
    title: 'Bring apply_ufunc to DataTree',
    category: 'Scientific Python',
    summary:
      'Extended array-function dispatch to complete DataTree structures, preserving child datasets, inherited coordinates, core dimensions, and multiple outputs.',
    proof: '323 targeted tests passed · tree-structure regressions',
    stats: '+151 −6 · 4 files',
    mergedAt: '2026-09-09',
    href: 'https://github.com/pydata/xarray/pull/11552',
  },
  {
    repo: 'AndreaBozzo / dataprof',
    number: '#655',
    title: 'Read and profile only selected columns',
    category: 'Data systems',
    summary:
      'Applied column projection across Rust and Python profiling APIs, including streaming and Parquet paths. Physical Parquet projection avoids reading unselected column chunks.',
    proof: 'Rust workspace tests · 353 Python tests · byte-range regressions',
    stats: '+934 −133 · 24 files',
    mergedAt: '2026-09-01',
    href: 'https://github.com/AndreaBozzo/dataprof/pull/655',
  },
  {
    repo: 'awslabs / stickler',
    number: '#284',
    title: 'Replace sklearn metrics with NumPy',
    category: 'Numerical methods',
    summary:
      'Implemented ROC AUC, Rand index, V-measure, and Kendall tau-b in NumPy, removing scikit-learn from the core dependencies while checking results against reference implementations.',
    proof: '130 affected/oracle tests · 1,947 portable tests passed',
    stats: '+269 −66 · 10 files',
    mergedAt: '2026-08-28',
    href: 'https://github.com/awslabs/stickler/pull/284',
  },
  {
    repo: '3b1b / manim',
    number: '#2501',
    title: 'Fix batched 2D vector rotation',
    category: 'Geometry',
    summary:
      'Added planar rotation for batches of 2D vectors, restoring the VectorField curl example while preserving the existing rotation behavior for 3D vectors.',
    proof: 'Four 2D/3D regressions · real VectorField reproduction',
    stats: '+53 −2 · 2 files',
    mergedAt: '2026-08-17',
    href: 'https://github.com/3b1b/manim/pull/2501',
  },
];

export const domainClusters = [
  {
    id: 'Agent security',
    label: 'Agent security & systems',
    prs: 47,
    repos: 3,
    highlight: 'sysknife · agent-sweep · atomic',
    accent: '#89d3d1',
  },
  {
    id: 'GPU & Mojo',
    label: 'GPU kernels & Mojo',
    prs: 16,
    repos: 1,
    highlight: 'dllm-labs/mojo-dllm (RTX Blackwell)',
    accent: '#e3cfa0',
  },
  {
    id: 'Query engines',
    label: 'Query & data engines',
    prs: 5,
    repos: 3,
    highlight: 'apache/datafusion · dataprof · Vex',
    accent: '#6bd4a5',
  },
  {
    id: 'Developer tools',
    label: 'Developer tooling & CLI',
    prs: 16,
    repos: 11,
    highlight: 'vscode-eslint · clinker · seiri · shot-scraper',
    accent: '#b89fd0',
  },
  {
    id: 'Scientific Python',
    label: 'Scientific & numerical',
    prs: 6,
    repos: 4,
    highlight: 'xarray · stickler · manim · numax',
    accent: '#4ea8ab',
  },
] as const;

export const recentMerges = [
  {
    repo: 'mojo-dllm',
    number: '#175',
    title: 'Calibrate DiffusionGemma parity on fixed reference inputs',
    date: '24 Nov',
    href: 'https://github.com/dllm-labs/mojo-dllm/pull/175',
  },
  {
    repo: 'sysknife',
    number: '#828',
    title: 'Pin the MCP publisher and scan all CI workflows',
    date: '20 Nov',
    href: 'https://github.com/lacs-project/sysknife/pull/828',
  },
  {
    repo: 'sysknife',
    number: '#786',
    title: 'Export both audit chains and verify them offline',
    date: '15 Nov',
    href: 'https://github.com/lacs-project/sysknife/pull/786',
  },
  {
    repo: 'datafusion',
    number: '#25988',
    title: 'Add opt-in native grouped integer DISTINCT counts',
    date: '08 Nov',
    href: 'https://github.com/apache/datafusion/pull/25988',
  },
] as const;

// Award levels, tracks, and years confirmed by Xi Qin on 2026-10-02.
// English event names are descriptive translations; background sources are linked.
export const recognition = [
  {
    id: 'openvela-band',
    eventEn: 'CCF Open Source Innovation Competition',
    eventZh: 'CCF 开源创新大赛',
    trackEn: 'openvela Smart Band Track',
    trackZh: 'openvela 智能手环赛道',
    awardEn: 'First Prize',
    awardZh: '一等奖',
    year: '2026',
    descriptionEn:
      'Wearable application development on openvela, covering embedded systems, interaction design, and integration. Organized by the China Computer Federation (CCF); the 2026 competition received 586 valid entries and awarded 34 first prizes across all tracks.',
    descriptionZh:
      '基于 openvela 开发智能手环应用，涵盖嵌入式开发、交互设计与系统集成。中国计算机学会（CCF）主办；2026 年全赛共收到 586 份有效作品，评出 34 项一等奖（所有赛道合计）。',
    source: 'https://www.gitlink.org.cn/zone/CCF-ODC/newdetail/1709',
  },
  {
    id: 'openvela-home',
    eventEn: 'CCF Open Source Innovation Competition',
    eventZh: 'CCF 开源创新大赛',
    trackEn: 'openvela Smart Home Track',
    trackZh: 'openvela 智能家居赛道',
    awardEn: 'Third Prize',
    awardZh: '三等奖',
    year: '2026',
    descriptionEn:
      'Develop smart-home AI agents that connect natural-language requests with device tools and control workflows. This CCF competition track tests integration across language models, embedded software, and open-source systems.',
    descriptionZh:
      '围绕 openvela 构建智能家居 AI Agent，将自然语言请求接入设备工具与控制流程。作为 CCF 开源竞赛赛道，重点考察大模型、嵌入式软件与开源系统的综合实现能力。',
    source: 'https://www.gitlink.org.cn/zone/CCF-ODC/newdetail/1709',
  },
  {
    id: 'origin-quantum',
    eventEn: 'CCF Quantum Computing Programming Challenge',
    eventZh: 'CCF 量子计算编程挑战赛',
    trackEn: 'Origin Quantum Cup',
    trackZh: '本源杯',
    awardEn: 'First Prize',
    awardZh: '一等奖',
    year: '2026',
    descriptionEn:
      'A CCF-organized quantum programming challenge using Origin Quantum’s QPanda3 and VQNet tools. Tasks span circuit design and algorithm implementation, testing the ability to turn quantum theory into working code.',
    descriptionZh:
      '由 CCF 主办的量子计算编程赛事，使用本源量子的 QPanda3、VQNet 等工具，涵盖量子线路设计与算法实现，考察将量子理论转化为可运行程序的专业能力。',
    source: 'https://qcloud.originqc.com.cn/learning/zh/2026ccf',
  },
  {
    id: 'electrical-modeling',
    eventEn:
      'National Undergraduate Electrical Mathematical Modeling Competition',
    eventZh: '全国大学生电工数学建模竞赛',
    trackEn: 'CSEE Cup · “Diangong Cup”',
    trackZh: '中国电机工程学会杯 · 电工杯',
    awardEn: 'Second Prize',
    awardZh: '二等奖',
    year: '2026',
    descriptionEn:
      'A national competition organized by the Chinese Society for Electrical Engineering. Teams of three have 72 hours to model an applied problem and submit a paper, testing mathematical reasoning, computation, and technical writing.',
    descriptionZh:
      '中国电机工程学会主办的全国性竞赛。三人组队，在 72 小时内完成实际问题的建模、求解与论文，综合考察数学分析、计算实现及技术表达能力。',
    source: 'https://shumo.neepu.edu.cn/jszz/jsgk.htm',
  },
];
