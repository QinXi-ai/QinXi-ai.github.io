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
          <a href="#research">Research</a>
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
              A census of 124 mechanically eligible evaluation units asks a
              stricter question than whether code runs: what conclusions does
              the bound evidence actually license? The result is a typed map of
              deterministic inference, principled stops, instability, and
              stable substructure.
            </p>
            <div className="paper-footer">
              <span>Xi Qin</span>
              <a href="https://arxiv.org/abs/2608.19269" target="_blank" rel="noreferrer">
                Read on arXiv <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </section>

        <div className="motto-band" aria-label="Latin motto">
          <span>Ad fontes</span>
          <span className="motto-rule" aria-hidden="true" />
          <span>Back to the sources</span>
        </div>

        <section id="work" className="section selected-work" aria-labelledby="work-title">
          <div className="section-index">02</div>
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
          <div className="section-index">03</div>
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
            <a href="mailto:3624951962qx@gmail.com">
              Email ↗
            </a>
          </div>
          <p className="copyright">Xi Qin · 2026</p>
        </footer>
      </div>
    </main>
  );
}
