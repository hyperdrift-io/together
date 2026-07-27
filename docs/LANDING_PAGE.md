# Together — Landing Page Experience

**Status:** Approved direction live at `https://together.hyperdrift.io`
**Purpose:** Make the Together experience desirable enough that Londoners
register to bring it into existence
**Primary event:** `launch_interest_confirmed`
**Variant:** `mutual_hello`

## Visual approval gate

Before UI implementation, generate three comparable concept boards using the
same proposition, content scope, desktop viewport, and mobile viewport. The
user selects or revises one direction. Record the selected image here before
changing HTML, JSX, CSS, components, or production assets.

**Selected direction:** Passing Glance

**Approved image:** [`2026-07-24-passing-glance-come-spark-connect.png`](design/approved/2026-07-24-passing-glance-come-spark-connect.png)

**Approval date:** 2026-07-24

**Production hero:** [`together-passing-glance.jpg`](../public/images/together-passing-glance.jpg)

**Branded social preview:** [`together-passing-glance-og-branded.jpg`](../public/images/together-passing-glance-og-branded.jpg)

The production hero was derived from the approved board as a clean,
text-free bitmap so the page typography, form, responsive layout, and
accessibility remain native HTML and CSS. Its generation prompt is recorded in
[`2026-07-24-production-hero-prompt.md`](design/approved/2026-07-24-production-hero-prompt.md).
The Open Graph image keeps the same approved scene but carries the Together
wordmark and proposition because social shares do not include the page’s HTML
branding.

## Public proposal and investor case — The Public Square approved

**Approved information architecture:**

- `/proposal` is the public, customer-facing business proposal. It is not a
  second generic landing page. It should make the radical offer desirable:
  Together helps people already sharing a public place discover mutual interest
  and meet face to face. Its narrative moves from the cultural problem to the
  human mechanism, the meeting outcome, the honest demand gate, and the
  existing launch registration.
- `/investors` is a private investment case. It should combine the thesis,
  why-now evidence, market landscape, competitive positioning, local-density
  model, transparent operating scenarios, validation plan, material risks,
  unresolved economics, and source library. It must remain gated, `noindex`,
  excluded from the sitemap, and absent from homepage navigation.
- The appetite homepage remains visually unchanged except for one subtle
  “Read the proposal” link to `/proposal`.

The investor narrative uses the current **already here** product as canonical.
The uploaded April 2026 documents are inputs to interrogate, not facts to
republish. External evidence, internal hypotheses, illustrative scenarios, and
live traction must remain visually distinct. Pricing, CAC, contribution margin,
payback, team, raise, and use of funds remain unknown until supplied or
validated.

The first three paired boards were based on an ambiguous “offering page” and
are superseded. They remain in
[`design/archive/2026-07-24-offering-and-investor-pages-superseded/`](design/archive/2026-07-24-offering-and-investor-pages-superseded/).

Three corrected paired public-proposal/investor boards were presented:

1. **Radical Prospectus** — strongest continuity with the approved homepage.
   The public proposal is cinematic and confrontational; the investor case has
   the clarity of a modern financial publication. Trade-off: the two surfaces
   feel deliberately different rather than seamlessly continuous.
   [`01-radical-prospectus.png`](design/2026-07-26-business-proposal-and-investor/01-radical-prospectus.png)
2. **The Human Signal** — strongest emotional identification. Documentary
   imagery and one shared amber signal make proximity and mutual recognition
   immediate, while the investor page remains a disciplined dossier.
   Trade-off: photography quality will materially affect the final result.
   [`02-the-human-signal.png`](design/2026-07-26-business-proposal-and-investor/02-the-human-signal.png)
3. **The Public Square** — clearest strategic explanation of a proximity
   network. The expanding-place motif creates an ownable system for both the
   customer promise and density economics. Trade-off: it is more conceptual
   and less intimate than Passing Glance.
   [`03-the-public-square.png`](design/2026-07-26-business-proposal-and-investor/03-the-public-square.png)

**Selected direction:** The Public Square, approved 2026-07-27.

