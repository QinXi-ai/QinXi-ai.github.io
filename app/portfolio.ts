// Public contribution snapshot checked against GitHub on 2026-10-20.
export const portfolioUpdated = '2026-10-20';
export const contributionStats = { merged: 67, repositories: 27, recent: 14 };
export const mergedSearch =
  'https://github.com/search?q=is%3Apr+author%3AQinXi-ai+is%3Amerged+is%3Apublic+-user%3AQinXi-ai&type=pullrequests';
export const latestPaper = {
  title: 'Exact Three-Example Selection in Every Dimension',
  date: '2026-10-03',
  doi: '10.5281/zenodo.23119254',
  href: 'https://zenodo.org/records/23119254',
  pdf: 'https://zenodo.org/records/23119254/files/exact-three-example-selection.pdf',
  source: 'https://zenodo.org/records/23119254/files/exact-three-example-selection-source-v1.0.zip',
};

export const projects = [
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
