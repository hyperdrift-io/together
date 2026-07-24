import { LaunchSignup } from '../components/launch-signup';

export default function HomePage() {
  return (
    <>
      <title>Together — Look up. They’re here.</title>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <header className="site-header">
            <a className="wordmark" href="#top" aria-label="Together home">
              Together.
            </a>
            <p>Face to face. Already here.</p>
          </header>

          <div className="hero-copy">
            <p className="eyebrow">A real connection, in the real world</p>
            <h1 id="hero-title">
              Look up.
              <em>They’re here.</em>
            </h1>
            <p className="lede">
              Together helps people already in the same place discover when the
              feeling is mutual—and meet face to face.
            </p>
            <p className="status-note">
              We’re validating the idea before building the app. Join the first
              list to help make it happen.
            </p>
            <LaunchSignup />
          </div>

          <footer className="hero-close">
            <p>Come. Spark. Connect.</p>
          </footer>
        </section>
      </main>
    </>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
