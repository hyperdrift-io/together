# Together — Landing Page Experience

**Status:** AIDA appetite direction approved for local validation
**Purpose:** Make the Together experience desirable enough that Londoners
register to bring it into existence
**Primary event:** `launch_interest_submitted`
**Variant:** `aida_arranged_date`

## Conversion hypothesis

`aida_arranged_date` will increase confirmed London launch registrations because
it makes Together's unique outcome easy to imagine, explains the mechanism in
one sentence, and asks for only an email. The page is not the product and must
not behave like product onboarding.

Primary metric:

`launch_interest_submitted / landing_viewed`

Guardrail once durable intake exists:

`launch_interest_confirmed / launch_interest_submitted`

## Competition-relative position

Together does not differentiate merely by being “offline,” “no swipe,” a
singles event, a group dinner, or a human matchmaker. Those positions already
exist.

Together's specific promise is:

> Choose when you are free. Together curates a mutually accepted person and
> arranges the place and time.

The page expresses that uniqueness positively. It does not need an
anti-competitor section because the mechanism itself creates the contrast:

`one request → one mutual yes → one arranged date`

## 50ms design brief

The eye enters on “A meeting. Not a match.” against a generous warm-white
canvas, then moves naturally to one calm violet registration panel. An example
appointment card makes the future service tangible without pretending the app
already exists. The feeling is energetic confidence: **this is new, obvious,
and I want London to have it.**

The design is disruptive through reduction and specificity, not aggression.
There is no black-and-orange manifesto, struck-through competitor journey,
phone mock-up, profile grid, or hostile language.

## Minimal AIDA sequence

### Attention

# A meeting. Not a match.

**Category line:** Face-to-face dating, arranged.

### Interest

Choose when you are free. Together finds someone compatible, checks the
interest is mutual, and arranges the date—person, place and time.

### Desire

Show the outcome as a confirmed London appointment:

- A specific day and time
- A real place
- “Mutually chosen”
- “Place and time in your calendar”

Then explain only the three indispensable steps:

1. Pick a time.
2. Both say yes.
3. Meet.

### Action

**Prompt:** Want this in London?

**Support:** Register your interest and help make Together happen.

**Field:** Email address

**CTA:** I want Together

**Trust line:** London launch · 18+ · Founding members get first access.

The final page section makes the collective launch trigger explicit:

> Together starts when London says yes.

## Psychology applied

- **Jobs to Be Done:** sell a real date already arranged, not dating-app
  features.
- **Availability heuristic:** make the outcome vivid through one calendar
  appointment.
- **Commitment and consistency:** ask for one small, meaningful commitment.
- **Critical mass:** show that London registrations determine whether Together
  gets built.
- **Unity:** “London” is the shared identity and launch boundary.
- **Hick's Law / paradox of choice:** one audience, one field, one action.
- **Regret aversion:** first access is the truthful benefit of registering now.
- **Ethical scarcity:** do not invent counts, deadlines, or limited places.

## Page boundary

Keep:

- One proposition
- One outcome preview
- Three short steps
- One email registration form
- One honest explanation of what the registration controls

Remove:

- Competitor criticism
- Industry manifestos
- Guarantee details for an unbuilt service
- Safety-process detail before the product exists
- Meeting preferences, availability, borough, name, and profile questions
- Testimonials or signup counts until they are real
- Secondary navigation and newsletter framing

## Analytics boundary

Capture:

- `landing_viewed`
- `launch_interest_started`
- `launch_interest_submitted`
- Variant, city, source, device, and campaign

Do not send the email address to analytics. Durable intake stores it separately
and should emit only a non-sensitive subscription identifier.

## Launch requirements

Before public traffic:

1. Durable email intake and deletion path
2. Privacy notice and explicit launch-update consent
3. Double opt-in or equivalent confirmation event
4. GA4 and PostHog verification
5. Approved URL and Hyperdrift deployment
6. Pre-committed build / rework / stop thresholds
