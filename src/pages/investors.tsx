const canonicalUrl = 'https://together.hyperdrift.io/investors';

const marketEvidence = [
  {
    value: '1.5M',
    label: 'searches for dating and singles events',
    context: 'Eventbrite US platform data, May 2023–April 2024',
    href: 'https://www.eventbrite.com/blog/press/newsroom/report-singles-online-to-offline-dating-shared-experiences/',
  },
  {
    value: '69%',
    label: 'of Millennials prefer in-person dating',
    context: 'because it feels more genuine, Eventbrite survey',
    href: 'https://www.eventbrite.com/blog/press/newsroom/report-singles-online-to-offline-dating-shared-experiences/',
  },
  {
    value: '14.2M',
    label: 'Match Group payers in 2025',
    context: 'down 5% year on year; $3.5B revenue remained flat',
    href: 'https://ir.matchgroup.com/investor-relations/news-events/news-events/news-details/2026/Match-Group-Announces-Fourth-Quarter-and-Full-Year-Results/',
  },
] as const;

const scenarios = [
  {
    name: 'Seed places',
    output: '72',
    className: 'seed',
    assumptions: [
      '6 participating places',
      '2 active windows per week',
      '20 present participants',
      '15% mutual-signal rate',
    ],
  },
  {
    name: 'City cluster',
    output: '1,080',
    className: 'city',
    assumptions: [
      '30 participating places',
      '3 active windows per week',
      '30 present participants',
      '20% mutual-signal rate',
    ],
  },
  {
    name: 'Network scale',
    output: '4,200',
    className: 'network',
    assumptions: [
      '100 participating places',
      '3 active windows per week',
      '35 present participants',
      '20% mutual-signal rate',
    ],
  },
] as const;

const risks = [
  {
    risk: 'Two-sided activation',
    evidence: 'Confirmed interest by source and place',
    response: 'Concentrate one dense London cluster before expansion',
  },
  {
    risk: 'Mutual signal quality',
    evidence: 'Signal-to-hello and would-repeat rates',
    response: 'Manual pilot before product automation',
  },
  {
    risk: 'Safety and conduct',
    evidence: 'Participant comfort, reports and removals',
    response: 'Mutual choice, public places and explicit operating rules',
  },
  {
    risk: 'Venue dependency',
    evidence: 'Reliable active windows and partner retention',
    response: 'Prove value without requiring venue exclusivity',
  },
  {
    risk: 'Unit economics',
    evidence: 'Cost per attended meeting and repeat demand',
    response: 'Test an outcome-aligned paid pilot',
  },
] as const;

function InvestorSquare() {
  return (
    <figure className="investor-square">
      <img
        src="/images/together-investor-public-square.png"
        alt="An illuminated public square at the centre of a dense network of places."
      />
      <figcaption>
        The wedge is not “dating, but nearby.” It is mutual recognition among
        people already sharing a place.
      </figcaption>
    </figure>
  );
}

function MarketLandscape() {
  return (
    <figure className="market-landscape">
      <svg
        viewBox="0 0 760 620"
        role="img"
        aria-labelledby="landscape-title landscape-description"
      >
        <title id="landscape-title">Seven adjacent market categories</title>
        <desc id="landscape-description">
          Together sits at the centre of seven categories identified by the
          internal April 2026 competitive review.
        </desc>
        <circle className="landscape-orbit" cx="380" cy="310" r="210" />
        <line x1="380" y1="310" x2="380" y2="86" />
        <line x1="380" y1="310" x2="556" y2="164" />
        <line x1="380" y1="310" x2="608" y2="340" />
        <line x1="380" y1="310" x2="516" y2="500" />
        <line x1="380" y1="310" x2="244" y2="500" />
        <line x1="380" y1="310" x2="152" y2="340" />
        <line x1="380" y1="310" x2="204" y2="164" />
        <circle className="landscape-centre" cx="380" cy="310" r="72" />
        <text className="landscape-brand" x="380" y="318">
          Together
        </text>
        <g className="landscape-node">
          <circle cx="380" cy="86" r="53" />
          <text x="380" y="80">Mainstream</text>
          <text x="380" y="100">dating</text>
        </g>
        <g className="landscape-node">
          <circle cx="556" cy="164" r="53" />
          <text x="556" y="158">IRL and</text>
          <text x="556" y="178">events</text>
        </g>
        <g className="landscape-node">
          <circle cx="608" cy="340" r="53" />
          <text x="608" y="334">Activity</text>
          <text x="608" y="354">social</text>
        </g>
        <g className="landscape-node">
          <circle cx="516" cy="500" r="53" />
          <text x="516" y="494">Premium</text>
          <text x="516" y="514">matching</text>
        </g>
        <g className="landscape-node">
          <circle cx="244" cy="500" r="53" />
          <text x="244" y="494">Inclusive</text>
          <text x="244" y="514">dating</text>
        </g>
        <g className="landscape-node">
          <circle cx="152" cy="340" r="53" />
          <text x="152" y="334">AI-native</text>
          <text x="152" y="354">concepts</text>
        </g>
        <g className="landscape-node">
          <circle cx="204" cy="164" r="53" />
          <text x="204" y="158">Regional</text>
          <text x="204" y="178">incumbents</text>
        </g>
      </svg>
      <figcaption>
        Internal research catalogued 60+ products across these categories. That
        is a directional landscape—not a market-size claim.
      </figcaption>
    </figure>
  );
}

