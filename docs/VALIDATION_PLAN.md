# Together — Appetite Validation Plan

**Status:** Local subscription and email-confirmation flow implemented;
production provider and deployment pending
**Experiment:** Passing Glance / mutual hello landing page before product
development

## Decision this experiment controls

Together will not build the product because the concept sounds attractive. It
will build only if enough qualified Londoners make a measurable commitment to
try it.

The landing page is therefore not the app, product onboarding, or a concierge
pilot. Its job is to answer:

> After understanding that Together helps people meet someone who is already in
> the same place, will a London adult confirm their interest in bringing it
> into existence?

## Proposition under test

### Headline

**Look up. They’re here.**

### Mechanism

Together helps people already in the same public place discover when the
feeling is mutual and meet face to face. The appetite page describes that
outcome without inventing product mechanics that have not been built.

### Outcome contract

Together is designed to count an attended date as the outcome. If a mutually
confirmed plan falls through, Together takes responsibility for arranging the
next one without weakening consent, comfort, or compatibility.

The appetite page tests whether this commitment is desirable. It does not prove
that Together can fulfil an absolute guarantee. Placement time, eligibility,
remedies, and operating cost must be validated during the manual pilot.

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
| Exposure | `landing_viewed` | Visitor saw variant `mutual_hello` |
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
- **Competition-relative:** visitors see shared presence and a real hello,
  rather than another remote matching or messaging loop.
- **Risk reversal:** Together, rather than the participant, remains responsible
  for progressing a failed confirmed plan toward another arrangement.
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
- Outcome-contract language framed as the intended service, with no absolute
  performance claim before the pilot terms are approved

## Launch sequence

1. Approve the Passing Glance page locally. **Complete.**
2. Implement durable consented intake and confirmation. **Complete locally.**
3. Verify registration, email receipt, and confirmation in one focused test.
   **Complete.**
4. Select the public URL and production email sender.
5. Verify analytics routing and privacy boundaries.
6. Approve the slice for production.
7. Deploy through Hyperdrift infra and run launch readiness.
8. Acquire 500 qualified London visits across three sources.
9. Apply the pre-committed build, rework, or stop decision.

## Guarantee feasibility gate

Registration conversion validates appetite for the promise, not the ability to
deliver it. Before the first paid or publicly guaranteed meeting, the manual
pilot must establish:

- Eligible request definition
- Median and 90th-percentile time to a mutually confirmed date
- Confirmed-date attendance and cancellation rates
- Reasons Together cannot place a participant
- Number and cost of replacement arrangements
- Participant response to rebooking and refund remedies
- Safety and compatibility guardrails that cannot be traded for fulfilment
- Clear geographic, timing, and availability limits

The guarantee should not launch if fulfilling it requires knowingly weaker
matches, pressure to attend, hidden exclusions, or economics that reward
low-quality volume.
