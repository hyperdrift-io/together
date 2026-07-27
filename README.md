# Together

> Look up. They’re here.

Together is a face-to-face meeting concept in product discovery. It is designed
to help people who are already in the same public place discover when the
feeling is mutual and make the first hello easier. London is the first
validation community, not the product mechanism.

## Project documents

- [Mission and vision ledger](MISSION.md)
- [Appetite validation plan](docs/VALIDATION_PLAN.md)
- [Landing-page experience](docs/LANDING_PAGE.md)
- [Source review](docs/SOURCE_REVIEW.md)

## Status

The own-stack landing page is live at
[`together.hyperdrift.io`](https://together.hyperdrift.io). Its email form
stores a pending registration, sends an SMTP confirmation link, and counts only
confirmed registrations. Confirmed people can optionally answer three
structured questions that qualify London pilot density without changing the
appetite signal. The actual meeting app is deliberately not being built until
London demand is significant.

The registration boundary validates both email syntax and whether the domain
can receive mail before creating a pending record. Temporary DNS failures fail
open so infrastructure noise does not reject a valid person.

Local verification uses the file-backed test email transport:

```bash
pnpm test
```

Production delivery uses SMTP and expects `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_FROM`, and `SITE_URL`. Registration data
is stored outside the deploy checkout at `TOGETHER_DATA_PATH`.

Operators can review totals and the latest registrations at `/admin`. The
production route is read-only and protected by Nginx Basic Auth; credentials
are managed by infrastructure rather than the application repository.
