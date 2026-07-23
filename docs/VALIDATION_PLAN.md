# Together — Appetite Validation Plan

**Status:** London-first direction approved; operating details in discovery  
**Experiment:** Meeting-request smoke test followed by a manual concierge pilot

## What this phase must learn

The landing page is not a generic waitlist. It tests whether a London adult will
request a face-to-face meeting, provide near-term availability, and give
Together permission to propose someone compatible.

The experiment should be able to disprove the idea. A large number of page
views or email addresses without qualified meeting requests does not validate
Together.

## Riskiest assumptions, in order

1. Londoners in the initial community will request a near-term meeting.
2. Enough compatible people will be available at the same time and place.
3. Participants will accept a curated introduction without an open browsing
   feed.
4. Accepted introductions will become attended meetings.
5. A comfortable meeting will create repeat use or a trusted invitation.
6. Repeated value will support payment.

The first landing page tests assumption 1. Manual operation tests assumptions
2–5. Payment should be tested only after participants have experienced the
service.

## Audience

Use one or two dense, reachable London communities for the first cycle.
“London” alone is not a cohort; the city contains many disconnected networks.

The chosen cohort needs:

- At least 30 reachable adults
- Geographic overlap that makes a meeting practical
- A trusted invitation channel
- Enough availability during the same two-week window
- An identified operator who can make introductions and follow up

## Landing-page promise

### Proposed headline

**A meeting. Not a match.**

### Proposed supporting copy

Life happens face to face. Together skips the matching, messaging, and waiting.
We arrange a real meeting in London with someone who has already chosen to be
there.

### Primary action

**Get me a meeting**

Do not use “Join the waitlist” as the primary action. It measures curiosity
while avoiding the behaviour the product depends on.

### Proposed trust line

**London. 18+. Mutual yes. Meeting confirmed.**

### Guarantee boundary

The landing page may say Together guarantees the service outcome only after the
pilot selects and can honour a written guarantee.

Recommended initial wording:

> **The Together promise:** We do not count a like or message as success. When
> we confirm a meeting, everyone has chosen it and the plan is agreed. If it
> falls through, we arrange another.

Do not say “we guarantee everyone a meeting” until eligibility, service area,
time window, available supply, cancellation terms, and remedy are explicit.
Never imply that Together can prevent another adult from cancelling.

## Minimum intake

The first form should take approximately one minute.

1. When can you meet?
2. Which London area works for you?
3. What kind of first meeting feels right?
4. What matters when choosing someone for you to meet?
5. How may Together contact you about the proposal?
6. Required confirmation of adult eligibility, pilot participation, privacy
   notice, and code of conduct

Optional planning needs belong after initial intent or against a specific
proposed plan. Do not collect a general medical or disability profile.

## Funnel and events

| Stage | Event | Meaning |
|---|---|---|
| Exposure | `landing_viewed` | Visitor saw the appetite proposition |
| Engagement | `meeting_request_started` | Visitor began the London meeting request |
| Appetite | `meeting_request_submitted` | Valid availability, London area, practical preferences, contact permission, and consent submitted |
| Qualification | `meeting_followup_accepted` | Participant replied to concierge follow-up |
| Activation | `introduction_accepted` | All proposed participants opted in |
| Coordination | `meeting_confirmed` | Time and place agreed |
| Value | `meeting_attended` | Meeting happened |
| Quality | `meeting_would_repeat` | Participant would use Together again |
| Retention | `repeat_meeting_requested` | Participant requested another meeting within 30 days |
| Growth | `trusted_invitation_joined` | A participant’s invited contact submitted a valid meeting request |
| Guarantee | `meeting_guarantee_invoked` | A confirmed meeting failed and the participant requested the promised remedy |
| Remedy | `meeting_guarantee_resolved` | Rebooking, introduction, refund, or credit was completed |

Every event needs `cohort`, `city`, `source`, and a non-sensitive cycle
identifier where applicable. Do not send contact details, access needs, free
text, or sensitive preferences to analytics.

## Working decision thresholds

These are proposed pre-commitments for a small first cohort and should be
approved before traffic begins.

| Checkpoint | Continue | Rework | Stop or change wedge |
|---|---:|---:|---:|
| Qualified visitors submitting a meeting request | at least 20% | 8–19% | below 8% |
| Submitted participants accepting concierge follow-up | at least 60% | 30–59% | below 30% |
| Complete proposed groups reaching mutual opt-in | at least 50% | 25–49% | below 25% |
| Confirmed meetings that are attended | at least 70% | 40–69% | below 40% |
| Attendees choosing repeat use within 30 days | at least 40% | 15–39% | below 15% |
| Invoked guarantees resolved within the promised time | 100% | below 100% pauses new confirmations | unresolved guarantees stop the pilot |

Small samples are directional. Record denominators and verbatim context; do not
present percentages without counts.

## Growth loop

The initial engine is trusted, local invitation—not SEO or paid acquisition.

1. Invite a specific London community to request real meetings.
2. Deliver a comfortable, mutually accepted meeting.
3. Ask successful participants whether they want another meeting.
4. Offer an optional invitation for one person they already trust.
5. Measure whether the invited person submits a valid intent.

Do not add referral rewards before the underlying experience earns a natural
recommendation.

## Manual concierge workflow

1. Review the meeting request and confirm the participant is eligible.
2. Clarify only information needed for this plan.
3. Identify compatible availability and preferences.
4. Ask each person separately whether they want the proposed introduction.
5. Share contact details only after explicit mutual permission.
6. Confirm time, place, cost expectations, access needs, cancellation path, and
   conduct expectations.
7. Follow up after the planned meeting.
8. Record attendance, comfort, repeat intent, and any safety issue separately
   from product analytics.

## Trust and safety gate

The pilot must define these before the first introduction:

- Adult eligibility
- Operator identity and contact route
- Mutual opt-in and contact-sharing rules
- Code of conduct
- Cancellation and no-show handling
- Reporting, blocking, and removal process
- Emergency disclaimer and local emergency guidance
- Data access, retention, deletion, and spreadsheet permissions
- Handling of dating preferences and accessibility information
- Guarantee eligibility, exclusions, remedy, response time, and responsible
  operator

The landing page may collect appetite before all operational detail is
implemented, but it must not promise or arrange introductions until this gate is
complete.

## Technical slices

### Slice A — measured appetite page

- Responsive web page
- Full metadata, social preview, robots, sitemap, and canonical URL
- GA4 installed before traffic
- `landing_viewed`, `meeting_request_started`, and
  `meeting_request_submitted` measurement
- One short form
- Privacy, eligibility, and pilot-expectation copy
- No account, feed, messaging, profile store, matching engine, or AI

### Slice B — manual operations

- Restricted intent view or spreadsheet
- Stable connection-cycle identifiers
- Explicit status tracking for follow-up, opt-in, confirmation, attendance, and
  repeat
- Separate restricted process for safety reports

### Slice C — first product automation

Build only after the manual pilot identifies repeated operator work and the
signals that genuinely predict successful meetings.

## Launch sequence

1. Approve mission, wedge, cohort, eligibility, operator, URL, and data path.
2. Approve the guarantee definition and remedy or remove guarantee language.
3. Build Slice A on the Hyperdrift own-stack if it is a standalone app.
4. Review locally or on a development deployment.
5. Approve the current slice for production.
6. Deploy through `infra/` and run launch readiness.
7. Invite the first cohort through a specific trusted channel.
8. Review the funnel daily while the cohort is active.
9. Decide continue, rework, or change wedge from the pre-agreed thresholds.