**Approved image:**
[`03-the-public-square.png`](design/2026-07-26-business-proposal-and-investor/03-the-public-square.png)

The implementation should preserve its spatial, architectural system: midnight
blue, mineral blue, warm amber, parchment, and sparing vermilion; expanding
place-and-density rings; monumental customer-facing typography; and precise
cartographic investor visualisations. The public page creates desire around
mutual recognition in a shared place. The private page distinguishes verified
evidence, internal research, illustrative scenarios, current validation, and
unknown economics.

## Approved visual brief

The eye enters on an immense, warm-gold **Together.** against midnight blue.
Two independent people remain inside a real social atmosphere; a small shared
point of light makes their mutual recognition legible without pretending that
Together creates the connection. The page explains the role plainly: Together
makes the hello easier when the feeling is mutual. The emotional tone is warm,
public, and immediate—not a staged date or a romance-film promise. The closing
line is **Come. Spark. Connect.**; it replaces numbered steps so the hero reads
as one emotional invitation, not an onboarding funnel.

Use the approved hero as the one stable first impression. Do not auto-rotate
hero imagery: a carousel would dilute the visual promise and make the page feel
less decisive. The archived images may inform seasonal creative, campaign
creative, or a manually selected alternative after evidence supports it.

### Communication psychology variants

These variants keep the approved Passing Glance visual fixed and test three
ethical persuasion frames. They use vivid present-tense imagery, contrast, and
processing fluency without fabricated scarcity or social proof.

1. **Look up. They're here.** — makes the face-to-face possibility immediately
   imaginable. Strongest desire and present-tense energy; risk: the support copy
   must make mutuality and the launch-list status explicit.
   [`01-look-up-theyre-here.png`](design/archive/2026-07-24-connection-explorations/communication-psychology-variants/01-look-up-theyre-here.png)
2. **Not a match. A meeting.** — the strongest category contrast and clearest
   statement of the job Together exists to perform. Risk: it begins with the
   incumbent category and **Get up close** may feel overly physical.
   [`02-not-a-match-a-meeting.png`](design/archive/2026-07-24-connection-explorations/communication-psychology-variants/02-not-a-match-a-meeting.png)
3. **Less matching. More meeting.** — easiest to understand for someone arriving
   from dating apps. Risk: it reads as an incremental improvement rather than a
   disruptive new behaviour.
   [`03-less-matching-more-meeting.png`](design/archive/2026-07-24-connection-explorations/communication-psychology-variants/03-less-matching-more-meeting.png)

The recommended synthesis is the emotional hook from variant 1 with explicit
face-to-face product clarity and an honest launch-list CTA.

### Concept boards

The current round contains five directions by explicit user request. Each uses
the same proposition, waitlist-only action, desktop scope, and mobile scope.
They are landing-page decision artifacts, not app or production assets.

1. **The Contract** — severe, outcome-owned, and minimal.
   [`docs/design/2026-07-23-disruptive-landing/01-the-contract.png`](design/2026-07-23-disruptive-landing/01-the-contract.png)
2. **The Red Thread** — emotionally charged and culturally distinctive.
   [`docs/design/2026-07-23-disruptive-landing/02-the-red-thread.png`](design/2026-07-23-disruptive-landing/02-the-red-thread.png)
3. **The Empty Table** — blunt, physical, and intentionally polarising.
   [`docs/design/2026-07-23-disruptive-landing/03-the-empty-table.png`](design/2026-07-23-disruptive-landing/03-the-empty-table.png)
4. **The Convergence** — abstract, premium, and ownable.
   [`docs/design/2026-07-23-disruptive-landing/04-the-convergence.png`](design/2026-07-23-disruptive-landing/04-the-convergence.png)
5. **The Yes Wall** — public, energetic, and launch-movement led.
   [`docs/design/2026-07-23-disruptive-landing/05-the-yes-wall.png`](design/2026-07-23-disruptive-landing/05-the-yes-wall.png)

