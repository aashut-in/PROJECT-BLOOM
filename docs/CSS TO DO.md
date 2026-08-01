# CSS requirements gathered while writing JS (internal tracking only) scratch tracking file: NOT part of the deliverable.

## From stars.js (04-stars.css)
- .constellation (positioned holder, absolute, small width/height, opacity 0 -> transition on .is-visible)
- .constellation svg (fill/stroke using ivory/warm tones, thin lines)
- .constellation__lines line { stroke, stroke-width, opacity transition }
- .constellation__stars circle { fill }
- .shooting-star (short streak, linear-gradient tail, animation across screen once, animationend removes it)
- keyframe shootingStreak

## From particles.js (05-particles.css + 08-animation.css)
- Remove static `opacity` from .particle-small/medium/large (now animation-driven via --particle-opacity custom prop)
- keyframe driftFloat (08-animation.css): opacity 0 -> var(--particle-opacity) -> var(--particle-opacity) -> 0, transform translateY(from start to -10vh) with translateX wobble via multiple stops using var(--particle-drift-x)
- .particle-petal (small teardrop, rotate, tinted rose) + keyframe petalDrift (falls + rotates, opposite direction to dust: downward not upward)
- body.tab-hidden * { animation-play-state: paused !important; } -> add to 01-base.css

## From sparkle.js (06-intro.css / 08-animation.css)
- reuse existing #intro-sparkle rays; need a class toggle e.g. .is-active on #intro-sparkle to trigger keyframe introSparkle already defined in 08-animation.css (currently unused by any JS!)
- confirm keyframe introSparkle already exists - YES in 08-animation.css already. Just need JS to add a class that triggers it, e.g. `.play` { animation: introSparkle Xms ease-out forwards; }

## From intro.js
- nothing new, reuses #intro-text/.rise/.fade-out already defined

## From flowers.js + bouquet.js (new: css for stems/leaves/petals per species)
- .flower, .flower__stem (stroke-dasharray driven via JS, not CSS)
- .flower__leaf transform-origin via inline style (per instance), CSS just sets initial scale(0)/opacity 0 and transition handled by WAAPI (so maybe minimal CSS needed beyond base positioning)
- .bouquet-stem-wrapper (positioning per instance via inline left/bottom/height/rotation)
- .ribbon (positioning + gentle fade/settle)
- idle sway class .bouquet-stem--sway using keyframe `sway` already defined (needs per-instance randomized duration/delay via inline style, and different amplitude - keyframe uses fixed -1deg/1deg; I may need a custom-property-driven version: swayVar using var(--sway-deg))
- .story-caption (06-intro.css) two-line reveal, similar treatment to intro-text but smaller
- #dedication + .dedication__line (06-intro.css), rose-tinted color variant

## From firefly.js
- #firefly svg fill etc, .firefly--visible, keyframe fireflyGlow pulse
- #letter note card styling (07-effects.css or new section in 06-intro.css) - "not a modal", soft unfold, close button, Caveat font
- sound-toggle button styling (07-effects.css), position (02-layout.css or 09-responsive)

## General
- @font-face / Google Fonts link in index.html head; font-family vars already in 01-base.css referencing "Cormorant Garamond"/"Inter"/"Caveat" - keep, just need actual <link> import
- favicon: add a tiny inline data-uri favicon link to silence 404, per spec section 31 remark ("You may add a favicon or remove the request if appropriate")