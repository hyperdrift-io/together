import { MeetingRequest } from '../components/meeting-request';

export default function HomePage() {
  return (
    <>
      <title>Together — A meeting. Not a match.</title>

      <header className="site-header">
        <a href="#top" aria-label="Together home">
          Together<span aria-hidden="true">.</span>
        </a>
        <p>London / 18+ pilot</p>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Face-to-face / London</p>
            <h1>
              <span>A meeting.</span>
              <span>Not a match.</span>
            </h1>
            <p className="lede">
              Life happens face to face. Together skips the matching,
              messaging, and waiting. We arrange a real meeting in London with
              someone who has already chosen to be there.
            </p>
            <a className="primary" href="#request">
              Get me a meeting
            </a>
            <p className="trust-line">
              London. 18+. Mutual yes. Meeting confirmed.
            </p>
          </div>

          <aside className="meeting-stamp" aria-label="Together outcome">
            <p>Success looks like</p>
            <strong>Two people.</strong>
            <strong>One place.</strong>
            <strong>One time.</strong>
          </aside>
        </section>

        <section className="manifesto">
          <header>
            <p className="section-label">The model is backwards</p>
            <h2>Matching is not meeting.</h2>
          </header>

          <ol className="dead-loop" aria-label="The online matching loop">
            <li>Profile.</li>
            <li>Match.</li>
            <li>Message.</li>
            <li>Wait.</li>
          </ol>

          <p className="replacement">Meet.</p>
          <p className="manifesto-copy">
            A profile is not progress. A match is not a date. A message is not
            a meeting. Together is built around the part that actually matters:
            turning up.
          </p>
        </section>

        <section className="contract">
          <header>
            <p className="section-label">The Together promise</p>
            <h2>We count who turns up.</h2>
          </header>
          <div>
            <p>
              Together stays responsible until both people choose the
              introduction and the place and time are confirmed.
            </p>
            <p>
              If a confirmed meeting falls through, we arrange another. No
              endless inbox. No engagement theatre.
            </p>
          </div>
        </section>

        <section className="process">
          <header>
            <p className="section-label">Request to reality</p>
            <h2>Three moves. Then meet.</h2>
          </header>
          <ol>
            <li>
              <span>01</span>
              <h3>Request.</h3>
              <p>Tell us when and where you can meet, and what matters.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Mutual yes.</h3>
              <p>
                We propose a person worth meeting. Both people choose
                separately.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Meet.</h3>
              <p>We confirm the place, the time, and the plan.</p>
            </li>
          </ol>
        </section>

        <MeetingRequest />

        <section className="agency">
          <p className="section-label">Bold does not mean careless</p>
          <h2>Your yes stays yours.</h2>
          <p>
            Every introduction requires mutual opt-in. You can decline, cancel,
            block, or report at any point. Contact details are shared only with
            permission.
          </p>
        </section>

        <section className="closing">
          <p className="section-label">London is outside</p>
          <h2>Life is too short for another talking stage with an app.</h2>
          <a className="primary" href="#request">
            Get me a meeting
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <p>Together.</p>
        <p>A face-to-face meeting service for London.</p>
      </footer>
    </>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