function PositioningMap() {
  return (
    <figure className="positioning-map">
      <svg
        viewBox="0 0 760 520"
        role="img"
        aria-labelledby="position-title position-description"
      >
        <title id="position-title">Competitive positioning map</title>
        <desc id="position-description">
          Together is positioned closest to same-place and attended-meeting
          outcomes, compared with remote discovery and attention-based products.
        </desc>
        <line className="axis" x1="92" y1="416" x2="694" y2="416" />
        <line className="axis" x1="92" y1="416" x2="92" y2="62" />
        <text className="axis-label" x="92" y="458">
          Remote discovery
        </text>
        <text className="axis-label end" x="694" y="458">
          Same place
        </text>
        <text className="axis-label vertical" x="22" y="76">
          Attended meeting
        </text>
        <text className="axis-label vertical" x="22" y="404">
          Attention
        </text>
        <g className="position-point mainstream">
          <circle cx="180" cy="332" r="10" />
          <text x="198" y="338">
            Tinder / Hinge
          </text>
        </g>
        <g className="position-point happn">
          <circle cx="350" cy="344" r="10" />
          <text x="368" y="350">
            Happn
          </text>
        </g>
        <g className="position-point events">
          <circle cx="566" cy="202" r="10" />
          <text x="584" y="208">
            Singles events
          </text>
        </g>
        <g className="position-point timeleft">
          <circle cx="470" cy="144" r="10" />
          <text x="488" y="150">
            Timeleft
          </text>
        </g>
        <g className="position-point together">
          <circle cx="634" cy="96" r="17" />
          <text x="608" y="72">
            Together
          </text>
        </g>
      </svg>
      <figcaption>
        Positioning is based on the primary outcome each product currently
        markets, not a claim that adjacent products cannot evolve.
      </figcaption>
    </figure>
  );
}

function DensityFlywheel() {
  return (
    <figure className="density-flywheel">
      <ol aria-label="Local density flywheel">
        <li>
          <strong>Places</strong>
          <span>concentrate presence</span>
        </li>
        <li>
          <strong>Signals</strong>
          <span>create mutual recognition</span>
        </li>
        <li>
          <strong>Meetings</strong>
          <span>produce real outcomes</span>
        </li>
        <li>
          <strong>Trust</strong>
          <span>earns repeat participation</span>
        </li>
        <li>
          <strong>More places</strong>
          <span>extend proven density</span>
        </li>
      </ol>
      <figcaption>
        The defensible asset is not an algorithm in isolation. It is trusted
        local density plus learning from real meetings.
      </figcaption>
    </figure>
  );
}