The earlier calm, ticket, and London-signal round under
`docs/design/2026-07-23-landing/` is superseded. Its ticket direction was
rejected because the visual language resembled a budget airline.

### Shared-place landing direction

The product premise has been corrected for the next visual round: Together is
about a possible mutual introduction between people who are already in the
same public place. The landing page must sell that immediate possibility, not
an arranged future date, a city launch, a reservation, or a conventional dating
app. It intentionally leaves operating mechanics out of scope.

1. **The Café** — ordinary life, warm daylight, and two people already sharing
   a room. Most human and legible; risk: it can look like editorial lifestyle
   advertising rather than a distinctive category.
   [`docs/design/2026-07-23-shared-place-landing/01-the-cafe.png`](design/2026-07-23-shared-place-landing/01-the-cafe.png)
2. **The Same Room** — a public gallery and one stark red line between two
   people looking at the same work. The clearest visual expression of proximity
   and mutual possibility; risk: the venue can feel culturally narrow.
   [`docs/design/2026-07-23-shared-place-landing/02-the-same-room.png`](design/2026-07-23-shared-place-landing/02-the-same-room.png)
3. **The Shared Light** — a public reading hall with a luminous shared space at
   its centre. Most cinematic and ownable; risk: the scale can feel too grand
   for an everyday product.
   [`docs/design/2026-07-23-shared-place-landing/03-the-shared-light.png`](design/2026-07-23-shared-place-landing/03-the-shared-light.png)

No direction is approved. The visual choice should be based on the feeling of
an immediate, voluntary hello in a place both people already share.

#### Public-table variants

This refinement retains the strong, efficient visual grammar of the original
Empty Table: a single table, two places, and one immediate implication. The
asset must now show a lived-in public place and independent presence, rather
than a future reservation.

1. **The Already Here Table** — close, sunny, and visibly public. The setting
   is clearest, but the subjects risk looking like they have already begun a
   date.
   [`docs/design/2026-07-23-public-table-variants/01-the-already-here-table.png`](design/2026-07-23-public-table-variants/01-the-already-here-table.png)
2. **The Long Table** — two people independently occupy the same communal
   table. It preserves the original typographic force while making shared
   presence clear; the strongest direction in this set.
   [`docs/design/2026-07-23-public-table-variants/02-the-long-table.png`](design/2026-07-23-public-table-variants/02-the-long-table.png)
3. **The Table Was Already There** — the most forceful poster image, set in a
   busy public atrium. Its immediate visual tension is strong, but the two
   people still risk reading as an already-arranged meeting.
   [`docs/design/2026-07-23-public-table-variants/03-the-table-was-already-there.png`](design/2026-07-23-public-table-variants/03-the-table-was-already-there.png)

#### Connection-poster variants

This branch keeps the Empty Table's hierarchy—one central visual, a concise
description, email registration, and three steps—but makes the connection the
hero. Social presence is intentionally abstract so the image does not prescribe
the eventual meeting situation.

1. **The Mutual Moment** — two people inside a softened social atmosphere and
   one shared point of light. Emotionally immediate, but it risks feeling too
   close to a conventional love-at-first-sight campaign.
   [`docs/design/2026-07-23-connection-poster-variants/01-the-mutual-moment.png`](design/2026-07-23-connection-poster-variants/01-the-mutual-moment.png)
2. **The Third Form** — two complete sculptural forms make a third vivid space
   between them. Most abstract and ownable, but it needs a more human gesture
   before it can carry the proposition alone.
   [`docs/design/2026-07-23-connection-poster-variants/02-the-third-form.png`](design/2026-07-23-connection-poster-variants/02-the-third-form.png)
3. **Make the Moment Mutual** — two paths converge inside an abstract crowd.
   It most closely retains the original poster's clarity and app description,
   but the visual may be read as wayfinding rather than connection.
   [`docs/design/2026-07-23-connection-poster-variants/03-make-the-moment-mutual.png`](design/2026-07-23-connection-poster-variants/03-make-the-moment-mutual.png)

##### Mutual Moment refinements

