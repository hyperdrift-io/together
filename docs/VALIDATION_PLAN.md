# Together — Appetite Validation Plan

**Status:** London-first subscription test approved; durable intake pending
**Experiment:** Minimalist AIDA landing page before product development

## Decision this experiment controls

Together will not build the product because the concept sounds attractive. It
will build only if enough qualified Londoners make a measurable commitment to
try it.

The landing page is therefore not the app, product onboarding, or a concierge
pilot. Its job is to answer:

> After understanding Together's distinct arranged-date promise, will a London
> adult register to help bring it into existence?

## Proposition under test

### Headline

**A meeting. Not a match.**

### Mechanism

Choose when you are free. Together finds someone compatible, checks the
interest is mutual, and arranges the date—person, place and time.

### Commitment

One email address to join the London launch list.

The first registration must remain easy. Optional qualification belongs after
email confirmation, not before it.

## Audience

Recruit London adults interested in meeting someone romantically face to face.
Use at least three independent traffic sources so one friendly community cannot
create a false positive.

Examples:

- London community or interest groups
- Founder and participant referrals
- A small, clearly targeted social campaign after measurement is verified

Report conversion separately by source and device.

## Funnel and events

| Stage | Event | Meaning |
|---|---|---|
| Exposure | `landing_viewed` | Visitor saw variant `aida_arranged_date` |
| Engagement | `launch_interest_started` | Visitor focused the email field |
| Appetite | `launch_interest_submitted` | Visitor submitted a valid email |
| Quality | `launch_interest_confirmed` | Visitor confirmed the registration |
| Qualification | `launch_profile_completed` | Visitor optionally confirmed London, 18+, and essential cohort information |
| Advocacy | `launch_interest_shared` | Confirmed registrant shared the launch |

Every event needs `variant`, `city`, `source`, and campaign where available.
Analytics must never receive the email address.

## Pre-committed decision threshold

Judge the idea only after at least 500 qualified London landing visits from
three independent sources. Bot, accidental, and clearly irrelevant traffic
does not enter the denominator.

| Outcome | Evidence | Decision |
|---|---|---|
| Build the first product slice | At least 100 confirmed registrations and at least 15% confirmed-registration conversion overall, with no single source supplying more than 60% | Proceed to product planning |
| Rework the proposition or audience | 50–99 confirmed registrations or 8–14.9% conversion | Run one materially different positioning test |
| Stop or change the wedge | Fewer than 50 confirmed registrations or below 8% conversion | Do not build the proposed product |

Raw email submissions are diagnostic. Confirmed registrations are the decision
signal. Always report counts with percentages.

## Why this is a credible test

- **Low friction:** one field measures desire without product-onboarding burden.
- **Real commitment:** email confirmation is stronger than a CTA click.
- **Falsifiable:** the thresholds specify when not to build.
- **Competition-relative:** visitors see the unique arranged-date outcome,
  rather than a generic “better dating” claim.
- **Local density:** London is the explicit launch market and network boundary.

## Optional post-confirmation qualification

After confirmation, ask at most three optional questions:

1. Are you 18 or over and based in London?
2. Which broad London area is easiest for you?
3. Who would you hope to meet?

This step qualifies network density without reducing the primary registration
rate. Sensitive dating preferences require a documented storage and deletion
policy before collection.

## Technical slice

- Static responsive own-stack landing page
- Full metadata, social preview, robots, sitemap, and canonical URL
- GA4 and PostHog before public traffic
- One email registration field
- Durable consented subscription storage
- Confirmation email and `launch_interest_confirmed`
- No accounts, profile store, matching, messaging, availability form, or
  meeting operations

## Launch sequence

1. Approve the AIDA page locally.
2. Select the public URL.
3. Implement durable consented intake and confirmation.
4. Verify analytics routing and privacy boundaries.
5. Approve the slice for production.
6. Deploy through Hyperdrift infra and run launch readiness.
7. Acquire 500 qualified London visits across three sources.
8. Apply the pre-committed build, rework, or stop decision.
