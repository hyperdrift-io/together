import { LaunchSignup } from '../components/launch-signup';

export default function HomePage() {
  return (
    <>
      <title>Together — A meeting. Not a match.</title>

      <header className="site-header">
        <a href="#top" aria-label="Together home">
          Together<span aria-hidden="true">.</span>
        </a>
        <p>London launch</p>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Face-to-face dating, arranged</p>
            <h1>
              <span>A meeting.</span>
              <span>Not a match.</span>
            </h1>
            <p className="lede">
              Choose when you are free. Together finds someone compatible,
              checks the interest is mutual, and arranges the date—person,
              place and time.
            </p>
            <LaunchSignup />
          </div>

          <article className="date-card" aria-label="Example Together date">
            <header>
              <p>Together / London</p>
              <strong>Confirmed</strong>
            </header>
            <div>
              <p>Your next date</p>
              <time dateTime="2026-08-06T19:00">Thursday · 7:00 PM</time>
              <h2>Covent Garden</h2>
            </div>
            <dl>
              <div>
                <dt>Person</dt>
                <dd>Mutually chosen</dd>
              </div>
              <div>
                <dt>Plan</dt>
                <dd>Drinks, one hour</dd>
              </div>
            </dl>
            <footer>
              <span aria-hidden="true">✓</span>
              Place and time in your calendar
            </footer>
          </article>
        </section>

        <section className="experience">
          <header>
            <p className="eyebrow">The whole idea</p>
            <h2>You choose when. Together handles the rest.</h2>
          </header>
          <ol>
            <li>
              <span>1</span>
              <div>
                <h3>Pick a time.</h3>
                <p>Tell Together when and where you would like to go out.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>Both say yes.</h3>
                <p>
                  Together introduces someone compatible. The interest must be
                  mutual.
                </p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Meet.</h3>
                <p>The person, place and time arrive as one confirmed plan.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="signal">
          <p className="eyebrow">London decides</p>
          <h2>Together starts when London says yes.</h2>
          <p>
            Registering is your vote to bring Together to life. When London
            demand is strong enough, we move from idea to app—and founding
            members are first to try it.
          </p>
          <a className="primary" href="#join">
            Join the London launch
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <p>Together.</p>
        <p>One request. One mutual yes. One real date.</p>
      </footer>
    </>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
