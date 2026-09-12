import { PilotLink } from './pilot-link';

export function PilotPreview() {
  return (
    <section className="pilot-live" aria-labelledby="pilot-title">
      <figure>
        <img
          src="/images/together-meeting-outcome.png"
          alt="Two people meeting face to face in a shared public place."
          width="960"
          height="720"
          loading="lazy"
        />
        <figcaption>A first London room.</figcaption>
      </figure>

      <div>
        <p className="eyebrow">The pilot is live</p>
        <h2 id="pilot-title">A first small group is already inside.</h2>
        <p>
          Testers sign in with a one-time link sent to their email. No
          password, nothing to install. Everyone else joins the list and is
          invited when the next room opens.
        </p>
        <p className="pilot-actions">
          <PilotLink className="primary" placement="pilot-section">
            Sign in to the pilot
          </PilotLink>
          <a href="#join">Not invited yet? Join the list</a>
        </p>
        <ol className="pilot-steps">
          <li>
            <span>
              <b>Join the list.</b> One email address.
            </span>
          </li>
          <li>
            <span>
              <b>Confirm.</b> Open the email from Together.
            </span>
          </li>
          <li>
            <span>
              <b>Get invited.</b> Your sign-in link arrives when the next room
              opens.
            </span>
          </li>
        </ol>
      </div>
    </section>
  );
}
