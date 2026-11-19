import { ContributionsSection } from './components/ContributionsSection';
import { FluidForgeCanvas } from './components/FluidForgeCanvas';
import { SimplexFieldArt } from './components/SimplexFieldArt';
import { SiteChrome } from './components/SiteChrome';
import {
  contributionStats,
  identityPaper,
  latestPaper,
  mergedSearch,
  projects,
  recognition,
  researchStats,
  researchUpdated,
  selectionPaper,
} from './portfolio';

function Arrow() {
  return (
    <span className="arrow-glyph" aria-hidden="true">
      ↗
    </span>
  );
}

function SectionHeading({
  number,
  label,
  title,
  id,
  children,
}: {
  number: string;
  label: string;
  title: string;
  id: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-index">{number}</span>
        <p>{label}</p>
      </div>
      <h2 id={id}>{title}</h2>
      {children}
    </div>
  );
}

function getAwardTier(awardEn: string): string {
  const normalized = awardEn.toLowerCase();
  if (normalized.includes('first')) return 'tier-gold';
  if (normalized.includes('second')) return 'tier-teal';
  return 'tier-amethyst';
}

export default function Home() {
  return (
    <main id="top" className="forge-main">
      <FluidForgeCanvas />
      <a className="skip-link" href="#research">
        Skip to research
      </a>
      <SiteChrome />

      <div className="page-shell">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              Research &amp; open-source engineering · Wuhan University
            </p>
            <h1 id="hero-title">
              From first
              <br />
              <em>principles</em>
              <br />
              to working code.
            </h1>
            <p className="hero-intro">
              I&apos;m Xi Qin, at Wuhan University. I work on learning theory,
              reproducible AI evaluation, and the software that puts ideas to
              work.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#research">
                <span>Explore the research</span>
                <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-ghost"
                href="https://github.com/QinXi-ai"
                target="_blank"
                rel="noreferrer"
              >
                <span>GitHub</span>
                <Arrow />
              </a>
              <a className="text-link hero-latest" href={latestPaper.href}>
                <span>
                  Latest paper · <strong>{latestPaper.venue}</strong>
                </span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <SimplexFieldArt />
        </section>

        <div className="overview" aria-label="Portfolio at a glance">
          <a href="#research" className="overview-tile mineral-card">
            <strong>{String(researchStats.papers).padStart(2, '0')}</strong>
            <span>
              Research papers
              <br />
              {researchStats.accepted} accepted · {researchStats.preprints}{' '}
              preprints
            </span>
          </a>
          <a
            href={mergedSearch}
            target="_blank"
            rel="noreferrer"
            className="overview-tile mineral-card"
          >
            <strong>{contributionStats.merged}</strong>
            <span>
              Public PRs merged <Arrow />
            </span>
          </a>
          <div className="overview-tile mineral-card">
            <strong>{contributionStats.repositories}</strong>
            <span>Repositories contributed to</span>
          </div>
          <a href="#recognition" className="overview-tile mineral-card">
            <strong>04</strong>
            <span>
              Competition awards <Arrow />
            </span>
          </a>
        </div>

        <section
          id="research"
          className="section"
          aria-labelledby="research-title"
        >
          <SectionHeading
            number="01"
            label="Selected research"
            title="Questions, made precise."
            id="research-title"
          >
            <p className="section-intro">
              Sharp mathematical answers and evaluations you can inspect.
            </p>
          </SectionHeading>

          <article
            id="failure-steps-are-not-repair-intents"
            className="paper-feature mineral-card"
          >
            <div className="paper-main">
              <div className="paper-meta">
                <span className="tag tag-accepted">{latestPaper.status}</span>
                <span>{latestPaper.venue}</span>
              </div>
              <h3>{latestPaper.title}</h3>
              <p className="paper-lead">
                Do different blamed execution steps imply different repairs?
              </p>
              <p>
                We study expert-recommended actions from MP-Bench through a
                prediction-blind, human-audited model-assisted analysis of{' '}
                <strong>96 multi-agent traces</strong> and{' '}
                <strong>1,436 actions</strong>.
              </p>
              <p>
                In the primary analysis, <strong>85.1% of traces</strong>{' '}
                contain fewer distinct repair intents than blamed steps, while
                top repair-set alignment reaches <strong>95.7%</strong>. The
                findings show how step-level evaluation can overstate actionable
                diversity while often preserving the first repair priority.
              </p>
              <div className="paper-byline">
                <strong>{latestPaper.author}</strong>
                <span>
                  {latestPaper.venue} · {latestPaper.status}
                </span>
              </div>
            </div>
            <aside
              className="theorem-panel"
              aria-label="Repair-intent study highlights"
            >
              <p className="eyebrow">Multi-agent system diagnosis</p>
              <h4>
                From steps
                <br />
                to repair intents.
              </h4>
              <p className="theorem-caption">Primary analysis · MP-Bench</p>
              <dl>
                <div>
                  <dt>Multi-agent traces</dt>
                  <dd>96</dd>
                </div>
                <div>
                  <dt>Expert-recommended actions</dt>
                  <dd>1,436</dd>
                </div>
                <div>
                  <dt>Traces with fewer repair intents</dt>
                  <dd>85.1%</dd>
                </div>
                <div>
                  <dt>Top repair-set alignment</dt>
                  <dd>95.7%</dd>
                </div>
              </dl>
              <p className="theorem-note">
                Prediction-blind, human-audited model-assisted analysis of
                expert-recommended repair intent.
              </p>
            </aside>
          </article>

          <article className="paper-secondary mineral-card">
            <div>
              <p className="eyebrow">
                Latest preprint · Distribution testing · 23 October 2026
              </p>
              <h3>
                <a href={identityPaper.href} target="_blank" rel="noreferrer">
                  {identityPaper.title}
                </a>
              </h3>
              <p>
                How many samples are needed to test whether an unknown
                distribution equals a specified reference—at the total-variation
                radius actually given? I give an explicit characterization, up
                to universal constants, for every finite or countable reference
                distribution at the original radius.
              </p>
              <p>
                The preprint resolves{' '}
                <strong>Canonne&apos;s COLT 2024 Open Question 1</strong> in the
                countable-alphabet model, with matching upper and lower bounds
                and a polynomial-time factor-two approximation for explicit
                rational input.
              </p>
            </div>
            <div className="secondary-links">
              <span>Xi Qin · Wuhan University</span>
              <a
                className="text-link"
                href={identityPaper.pdf}
                target="_blank"
                rel="noreferrer"
              >
                Read the paper <Arrow />
              </a>
              <a className="text-link" href={identityPaper.source}>
                LaTeX source <span aria-hidden="true">↓</span>
              </a>
              <a
                className="doi"
                href={`https://doi.org/${identityPaper.doi}`}
                target="_blank"
                rel="noreferrer"
              >
                DOI {identityPaper.doi} <Arrow />
              </a>
            </div>
          </article>

          <article className="paper-feature mineral-card">
            <div className="paper-main">
              <div className="paper-meta">
                <span className="tag">Preprint</span>
                <span>Learning theory · October 2026</span>
              </div>
              <h3>
                <a href={selectionPaper.href} target="_blank" rel="noreferrer">
                  {selectionPaper.title}
                </a>
              </h3>
              <p className="paper-lead">
                How much can you lose by keeping just three examples?
              </p>
              <p>
                For mean regression, this paper determines the exact worst-case
                risk inflation of selecting three support points, with
                repetition allowed, and predicting their equally weighted
                mean—in every dimension.
              </p>
              <p>
                It resolves the <i>n</i> = 3 column of the data-selection
                question posed at COLT 2025, and characterizes how the extremal
                geometry changes with dimension.
              </p>
              <div className="paper-byline">
                <span>Xi Qin · Wuhan University</span>
                <span>03 October 2026</span>
              </div>
              <div className="paper-links">
                <a
                  className="button button-primary"
                  href={selectionPaper.pdf}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Read the paper</span>
                  <Arrow />
                </a>
                <a className="text-link" href={selectionPaper.source}>
                  Source &amp; verification <span aria-hidden="true">↓</span>
                </a>
              </div>
              <a
                className="doi"
                href={`https://doi.org/${selectionPaper.doi}`}
                target="_blank"
                rel="noreferrer"
              >
                DOI {selectionPaper.doi} <Arrow />
              </a>
            </div>
            <aside
              className="theorem-panel"
              aria-label="Exact excess risk by dimension"
            >
              <p className="eyebrow">The sharp answer</p>
              <h4>F(d, 3) − 1</h4>
              <p className="theorem-caption">Worst-case excess risk ratio</p>
              <dl>
                <div>
                  <dt>d = 1, 2, 3</dt>
                  <dd>1 / 5</dd>
                </div>
                <div>
                  <dt>d = 4</dt>
                  <dd>(11 − √13) / 36</dd>
                </div>
                <div>
                  <dt>d = 5</dt>
                  <dd>(16 − 2√10) / 45</dd>
                </div>
                <div>
                  <dt>d ≥ 6</dt>
                  <dd>(d − 2) / (3d)</dd>
                </div>
              </dl>
              <p className="theorem-note">
                Exact constants in every dimension.
                <br />
                Manuscript, proofs, and verification scripts openly available.
              </p>
              <a href={selectionPaper.href} target="_blank" rel="noreferrer">
                View the Zenodo record <Arrow />
              </a>
            </aside>
          </article>

          <article className="paper-secondary mineral-card">
            <div>
              <p className="eyebrow">AI evaluation · arXiv:2608.19269 · v3</p>
              <h3>
                <a
                  href="https://arxiv.org/abs/2608.19269"
                  target="_blank"
                  rel="noreferrer"
                >
                  What Does an Evaluation License?
                </a>
              </h3>
              <p className="paper-subtitle">
                A Commit-Bound Census of Claim-Relative Inference in Inspect
                Evals
              </p>
              <p>
                A framework for connecting evaluation artifacts to the claims
                they support. The census records 124 eligible units: 14
                deterministic analyses and 110 typed stops that identify missing
                evidence.
              </p>
            </div>
            <div className="secondary-links">
              <span>Xi Qin · Wuhan University</span>
              <a
                className="text-link"
                href="https://arxiv.org/abs/2608.19269"
                target="_blank"
                rel="noreferrer"
              >
                Read on arXiv <Arrow />
              </a>
              <a
                className="text-link"
                href="https://github.com/QinXi-ai/evalspec-audit"
                target="_blank"
                rel="noreferrer"
              >
                Explore the code <Arrow />
              </a>
            </div>
          </article>

          <p className="data-note research-note">
            Research updated{' '}
            <time dateTime={researchUpdated}>4 November 2026</time>.
          </p>
        </section>

        <ContributionsSection />

        <section id="work" className="section" aria-labelledby="work-title">
          <SectionHeading
            number="03"
            label="Selected projects"
            title="Tools for the work ahead."
            id="work-title"
          >
            <p className="section-intro">
              Research software, developer tooling, and small devices with
              useful jobs.
            </p>
          </SectionHeading>
          <div className="project-list">
            {projects.map((item, index) => (
              <a
                className="project-row mineral-card"
                href={item.href}
                key={item.name}
                target="_blank"
                rel="noreferrer"
              >
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="project-copy">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="project-language">{item.language}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </section>

        <section
          id="recognition"
          className="section"
          aria-labelledby="recognition-title"
        >
          <SectionHeading
            number="04"
            label="Selected recognition"
            title="A few milestones."
            id="recognition-title"
          >
            <p className="section-intro">
              2026 · Competitions &amp; awards{' '}
              <span lang="zh-CN">/ 竞赛与获奖</span>
            </p>
          </SectionHeading>
          <div className="recognition-list">
            {recognition.map((item) => (
              <article
                className={`recognition-row mineral-card ${getAwardTier(item.awardEn)}`}
                key={item.id}
              >
                <div className="recognition-award">
                  <strong>{item.awardEn}</strong>
                  <span lang="zh-CN">{item.awardZh}</span>
                  <time>{item.year}</time>
                </div>
                <div className="recognition-copy">
                  <h3>{item.eventEn}</h3>
                  <p className="recognition-zh" lang="zh-CN">
                    {item.eventZh}
                  </p>
                  <p className="recognition-track">
                    {item.trackEn} <span lang="zh-CN">/ {item.trackZh}</span>
                  </p>
                  <details>
                    <summary>
                      About the competition <span lang="zh-CN">/ 赛事介绍</span>
                    </summary>
                    <p>{item.descriptionEn}</p>
                    <p lang="zh-CN">{item.descriptionZh}</p>
                    <a
                      className="text-link"
                      href={item.source}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Official competition details <Arrow />
                    </a>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer>
          <div className="footer-invitation mineral-card">
            <p className="eyebrow">Good work starts with a conversation.</p>
            <h2>
              Let&apos;s compare <em>notes.</em>
            </h2>
            <a
              className="button button-primary footer-cta"
              href="mailto:3624951962qx@gmail.com"
            >
              <span>3624951962qx@gmail.com</span>
              <Arrow />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Xi Qin</span>
            <span className="footer-motto">Nihil ultra testimonium.</span>
            <div>
              <a
                href="https://github.com/QinXi-ai"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <Arrow />
              </a>
              <a href={latestPaper.href}>
                Latest paper <Arrow />
              </a>
              <a href="#top">Back to top ↑</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
