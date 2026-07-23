# Together

> Inherits the Hyperdrift workspace `AGENTS.md` and
> `meta/PHILOSOPHY.md`, including the Voice Covenant.

## Status

Together is a prototype in product discovery. No application architecture,
remote repository, domain, storage system, or production deployment is approved
yet. The local own-stack landing prototype is approved.

The approved direction is:

- Gather appetite before building the broader product
- Begin with a responsive web experience rather than a native app
- Optimise for fast, measurable learning and early growth
- Host public surfaces through Hyperdrift
- Lead with “A meeting. Not a match.” and a bold London-first category break

Read `MISSION.md`, `docs/VALIDATION_PLAN.md`, `docs/LANDING_PAGE.md`, and
`docs/SOURCE_REVIEW.md` before changing product scope or user-facing copy.

## Mission

Get Londoners out of matching-and-messaging loops and into a confirmed
face-to-face meeting with someone who has chosen to be there.

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
- Multi-city launch logic

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

The first public slice should contain only the measured landing proposition,
short intent intake, required trust copy, metadata, analytics, sitemap, robots,
and social preview.

## Prototype validation

Do not add or expand automated test suites during discovery. Use fast
deploy-safety checks only: install, type-check, lint if configured, build,
security scan, and migration dry-run where relevant.

The user must review a local, development, or preview build before a production
deployment. Production deploys and launch-readiness watches run through
Hyperdrift infra and follow the workspace asynchronous handoff rule.

## Data and safety

- Collect the minimum data needed for one connection cycle.
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

The landing page optimises for `meeting_request_submitted`, not generic
waitlist registration. The product outcome is a successful connection cycle:

`meeting request → mutual opt-in → meeting confirmed → meeting attended → would repeat`

Together does not count likes, matches, profile views, or messages as the core
outcome. Guarantee language may ship only after the guarantee eligibility,
remedy, response time, and responsible operator are approved and operational.

## Domain references

- `docs/SOURCE_REVIEW.md` records the three supplied research documents and
  their limitations.
- `https://skills.sh/wondelai/skills/lean-startup` informed the falsifiable
  validation ladder; it is not installed.
