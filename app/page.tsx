const projects = [
  {
    name: 'evalspec-audit',
    description:
      'Auditable evaluation specifications for claim-aware, reproducible LLM benchmarking.',
    language: 'Python',
    href: 'https://github.com/QinXi-ai/evalspec-audit',
  },
  {
    name: 'moonguard',
    description:
      'API and semantic-versioning safety tooling for MoonBit libraries.',
    language: 'MoonBit',
    href: 'https://github.com/QinXi-ai/moonguard',
  },
  {
    name: 'openvela-smarthome-agent',
    description:
      'An evidence-bounded agent demonstration for embedded smart-home workflows.',
    language: 'C++',
    href: 'https://github.com/QinXi-ai/openvela-smarthome-agent',
  },
];

const contributions = [
  {
    repo: 'darthjee / navi',
    number: '#716',
    title: 'Refactor CssSelectorParser',
    category: 'Architecture',
    summary:
      'Split a monolithic parser into focused HTML-root, value-resolution, field-mapping, and filter components while preserving both public parser surfaces.',
    proof: '1,494 specs · changed modules at 100% coverage',
    stats: '+630 −77 · 16 files',
    href: 'https://github.com/darthjee/navi/pull/716',
  },
  {
    repo: 'awslabs / stickler',
    number: '#284',
    title: 'Replace sklearn metrics with NumPy',
    category: 'Numerical methods',
    summary:
      'Implemented ROC AUC, Rand index, V-measure, and Kendall tau-b in NumPy, removing scikit-learn from the core dependency surface.',
    proof: '1,947 portable tests passed · 130 affected/oracle tests',
    stats: '+269 −66 · 10 files',
    href: 'https://github.com/awslabs/stickler/pull/284',
  },
  {
    repo: 'holaboss-ai / holaOS',
    number: '#470',
    title: 'Support attachments in the project composer',
    category: 'Product systems',
    summary:
      'Added ordered local and Explorer attachments, previews, limits, attachment-only submits, and retry behavior that avoids orphaned sessions.',
    proof: 'Focused tests passed · TypeScript transpilation clean',
    stats: '+725 −22 · 5 files',
    href: 'https://github.com/holaboss-ai/holaOS/pull/470',
  },
  {
    repo: '3b1b / manim',
    number: '#2501',
    title: 'Fix batched 2D vector rotation',
    category: 'Geometry',
    summary:
      'Added a planar rotation path for (N, 2) arrays while retaining the existing axis-angle behavior for individual and batched 3D vectors.',
    proof: 'Four focused 2D/3D regression cases',
    stats: '+53 −2 · 2 files',
    href: 'https://github.com/3b1b/manim/pull/2501',
  },
  {
    repo: 'lacs-project / sysknife',
    number: '#256',
    title: 'Neutralise preference envelope tags',
    category: 'Prompt security',
    summary:
      'Closed a saved-preference prompt-envelope boundary by neutralising both opening and closing tags in new, legacy, and manually edited files.',
    proof: '56 exact-module tests passed',
    stats: '+212 −31 · 6 files',
    href: 'https://github.com/lacs-project/sysknife/pull/256',
  },
  {
    repo: 'tarolling / seiri',
    number: '#173',
    title: 'Contain import resolution inside project roots',
    category: 'Path security',
    summary:
      'Required canonical import targets to remain inside the project root across C++, Python, and TypeScript, with graph-level rejection as a second boundary.',
    proof: '109-test suite · Clippy clean',
    stats: '+95 −18 · 4 files',
    href: 'https://github.com/tarolling/seiri/pull/173',
  },
];

