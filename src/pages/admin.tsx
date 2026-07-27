import { getLaunchRegistrationAdminData } from '../lib/launch-registration';
import {
  adultEligibilityOptions,
  londonAreaOptions,
  placeTypeOptions,
  qualificationLabel,
} from '../lib/launch-qualification-schema';

function formatDate(value: string | null) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  }).format(new Date(value));
}

export default function AdminPage() {
  const data = getLaunchRegistrationAdminData();

  return (
    <>
      <title>Registrations — Together Admin</title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
      <meta name="googlebot" content="noindex, nofollow, noarchive" />
      <main className="admin-page">
        <header className="admin-header">
          <a className="wordmark" href="/" aria-label="Together home">
            Together.
          </a>
          <div>
            <p className="eyebrow">Private launch view</p>
            <h1>Registrations</h1>
            <p>
              Confirmed interest is the demand signal. Pending registrations
              have not completed the email step.
            </p>
          </div>
        </header>

        <dl className="admin-summary">
          <div>
            <dt>Total</dt>
            <dd>{data.total}</dd>
          </div>
          <div>
            <dt>Confirmed</dt>
            <dd>{data.confirmed}</dd>
          </div>
          <div>
            <dt>Qualified</dt>
            <dd>{data.qualified}</dd>
          </div>
          <div>
            <dt>Pending</dt>
            <dd>{data.pending}</dd>
          </div>
        </dl>

        <section className="admin-registrations" aria-labelledby="registration-list">
          <header>
            <div>
              <p className="eyebrow">Latest first</p>
              <h2 id="registration-list">Launch list</h2>
            </div>
            <p>Showing up to 500 registrations.</p>
          </header>

          {data.registrations.length ? (
            <div className="admin-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Registered</th>
                    <th scope="col">Email sent</th>
                    <th scope="col">Confirmed</th>
                    <th scope="col">Natural place</th>
                    <th scope="col">London area</th>
                    <th scope="col">18+</th>
                    <th scope="col">Qualified</th>
                  </tr>
                </thead>
                <tbody>
                  {data.registrations.map((registration) => (
                    <tr key={registration.email}>
                      <th scope="row">{registration.email}</th>
                      <td>
                        <span data-status={registration.status}>
                          {registration.status}
                        </span>
                      </td>
                      <td>{formatDate(registration.createdAt)}</td>
                      <td>{formatDate(registration.confirmationSentAt)}</td>
                      <td>{formatDate(registration.confirmedAt)}</td>
                      <td>
                        {qualificationLabel(
                          placeTypeOptions,
                          registration.placeType,
                        )}
                      </td>
                      <td>
                        {qualificationLabel(
                          londonAreaOptions,
                          registration.londonArea,
                        )}
                      </td>
                      <td>
                        {qualificationLabel(
                          adultEligibilityOptions,
                          registration.adultEligibility,
                        )}
                      </td>
                      <td>
                        {formatDate(
                          registration.qualificationCompletedAt,
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="admin-empty">
              The list is ready. The first registration will appear here.
            </p>
          )}
        </section>
      </main>
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
