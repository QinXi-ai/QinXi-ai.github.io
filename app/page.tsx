import {
  contributions,
  portfolioUpdated,
  projects,
  recognition,
} from './portfolio';

const principles = [
  {
    latin: 'Lex me quoque ligat.',
    english: 'The law binds me too.',
  },
  {
    latin: 'In dubio, siste.',
    english: 'When in doubt, stop.',
  },
  {
    latin: 'Nihil ultra testimonium.',
    english: 'Nothing beyond the evidence.',
  },
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

        <section
          id="research"
          className="section featured-paper"
          aria-labelledby="research-title"
        >
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
                <a
                  href="https://arxiv.org/abs/2608.19269"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read on arXiv <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>

            <div className="paper-object" aria-label="Claim-replay object">
              <div>
                <span>D</span>
                <strong>Frozen substrate</strong>
                <p>
                  Versioned inputs, observations, traces, state, and support.
                </p>
              </div>
              <div>
                <span>F</span>
                <strong>Grounded family</strong>
                <p>
                  Primary admissible readings and a separate review envelope.
                </p>
              </div>
              <div>
                <span>q</span>
                <strong>Claim query</strong>
                <p>
                  Exact score, winner, complete order, or pairwise relation.
                </p>
              </div>
            </div>

            <div
              className="census-strip"
              aria-label="Commit-bound census results"
            >
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
                <p>
                  Not another benchmark score—a contract for what may be
                  inferred.
                </p>
              </div>
              <ol>
                <li>
                  <span>01</span>
                  <p>
                    Every unit receives a terminal record. A STOP is not a zero
                    score; it identifies the first missing object and the
                    minimum artifact needed to unblock replay.
                  </p>
                </li>
                <li>
                  <span>02</span>
                  <p>
                    Primary and review families remain separate. A winner can
                    stay identified even when the complete order does not.
                  </p>
                </li>
                <li>
                  <span>03</span>
                  <p>
                    A fresh run cannot reconstruct a historical evaluation
                    event. Replay requires bound observations, mediator
                    decisions, state, support joins, and semantic admission.
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
          <div className="contribution-content">
            <p className="section-note">
              Selected contributions merged upstream. Updated{' '}
              <time dateTime={portfolioUpdated}>2 October 2026</time>.
            </p>
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
                    <time dateTime={contribution.mergedAt}>
                      Merged {contribution.mergedAt}
                    </time>
                  </div>
                  <a href={contribution.href} target="_blank" rel="noreferrer">
                    Inspect the pull request <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
            <a
              className="section-more"
              href="https://github.com/search?q=is%3Apr+author%3AQinXi-ai+is%3Amerged+is%3Apublic&type=pullrequests"
              target="_blank"
              rel="noreferrer"
            >
              All merged pull requests <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <div className="motto-band" aria-label="Latin motto">
          <span>Res ipsa loquitur</span>
          <span className="motto-rule" aria-hidden="true" />
          <span>The work speaks for itself</span>
        </div>

        <section
          id="work"
          className="section selected-work"
          aria-labelledby="work-title"
        >
          <div className="section-index">03</div>
          <div className="section-heading">
            <p>Selected work</p>
            <h2 id="work-title">Research tools &amp; systems</h2>
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
            <h2 id="recognition-title">Competitions &amp; awards</h2>
          </div>
          <div className="recognition-list">
            {recognition.map((item, index) => (
              <article className="recognition-row" key={item.id}>
                <span className="recognition-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="recognition-heading">
                  <h3>{item.eventEn}</h3>
                  <p className="recognition-event-zh" lang="zh-CN">
                    {item.eventZh}
                  </p>
                  <p className="recognition-track">{item.trackEn}</p>
                  <p className="recognition-track-zh" lang="zh-CN">
                    {item.trackZh}
                  </p>
                </div>
                <div className="recognition-award">
                  <time dateTime={item.year}>{item.year}</time>
                  <strong>{item.awardEn}</strong>
                  <span lang="zh-CN">{item.awardZh}</span>
                </div>
                <div className="recognition-description">
                  <p>{item.descriptionEn}</p>
                  <p lang="zh-CN">{item.descriptionZh}</p>
                  <a href={item.source} target="_blank" rel="noreferrer">
                    Competition details <span lang="zh-CN">/ 赛事介绍</span>{' '}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="principles" aria-labelledby="principles-title">
          <div className="principles-heading">
            <p>Three operating principles</p>
            <h2 id="principles-title">Bound by the record</h2>
          </div>
          <div className="principles-list">
            {principles.map((principle, index) => (
              <blockquote key={principle.latin}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p lang="la">{principle.latin}</p>
                <cite>{principle.english}</cite>
              </blockquote>
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
            <a
              href="https://github.com/QinXi-ai"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://arxiv.org/abs/2608.19269"
              target="_blank"
              rel="noreferrer"
            >
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