const recognition = [
  ['CCF 开源大赛', '一等奖'],
  ['CCF 开源大赛', '三等奖'],
  ['电工杯', '二等奖'],
  ['本源杯', '一等奖'],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Xi Qin, back to top">
          XQ
        </a>
        <nav aria-label="Primary navigation">
          <a href="#research">Paper</a>
          <a href="#contributions">Contributions</a>
          <a href="#work">Work</a>
          <a href="#recognition">Recognition</a>
        </nav>
        <a className="header-contact" href="mailto:3624951962qx@gmail.com">
          Contact <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div id="top" className="page-shell">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <span>Xi Qin</span>
            <span aria-hidden="true">/</span>
            <span>Research engineer</span>
          </div>
          <h1 id="hero-title">
            Research should survive
            <br />
            contact with <em>evidence.</em>
          </h1>
          <div className="hero-bottom">
            <p className="hero-intro">
              I build research systems that turn ambitious AI claims into
              reproducible, inspectable evidence.
            </p>
            <blockquote>
              <span>Nullius in verba.</span>
              <cite>Take nobody&apos;s word for it.</cite>
            </blockquote>
          </div>
        </section>

        <section id="research" className="section featured-paper" aria-labelledby="research-title">
          <div className="section-index">01</div>
          <div className="section-heading">
            <p>Featured research</p>
            <h2 id="research-title">Claim-relative inference</h2>
          </div>
          <div className="research-stack">
            <article className="paper-card">
              <div className="paper-meta">
                <span>arXiv:2608.19269</span>
                <span>2026 · v3</span>
              </div>
              <h3>
                What Does an Evaluation License? A Commit-Bound Census of
                Claim-Relative Inference in Inspect Evals
              </h3>
              <p>
                Evaluation artifacts produce scores. They do not automatically
                bind the historical evidence or alternative semantics needed to
                replay the claim attached to that score.
              </p>
              <div className="paper-footer">
                <span>Xi Qin · Wuhan University</span>
                <a href="https://arxiv.org/abs/2608.19269" target="_blank" rel="noreferrer">
                  Read on arXiv <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>

            <div className="paper-object" aria-label="Claim-replay object">
              <div>
                <span>D</span>
                <strong>Frozen substrate</strong>
                <p>Versioned inputs, observations, traces, state, and support.</p>
              </div>
              <div>
                <span>F</span>
                <strong>Grounded family</strong>
                <p>Primary admissible readings and a separate review envelope.</p>
              </div>
              <div>
                <span>q</span>
                <strong>Claim query</strong>
                <p>Exact score, winner, complete order, or pairwise relation.</p>
              </div>
            </div>

            <div className="census-strip" aria-label="Commit-bound census results">
              <div>
                <strong>124</strong>
                <span>mechanically eligible units</span>
              </div>
              <div>
                <strong>14</strong>
                <span>deterministic analyses completed</span>
              </div>
              <div>
                <strong>110</strong>
                <span>typed stops before inference</span>
              </div>
            </div>

            <div className="paper-findings">
              <div className="paper-findings-title">
                <span>What the paper adds</span>
                <p>Not another benchmark score—a contract for what may be inferred.</p>
              </div>
              <ol>
                <li>
                  <span>01</span>
                  <p>
                    Every unit receives a terminal record. A STOP is not a zero
                    score; it identifies the first missing object and the minimum
                    artifact needed to unblock replay.
                  </p>
                </li>
                <li>
                  <span>02</span>
                  <p>
                    Primary and review families remain separate. A winner can stay
                    identified even when the complete order does not.
                  </p>
                </li>
                <li>
                  <span>03</span>
                  <p>
                    A fresh run cannot reconstruct a historical evaluation event.
                    Replay requires bound observations, mediator decisions, state,
                    support joins, and semantic admission.
                  </p>
                </li>
              </ol>
            </div>

            <div className="gate-chain" aria-label="Eight claim-replay gates">
              <span>Source binding</span>
              <span>Claim selection</span>
              <span>Endpoint typing</span>
              <span>Observation binding</span>
              <span>Execution</span>
              <span>Family admission</span>
              <span>Enumeration</span>
              <span>Verification</span>
            </div>

            <blockquote className="paper-boundary">
              “The result is a reviewable claim-replay contract rather than a
              forced evaluator meaning or a single flip label.”
              <cite>Conclusion · arXiv v3</cite>
            </blockquote>
          </div>
        </section>

        <div className="motto-band" aria-label="Latin motto">
          <span>Ad fontes</span>
          <span className="motto-rule" aria-hidden="true" />
          <span>Back to the sources</span>
        </div>

        <section
          id="contributions"
          className="section contributions"
          aria-labelledby="contributions-title"
        >
          <div className="section-index">02</div>
          <div className="section-heading">
            <p>Open-source contributions</p>
            <h2 id="contributions-title">Changes that landed</h2>
          </div>
          <div className="contribution-list">
            {contributions.map((contribution, index) => (
              <article className="contribution-card" key={contribution.href}>
                <div className="contribution-meta">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{contribution.category}</span>
                  <span className="merged-mark">Merged</span>
                </div>
                <p className="contribution-repo">
                  {contribution.repo} <span>{contribution.number}</span>
                </p>
                <h3>{contribution.title}</h3>
                <p className="contribution-summary">{contribution.summary}</p>
                <div className="contribution-proof">
                  <span>{contribution.proof}</span>
                  <span>{contribution.stats}</span>
                </div>
                <a href={contribution.href} target="_blank" rel="noreferrer">
                  Inspect the pull request <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <div className="motto-band" aria-label="Latin motto">
          <span>Res ipsa loquitur</span>
          <span className="motto-rule" aria-hidden="true" />
          <span>The work speaks for itself</span>
        </div>

        <section id="work" className="section selected-work" aria-labelledby="work-title">
          <div className="section-index">03</div>
          <div className="section-heading">
            <p>Selected work</p>
            <h2 id="work-title">Tools with boundaries</h2>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <a
                className="project-row"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.name}
              >
                <span className="project-number">0{index + 1}</span>
                <span className="project-copy">
                  <strong>{project.name}</strong>
                  <span>{project.description}</span>
                </span>
                <span className="project-language">{project.language}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section
          id="recognition"
          className="section recognition"
          aria-labelledby="recognition-title"
        >
          <div className="section-index">04</div>
          <div className="section-heading">
            <p>Selected recognition</p>
            <h2 id="recognition-title">Small marks, serious work</h2>
          </div>
          <div className="recognition-list">
            {recognition.map(([event, award], index) => (
              <div className="recognition-row" key={`${event}-${award}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{event}</strong>
                <span>{award}</span>
                <time dateTime="2026">2026</time>
              </div>
            ))}
          </div>
        </section>

        <div className="closing-motto">
          <p>Festina lente.</p>
          <span>Make haste slowly.</span>
        </div>

        <footer>
          <div>
            <p>Let&apos;s compare notes.</p>
            <a href="mailto:3624951962qx@gmail.com">3624951962qx@gmail.com</a>
          </div>
          <div className="footer-links">
            <a href="https://github.com/QinXi-ai" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href="https://arxiv.org/abs/2608.19269" target="_blank" rel="noreferrer">
              arXiv ↗
            </a>
            <a href="mailto:3624951962qx@gmail.com">Email ↗</a>
          </div>
          <p className="copyright">Xi Qin · 2026</p>
        </footer>
      </div>
    </main>
  );
}
