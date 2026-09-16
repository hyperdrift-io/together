# Together

> Inherits the [Hyperdrift workspace AGENTS.md](../../AGENTS.md)
> (`~/dev/hyperdrift/AGENTS.md`) and `meta/PHILOSOPHY.md`, including the Voice Covenant.

## Status

Together is a prototype in product discovery. The local own-stack landing page,
SQLite launch-registration store, confirmation-email boundary, and focused
registration-flow test are approved. The user approved a public repository,
SMTP delivery, and production deployment on 2026-07-24. This approval covers
the demand-test landing page, not the meeting product.

The private `/admin` operations page is read-only, renders directly from the
launch-registration database, and is protected at the Nginx boundary with
HTTP Basic Auth. It must remain excluded from public navigation and indexing.

The pilot app now exists as a separate codebase:
`https://github.com/wblauvac/Together` (Next.js + Supabase PWA, deployed at
`https://together-weld.vercel.app`, magic-link sign-in). This landing page
stays the public front door and the demand-test store. Since 2026-09-12 it
links to the pilot ("Sign in" in the header), opens the three-question survey
in a `<dialog>` from any `#survey` link, and shows a `<progress>` bar of
all registrations in the page's market (pending included, matching the admin
total; changed 2026-09-16) towards the first-room target of 50 on the homepage.
The pilot URL lives in `src/lib/pilot-app.ts`; the target lives in
`src/components/launch-progress.tsx`.

Since 2026-09-16 the hero leads with a "Live now" badge and an "Already
invited? Open the app" link, and the page has a French version at `/fr`
(with `/fr/check-email`, `/fr/confirm`, `/fr/leave`). The user approved a
separate FR market: every registration carries `market` (`en` | `fr`), each
market has its own first-room counter and its own admin section, and analytics
events carry `market`. Copy lives next to each component, keyed by locale
(`src/lib/locale.ts`); French copy uses "tu". The London survey,
qualification, and post-confirmation phone step stay English-only. The FR
launch city is not decided yet, so FR copy names France only. The pilot app
stays on Vercel; French in the app itself is a change in its own repository.
`/` sends browsers whose top language is French to `/fr`
(`src/middleware/preferred-locale.ts`); the header language switch adds
`?lang=`, which is saved in the `together_locale` cookie and wins over the
browser. There is no location (GeoIP) detection.

The approved direction is:

- Gather appetite before building the broader product
- Begin with a responsive web experience rather than a native app
- Optimise for fast, measurable learning and early growth
- Host public surfaces through Hyperdrift
- Lead with “Look up. They’re here.” and make shared physical presence clear
- Treat the landing page as a subscription-based demand test, not as the app
- Keep the outcome contract subordinate to mutual choice, compatibility,
  comfort, accessibility, and safety
- Keep the appetite homepage focused on registration; add only a subtle
  “Read the proposal” link to the public business proposal
- Maintain a separate gated, unlinked-from-home investor case that uses the
  uploaded research critically, distinguishes evidence from assumptions, and
  includes transparent market and operating-scenario visualisations
- Keep the investor case excluded from indexing and the public sitemap

The Passing Glance homepage and The Public Square proposal/investor direction
are approved and recorded in `docs/LANDING_PAGE.md`. Material changes still
follow the image-first design gate: generate three comparable concept boards,
obtain explicit selection, and record the approved image before changing UI
code.

Read `MISSION.md`, `docs/VALIDATION_PLAN.md`, `docs/LANDING_PAGE.md`, and
`docs/SOURCE_REVIEW.md` before changing product scope or user-facing copy.

## Mission

Help two adults already sharing a public place discover mutual interest and
turn it into a comfortable face-to-face hello.

The fuller wording and all open operating decisions live in `MISSION.md`.

## Product boundary

During appetite validation, do not add:

- Native applications
- Accounts or authentication
- Swipe, discovery, or social feeds
- Public profiles
- In-product messaging
- Automated matching
- AI-labelled product features
- Social-CRM functionality
- Multi-city launch logic beyond the approved EN (London) and FR markets

If a request would change the mission, initial audience, connection type,
privacy boundary, safety model, or success metric, stop and ask one focused
alignment question.

## Implementation boundary

If Together becomes a standalone Hyperdrift app, use the own-stack:

- Waku and React Server Components
- Typed server functions
- Semantic CSS with tokens in `:root`
- Client islands only where interaction requires them
- No Next.js, Tailwind, CSS-in-JS, or presentation inline styles
- No new dependency without explicit approval

The public appetite slice contains the measured landing proposition, one email
registration with an optional consented mobile number for invitation updates,
a public optional three-question survey with email opt-in, required consent
copy, metadata, analytics, sitemap, robots, and social preview.
It suggests the qualification after confirmation only when it has not already
been completed, as recorded in
`docs/design/2026-07-27-survey-integrations/README.md`.

Do not change its HTML, JSX, CSS, components, or production assets while a new
visual approval gate is open.

## Prototype validation

Do not add or expand automated test suites during discovery unless the user
explicitly makes a focused journey test part of the acceptance criterion. The
registration-and-confirmation test is that approved exception. Otherwise use
fast deploy-safety checks only: install, type-check, lint if configured, build,
security scan, and migration dry-run where relevant.

The user must review a local, development, or preview build before a production
deployment. A push to `main` runs `.github/workflows/deploy.yml`: the
registration-flow test on a GitHub-hosted runner, then `make deploy-local
app=together` on the server's own runner, then a GitHub release. No local SSH
is needed. Launch-readiness watches still run through Hyperdrift infra and
follow the workspace asynchronous handoff rule.

## Data and safety

- During appetite validation, collect only consented launch email registration,
  an optional consented mobile number for invitation updates, plus the approved
  optional structured survey answers: natural place type, broad London area,
  and adult eligibility.
- Store email-linked answers with the registration lifecycle and delete them
  when the registration is removed. Anonymous survey answers use a random
  browser ID only and expire after 30 days.
- Never send contact details, free-text intents, dating preferences,
  accessibility information, or safety reports to analytics.
- Do not share participant contact details before explicit mutual permission.
- Keep safety reports separated from growth analytics and normal operator
  notes.
- Do not promise confidentiality or matching until the actual storage,
  operator-access, retention, deletion, and reporting processes support the
  claim.
- Do not arrange introductions until the trust-and-safety gate in
  `docs/VALIDATION_PLAN.md` is complete.

## Measurement

The landing page optimises for `launch_interest_confirmed`. It is explicitly a
demand test and does not imitate the later product flow. The product outcome,
if built, remains a successful connection cycle:

`meeting request → mutual opt-in → meeting confirmed → meeting attended → would repeat`

Do not publish an absolute meeting guarantee until its eligibility, timing,
territory, remedy, pricing, and operating capacity are approved and evidenced.

The build gate is 500 qualified London visits, 100 confirmed registrations, and
15% confirmed conversion across at least three independent sources. Together
does not count likes, matches, profile views, or messages as the eventual
product outcome.

## Domain references

- `docs/SOURCE_REVIEW.md` records the three supplied research documents and
  their limitations.
- `https://skills.sh/wondelai/skills/lean-startup` informed the falsifiable
  validation ladder; it is not installed.