export default function InvestorsPage() {
  return (
    <>
      <title>Private Investment Memo — Together</title>
      <meta
        name="description"
        content="Private investment thesis, market evidence and validation model for Together."
      />
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
      <meta name="referrer" content="no-referrer" />
      <link rel="canonical" href={canonicalUrl} />

      <main className="investor-page" id="top">
        <header className="investor-header">
          <a className="investor-wordmark" href="#top" aria-label="Together memo top">
            Together.
          </a>
          <p>Private investment memo · Confidential</p>
        </header>

        <section className="investor-hero" aria-labelledby="investor-title">
          <div>
            <p className="memo-label">Investment thesis · July 2026</p>
            <h1 id="investor-title">
              The next dating network begins
              <em>in the room.</em>
            </h1>
            <p>
              Together is testing whether mutual recognition among people
              already sharing a public place can move dating closer to the
              outcome people actually want: a real meeting.
            </p>
          </div>
          <InvestorSquare />
        </section>

        <section className="memo-section evidence-section" aria-labelledby="why-now">
          <header>
            <p className="memo-label">Why now</p>
            <h2 id="why-now">Demand is moving toward real life.</h2>
            <p>
              The evidence does not prove Together. It does show appetite for
              in-person connection while major dating platforms face payer
              pressure.
            </p>
          </header>
          <dl className="evidence-strip">
            {marketEvidence.map((item) => (
              <div key={item.value}>
                <dt>{item.value}</dt>
                <dd>
                  <strong>{item.label}</strong>
                  <span>{item.context}</span>
                  <a href={item.href}>Primary source</a>
                </dd>
              </div>
            ))}
          </dl>
          <aside className="evidence-context">
            <strong>Context, not TAM:</strong> the Office for National Statistics
            estimates 18.57 million people aged 16+ in England and Wales had
            never married or entered a civil partnership in 2024.{' '}
            <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/bulletins/populationestimatesbymaritalstatusandlivingarrangements/2024">
              2024 estimate
            </a>
            . Separately, Census 2021 found England’s highest proportions in
            London.{' '}
            <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/marriagecohabitationandcivilpartnerships/articles/marriageandcivilpartnershipstatusenglandandwalescensus2021/2023-02-22">
              London context
            </a>
            . Neither legal status nor geography is the same as active dating
            demand.
          </aside>
        </section>

        <section className="memo-section market-section" aria-labelledby="market-title">
          <header>
            <p className="memo-label">The market</p>
            <h2 id="market-title">Crowded categories. An unproven wedge.</h2>
            <p>
              IRL dating, events and proximity products validate adjacent
              behaviour. Together’s specific wager is that same-place mutual
              recognition can become a repeatable network.
            </p>
          </header>
          <div className="market-visuals">
            <MarketLandscape />
            <PositioningMap />
          </div>
        </section>

        <section className="memo-section wedge-section" aria-labelledby="wedge-title">
          <header>
            <p className="memo-label">The wedge</p>
            <h2 id="wedge-title">Proximity is the product constraint.</h2>
          </header>
          <div className="wedge-copy">
            <p>
              Conventional dating products start with profiles and hope a
              conversation eventually becomes a meeting. Together starts with
              shared physical presence, requires mutual choice and makes a
              face-to-face hello possible in the moment.
            </p>
            <dl>
              <div>
                <dt>Input</dt>
                <dd>People already sharing a public place</dd>
              </div>
              <div>
                <dt>Mechanism</dt>
                <dd>A private signal that only matters when mutual</dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd>A comfortable, mutually chosen real-world introduction</dd>
              </div>
            </dl>
          </div>
          <DensityFlywheel />
        </section>

        <section className="memo-section scenario-section" aria-labelledby="scenario-title">
          <header>
            <p className="memo-label">Illustrative operating scenario · Not a forecast</p>
            <h2 id="scenario-title">Density turns places into opportunity.</h2>
            <p>
              These scenarios expose the operating assumptions. They project
              possible mutual introductions—not attended meetings, revenue or
              current traction.
            </p>
          </header>
          <figure className="scenario-chart">
            <div className="scenario-bars" aria-hidden="true">
              {scenarios.map((scenario) => (
                <div className={scenario.className} key={scenario.name}>
                  <span />
                </div>
              ))}
            </div>
            <div className="scenario-details">
              {scenarios.map((scenario) => (
                <article key={scenario.name}>
                  <p>{scenario.name}</p>
                  <strong>{scenario.output}</strong>
                  <span>potential mutual introductions per month</span>
                  <ul>
                    {scenario.assumptions.map((assumption) => (
                      <li key={assumption}>{assumption}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <figcaption>
              Formula: places × active windows per week × people present ×
              mutual-signal rate ÷ two participants × four weeks. Signal-to-hello
              and attendance conversion remain pilot variables.
            </figcaption>
          </figure>
        </section>

        <section className="memo-section validation-section" aria-labelledby="validation-title">
          <header>
            <p className="memo-label">Evidence before product</p>
            <h2 id="validation-title">The first capital question is demand.</h2>
          </header>
          <ol className="validation-funnel">
            <li>
              <strong>500</strong>
              <span>qualified London visits across three sources</span>
            </li>
            <li>
              <strong>≥100</strong>
              <span>confirmed registrations, with ≥15% conversion</span>
            </li>
            <li>
              <strong>Pilot</strong>
              <span>manual same-place introductions before automation</span>
            </li>
            <li>
              <strong>Build</strong>
              <span>only after attendance and repeat behaviour are credible</span>
            </li>
          </ol>
          <div className="validation-note">
            <p>
              <strong>Current stage:</strong> the demand-test landing page and
              confirmed-email flow are live. The product is not built and this
              memo claims no meeting traction.
            </p>
            <p>
              <strong>North-star evidence:</strong> mutual signal → face-to-face
              hello → would repeat.
            </p>
          </div>
        </section>

        <section className="memo-section economics-section" aria-labelledby="economics-title">
          <header>
            <p className="memo-label">Business model</p>
            <h2 id="economics-title">Align revenue with the meeting.</h2>
            <p>
              A recurring fee for browsing would recreate the incentive Together
              is challenging. The commercial hypothesis is an attended-meeting
              fee or outcome-backed service period.
            </p>
          </header>
          <dl className="economics-ledger">
            <div>
              <dt>Price per attended meeting</dt>
              <dd>To validate</dd>
            </div>
            <div>
              <dt>Participant acquisition cost</dt>
              <dd>To validate</dd>
            </div>
            <div>
              <dt>Venue or community cost</dt>
              <dd>To validate</dd>
            </div>
            <div>
              <dt>Contribution margin</dt>
              <dd>To validate</dd>
            </div>
            <div>
              <dt>Repeat and payback period</dt>
              <dd>To validate</dd>
            </div>
          </dl>
        </section>

        <section className="memo-section risk-section" aria-labelledby="risk-title">
          <header>
            <p className="memo-label">Risk and evidence ledger</p>
            <h2 id="risk-title">What must become true.</h2>
          </header>
          <div className="risk-table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Risk</th>
                  <th scope="col">Evidence required</th>
                  <th scope="col">Current response</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((item) => (
                  <tr key={item.risk}>
                    <th scope="row">{item.risk}</th>
                    <td>{item.evidence}</td>
                    <td>{item.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="memo-section sources-section" aria-labelledby="sources-title">
          <header>
            <p className="memo-label">Source library</p>
            <h2 id="sources-title">Research used, not repeated uncritically.</h2>
          </header>
          <div className="source-columns">
            <div>
              <h3>Internal research inputs</h3>
              <ul>
                <li>
                  <strong>Together Competitive Landscape</strong>
                  <span>April 2026 · directional category and competitor map</span>
                </li>
                <li>
                  <strong>Claude initial plan</strong>
                  <span>manual-first validation and meeting-outcome thinking</span>
                </li>
                <li>
                  <strong>Together Pilot Forms</strong>
                  <span>candidate measures, rewritten around data minimisation</span>
                </li>
              </ul>
            </div>
            <div>
              <h3>Primary external evidence</h3>
              <ul>
                <li>
                  <a href={marketEvidence[0].href}>Eventbrite singles report</a>
                  <span>platform searches and in-person preference</span>
                </li>
                <li>
                  <a href={marketEvidence[2].href}>Match Group FY2025 results</a>
                  <span>revenue, payers and year-on-year movement</span>
                </li>
                <li>
                  <a href="https://ir.bumble.com/financials/quarterly-results/">
                    Bumble FY2025 results
                  </a>
                  <span>revenue and paying-user pressure</span>
                </li>
                <li>
                  <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/bulletins/populationestimatesbymaritalstatusandlivingarrangements/2024">
                    ONS marital-status estimates
                  </a>
                  <span>population context, explicitly not TAM</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="investor-close" aria-labelledby="conversation-title">
          <p className="memo-label">The present ask</p>
          <h2 id="conversation-title">Help prove the room before funding the network.</h2>
          <p>
            Together is looking for investors and operators who understand local
            density, trust and real-world marketplace execution. Round size,
            terms and use of funds are not being invented for this memo.
          </p>
          <a className="primary" href="mailto:yann@hyperdrift.io?subject=Together%20investor%20conversation">
            Discuss Together
          </a>
        </section>

        <footer className="investor-footer">
          <p>Private and confidential. Not for redistribution.</p>
          <p>Together · July 2026</p>
        </footer>
      </main>
    </>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
