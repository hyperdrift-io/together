# Together — Landing Page Experience

**Status:** Core copy and UX direction approved; operating claims provisional  
**Purpose:** Convert qualified visitors into specific real-world intents  
**Primary event:** `meeting_request_submitted`

## Strategic position

Most dating products sell an opportunity to browse, match, and message. Their
success can increase while the participant remains alone with another
conversation to manage. Together sells responsibility for reaching a confirmed
face-to-face meeting.

The disruptive idea is not “offline dating.” Existing services already offer
IRL dinners, singles events, activities, and human matchmaking. Together's edge
is the outcome contract:

> You ask to meet. Together finds someone compatible, gets both people's yes,
> fixes the place and time, and makes a failed confirmation right.

This does not supersede intent, compatibility, accessibility, or safety. Those
are the conditions that make the meeting worth guaranteeing.

## 50ms design brief

The page feels like a category break. Near-black and optic white create the
contrast anchor; one signal-orange action is the only colour demanding
attention. The eye lands on an oversized two-beat statement—“A MEETING. NOT A
MATCH.”—then immediately on “GET ME A MEETING.” There is no app chrome, profile
card, phone mock-up, feature grid, couple photography, or soft lifestyle
language. The feeling is: **this product refuses the digital holding pattern
and takes responsibility for getting me face to face.**

## Design system

### Tone

**Energetic defiance:** blunt, high-contrast, fast, and accountable.

### Proposed tokens

- Background: near-black
- Text: optic white
- Surface: white or charcoal blocks with hard contrast
- Accent: signal orange used only for the primary action and confirmed meeting
- Border: current colour at deliberate, visible contrast
- Type: one heavy grotesk/system sans-serif, two or three weights
- Shape: squared or minimally rounded; never dating-app pills
- Motion: a short strike-through and confirmation snap only, with
  reduced-motion support

Exact colour values should be contrast-tested during implementation. Do not use
a gradient hero, glass effects, equal-weight cards, soft shadows, or decorative
motion.

## Signature interaction

**The dead loop is visibly replaced.**

The page shows the old loop as four oversized words:

> PROFILE. MATCH. MESSAGE. WAIT.

They are struck through in sequence. The replacement lands beneath them:

> MEET.

The first interaction asks when the visitor can meet. The remaining practical
questions unfold below it. Two hard lines from opposite edges converge on a
time-and-place confirmation block. This “meeting point” is Together's recurring
signature: the screen stops being a feed and becomes a real appointment.

## Page structure and copy

### 1. Hero — make the distinction

**Together**

# A meeting. Not a match.

Life happens face to face. Together skips the matching, messaging, and waiting.
We arrange a real meeting in London with someone who has already chosen to be
there.

**Primary input label:** When can you meet?

**Primary action:** Get me a meeting

**Trust line:** London. 18+. Mutual yes. Meeting confirmed.

Do not lead with AI, accessibility, loneliness, compatibility algorithms, or
the five proposed product pillars. It is acceptable to name the broken
match-message-wait loop. Critique the incentive model, never the people using
it.

### 2. Outcome contract — make the guarantee legible

## We count who turns up.

A profile is not progress. A match is not a date. A message is not a meeting.
Together stays responsible until two people choose the introduction and the
place and time are confirmed.

**The Together promise**

When we confirm a meeting, everyone has opted in and the plan is agreed. If it
falls through, we arrange another.

This wording is provisional until the guarantee mechanics are approved.

### 3. How it works — remove uncertainty

## From request to face to face

1. **Request.** Tell us when and where you can meet and what matters.
2. **Mutual yes.** We propose someone compatible and ask both people
   separately. Nothing is shared without agreement.
3. **Meet.** We confirm the place, time, and anything that helps the meeting
   work.

No separate feature section is needed. These steps are the product.

### 4. Agency and comfort — earn trust

## Bold does not mean careless.

You decide whether an introduction feels right. Access and comfort needs are
optional planning details, shared only as needed to make the meeting work.

Supporting statements:

- An introduction always requires mutual opt-in.
- Contact details are shared only with permission.
- You can decline, cancel, block, or report at any point.

These statements may ship only when the operating process actually supports
them.

### 5. Final action — repeat the real behaviour

## Life is happening in London.

Put a real meeting in the calendar.

**Primary action:** Get me a meeting

Do not add a newsletter field, secondary app-download CTA, social links, or
multi-column footer during the appetite test.

## Minimum form flow

### Step 1 — Availability

**When can you meet?**

This week, this weekend, next week, or a specific time. Required.

### Step 2 — Practical fit

- Which London area works?
- Coffee, drink, walk, activity, or no preference?
- How far are you willing to travel?

### Step 3 — Compatibility

**What matters when choosing someone for you to meet?**

Use a small number of structured preferences plus one optional short answer.
Do not turn the appetite form into a public-profile builder.

### Step 4 — Contact and consent

- First name
- Email or mobile number
- Adult-eligibility confirmation
- Pilot terms, privacy notice, and conduct agreement

The first appetite form should not ask for a public profile, diagnosis, general
accessibility record, dating-app history, long personality essay, or
hypothetical willingness to pay. Matching-critical dating preferences may be
requested only when the operator can use and protect them.

## Guarantee options requiring a decision

### Option A — Confirmation guarantee

Every confirmed meeting has mutual opt-in and an agreed plan. If it falls
through, Together provides the stated remedy.

**Advantages:** Honest at low density; protects match quality and consent.  
**Trade-off:** Does not promise that every applicant will receive a meeting.

### Option B — Placement guarantee

Every eligible participant receives a confirmed meeting within a defined period
or pays nothing.

**Advantages:** Stronger and commercially disruptive.  
**Trade-off:** Requires explicit eligibility, dense supply, time limits, and
capacity control. It can create pressure to accept a weaker fit.

### Option C — Presence guarantee

A Together host or verified group is present at the agreed place so no
participant arrives alone.

**Advantages:** Directly answers the no-show fear and can improve safety.  
**Trade-off:** Operationally expensive and changes the experience, especially
for one-to-one dating.

**Recommendation:** Launch with Option A. Test Option B only after one cohort
shows reliable matching density. Use Option C for hosted group pilots if an
identified operator can honour it.

## Commercial alignment to test later

The strongest business-model expression would charge for the outcome rather
than access:

- No recurring fee to browse
- A fee only when a meeting is confirmed or attended
- Participant-chosen refund or rebooking when the guarantee is invoked

This is strategically coherent but not approved. Payment should follow
experienced value, and any guarantee terms require legal review before a paid
public launch.

## Analytics boundary

Analytics may receive:

- Cohort
- City
- Source
- Form step
- Connection-cycle identifier
- Selected timing and group-size categories

Analytics must not receive:

- Contact details
- Free-text activity
- Dating preferences beyond a non-identifying aggregate category
- Access or health information
- Safety reports

## Anti-generic and Voice Covenant audit

- One primary action: yes
- User outcome in the first viewport: yes
- Product mechanism explained without feature grid: yes
- No fabricated urgency or scarcity: yes
- No promise that another adult cannot cancel: required
- No blame toward people using existing apps: yes
- Category criticism targets the incentive model, not users: yes
- No “seamless,” “powerful,” “innovative,” or “unlock”: yes
- No gradient blob, phone mock-up, logo row, testimonial carousel, or stock
  portrait: yes

## Remaining approvals before a public launch

1. First London recruitment communities
2. Named operator
3. Guarantee remedy and response time
4. Standalone subdomain or Hyperdrift route
5. Google Form/Sheet or native storage
