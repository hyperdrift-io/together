# Recraft model benchmark — Public Square

**Date:** 2026-07-27

## Purpose

Select the Recraft raster model that best serves Together's approved Public
Square asset direction before generating the three final visual variations.

## Controlled inputs

- Identical prompt: [`PROMPT.txt`](PROMPT.txt)
- Identical aspect ratio: `16:9`
- Identical seed: `20260727`
- Identical preferred palette:
  - midnight `#061521` at `0.35`
  - gold `#f4b544` at `0.30`
  - vermilion `#ef4a24` at `0.15`
  - paper `#fffaf0` at `0.15`
- Identical preferred background: midnight `#061521`
- No prompt enhancement
- Standard models use their native 1MP `16:9` size (`1344x768`)
- Pro models use their native 4MP `16:9` size (`2688x1536`)

## Models

1. `recraftv4` — previous script default and benchmark baseline
2. `recraftv4_1` — current expressive model
3. `recraftv4_1_utility` — current predictable model
4. `recraftv4_1_pro` — expressive 4MP production model
5. `recraftv4_1_utility_pro` — predictable 4MP production model

The first pass deliberately uses text-to-image to compare base composition and
prompt following. Because all five models over-literalised the central pair,
the two Pro finalists also receive a controlled image-to-image correction using
[`REFINEMENT_PROMPT.txt`](REFINEMENT_PROMPT.txt), identical strength, seed, and
brand controls.

## Evaluation criteria

1. **50ms focal point:** two people and one shared opening are unmistakable.
2. **Mission fidelity:** already sharing one public place, not arranging a date.
3. **Mutuality without exposure:** neither person looks tracked or singled out.
4. **Emotional force:** hopeful, public, and immediate without romance clichés.
5. **Brand control:** navy, gold, paper, and restrained vermilion feel native.
6. **Responsive resilience:** the core meaning survives desktop and mobile crops.
7. **Production quality:** people, architecture, texture, and light hold up.

## Decision

- Recommended exploration model: **`recraftv4_1`**
- Recommended production model: **`recraftv4_1_pro`**

### Why

`recraftv4_1_pro` produced the strongest atmosphere, crowd texture,
architectural believability, focal contrast, and responsive composition. Its
1MP counterpart retained the same expressive character at a much lower
iteration cost, making `recraftv4_1` the right model for concept exploration.

The production workflow should therefore be:

1. Explore several compositions with `recraftv4_1`.
2. Select the visual idea rather than merely the prettiest render.
3. Generate the approved composition with `recraftv4_1_pro`.
4. Crop and compress the final asset for responsive delivery.

### Rejected defaults

- **`recraftv4`:** a strong focal circle, but more synthetic people and
  architecture than V4.1. It should no longer be the workspace default.
- **`recraftv4_1_utility`:** predictable but visually flatter; it did not
  improve the central human relationship.
- **`recraftv4_1_utility_pro`:** detailed but over-literal. It turned the warm
  square into a bright stage and reinforced a conventional couple reading.

### Image-to-image finding

Image-to-image is now supported by the workspace script, but it should preserve
an approved composition or palette—not repair subtle social meaning. At the
same seed and `0.60` strength:

- expressive Pro replaced the central pair with a sculptural object
- Utility Pro created an even more explicit couple

For Together, semantic corrections such as “independent people in separate
clusters” require a new composition prompt. They should not be delegated to a
reference refinement after the wrong relationship is already present.

### Critical result

No benchmark output is approved as a Together production asset. All five
text-to-image models over-literalised the central pair. The model decision is
complete; the next three Public Square variations should reduce literal human
staging and make the shared public field—not a spotlighted couple—the dominant
metaphor.