These variants retain the emotional force of **The Mutual Moment** while
testing ways to make connection immediate without prescribing a particular
venue, meeting situation, or romance-film narrative.

1. **Tactile Folds** — independent blue and ivory folds converge at a vivid
   shared point against an abstract crowd. Most instantly striking and least
   literal; risk: it may read as a radiant paper fan before the app copy is
   absorbed.
   [`docs/design/2026-07-24-mutual-moment-variants/01-tactile-folds.png`](design/2026-07-24-mutual-moment-variants/01-tactile-folds.png)
2. **Human Recognition** — two people remain independent inside a warm social
   atmosphere, connected by a subtle shared point. Most human; risk: the
   fingertip gesture makes it feel too much like a staged romantic scene.
   [`docs/design/2026-07-24-mutual-moment-variants/02-human-recognition.png`](design/2026-07-24-mutual-moment-variants/02-human-recognition.png)
3. **Shared Space** — two translucent fields make one luminous third opening,
   with people held only at the edges. Clearest metaphor for two complete lives
   making a shared possibility; risk: it has a slightly cinematic quality.
   [`docs/design/2026-07-24-mutual-moment-variants/03-shared-space.png`](design/2026-07-24-mutual-moment-variants/03-shared-space.png)

###### Human Recognition refinements

This round makes **Human Recognition** relatable without turning it into a
staged romantic encounter. The people must remain independent, and the shared
visual gesture must communicate that Together enables a mutual hello rather
than creates the connection itself.

1. **Passing Glance** — a fleeting recognition inside a warm, lived-in crowd.
   The most editorially dramatic; risk: the two figures still look somewhat
   intentionally aligned.
   [`docs/design/2026-07-24-human-recognition-refinements/01-passing-glance.png`](design/2026-07-24-human-recognition-refinements/01-passing-glance.png)
2. **Separate Clusters** — two people remain with separate groups, connected
   only by a small vermilion opening. Strongest expression of mutual possibility
   without a staged meeting; risk: the generated event setting feels somewhat
   aspirational.
   [`docs/design/2026-07-24-human-recognition-refinements/02-separate-clusters.png`](design/2026-07-24-human-recognition-refinements/02-separate-clusters.png)
3. **Everyday Crowd** — a closer, more ordinary social atmosphere with people
   moving around the two figures. Most relatable; risk: it drifts toward a
   conventional dating-ad composition.
   [`docs/design/2026-07-24-human-recognition-refinements/03-everyday-crowd.png`](design/2026-07-24-human-recognition-refinements/03-everyday-crowd.png)

### Empty Table variants

The strongest visual mechanism so far is the Empty Table: two places in the
same physical space, with the platform's promise made tangible before a word
of explanation. This round keeps the page proposition and waitlist-only scope
fixed, varying only the emotional tone of the room.

1. **Afterglow Table** — warm and quietly hopeful, with a shared pool of light.
   Strongest intimacy; risk: it can read too much like restaurant hospitality.
   [`docs/design/2026-07-23-empty-table-variants/01-afterglow-table.png`](design/2026-07-23-empty-table-variants/01-afterglow-table.png)
2. **Midnight Meeting Point** — a night-time public space and a single vivid
   point of convergence. Strongest energy and certainty; risk: it can read as
   nightlife rather than a considered introduction.
   [`docs/design/2026-07-23-empty-table-variants/02-midnight-meeting-point.png`](design/2026-07-23-empty-table-variants/02-midnight-meeting-point.png)
3. **Public Table** — direct daylight, everyday materials, and a single red
   point between two chairs. Clearest civic, real-world invitation; risk: it
   can lean toward a campaign poster.
   [`docs/design/2026-07-23-empty-table-variants/03-public-table.png`](design/2026-07-23-empty-table-variants/03-public-table.png)

No variant is selected yet. The next visual round should preserve the two
chairs and table, while combining the clarity of **Public Table** with the
warmth of **Afterglow Table**.

### Symbolic connection branch

This branch explores a simpler emotional mark: two distinct lives move into
face-to-face proximity and create a new shared possibility. It uses Gestalt
closure and contrast to show transformation without depicting anyone as broken
or incomplete.

1. **A New Story** — two page-like forms create a third shared page.
   Emotionally legible, but the generated profiles are too literal.
   [`docs/design/2026-07-23-symbolic-connection/01-a-new-story.png`](design/2026-07-23-symbolic-connection/01-a-new-story.png)
2. **The Space Between** — two open forms create a meeting symbol through
   negative space. Most suitable as a brand mark, but this version resembles an
   audio or listening symbol.
   [`docs/design/2026-07-23-symbolic-connection/02-the-space-between.png`](design/2026-07-23-symbolic-connection/02-the-space-between.png)
3. **A New Horizon** — proximity creates a shared rising sun. Optimistic, but
   this version risks reading as cliffs or a travel poster.
   [`docs/design/2026-07-23-symbolic-connection/03-a-new-horizon.png`](design/2026-07-23-symbolic-connection/03-a-new-horizon.png)

No direction in this branch is approved. The strongest next exploration is to
combine the emotional clarity of **A New Story** with the abstraction and
small-scale recognisability of **The Space Between**.

#### Refined symbolic round

4. **The Shared Chapter** — two folded forms create a new central page. This is
   the cleanest abstraction of the shared-story idea, but it may also read as
   wings or a conventional open book.
   [`docs/design/2026-07-23-symbolic-connection/04-the-shared-chapter.png`](design/2026-07-23-symbolic-connection/04-the-shared-chapter.png)
5. **The Third Line** — two paths create a third direction. Rejected because
   the result is emotionally cold and resembles punctuation.
   [`docs/design/2026-07-23-symbolic-connection/05-the-third-line.png`](design/2026-07-23-symbolic-connection/05-the-third-line.png)
6. **Mutual Fold** — two balanced forms create a warm centre through proximity.
   It communicates emotion immediately, but the generated heart is too
   conventional to become Together's differentiating symbol.
   [`docs/design/2026-07-23-symbolic-connection/06-mutual-fold.png`](design/2026-07-23-symbolic-connection/06-mutual-fold.png)

The current leading mechanism is not a literal object. It is:

`two complete forms → face-to-face proximity → a third shared form appears`

The next approved exploration should keep that mechanism while removing literal
faces, books, hearts, audio-like brackets, punctuation, and travel landscapes.

## Conversion hypothesis

`mutual_hello` will increase confirmed London launch registrations because the
human scene and “Look up. They’re here.” make shared presence immediately
imaginable, while the support copy explains the mutual, face-to-face job in one
sentence. The page asks for one email and explicitly says that the app has not
been built.

Primary metric:

`launch_interest_confirmed / landing_viewed`

Diagnostic:

`launch_interest_confirmed / launch_interest_submitted`

## Competition-relative position

Together’s category difference is not simply “offline.” It is that the possible
connection is already in the same place. Together makes mutual recognition and
the first hello easier; it does not create a remote matching or messaging loop.

## 50ms design brief

The eye enters on an immense warm-gold **Together.** against midnight blue,
then finds two independent people catching a possible mutual glance inside a
real crowd. The hook, explanation, and email field occupy one decisive screen.
The closing **Come. Spark. Connect.** is an emotional invitation, not a numbered
product tutorial.

## Page boundary

Keep:

- One proposition
- One human connection scene
- One email registration form
- One honest explanation of what the registration controls

Remove:

- Competitor criticism
- Industry manifestos
- Legalistic guarantee details for an unbuilt service; show the outcome
  principle, not unapproved limits or absolute performance claims
- Safety-process detail before the product exists
- Meeting preferences, availability, borough, name, and profile questions
- Testimonials or signup counts until they are real
- Secondary navigation and newsletter framing

## Analytics boundary

Capture:

- `landing_viewed`
- `launch_interest_started`
- `launch_interest_submitted`
- `launch_interest_confirmed`
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
7. Approved eligibility, timing, remedy, and pricing terms before the word
   “guarantee” is used as a public performance claim
