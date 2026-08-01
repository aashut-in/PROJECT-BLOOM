/*============================================================

    Project Bloom
    File: config.js

    Purpose
    -------
    Central configuration for the entire project.
    Every tunable value, timing and piece of copy lives here —
    animation files should read numbers from CONFIG, never
    invent their own.

    If you want to slow the bouquet down, change the wording,
    or swap a colour, this is almost always the only file
    you need to open.

=============================================================*/

export const CONFIG = {

    //--------------------------------------------------------
    // Colour Palette
    //
    // Mirrors the CSS custom properties in css/01-base.css.
    // Kept here too because a few colours (star tints, the
    // hidden-letter ink) are chosen randomly or conditionally
    // from JavaScript rather than through a fixed CSS class.
    //--------------------------------------------------------

    COLOR: {

        night:        "#09090F",
        ivory:        "#F5F1E8",

        starWarm:     "#FFF6D8",
        starCool:     "#E6F4FF",
        champagne:    "#FFEFD5"

    },

    //--------------------------------------------------------
    // Night Sky
    //--------------------------------------------------------

    SKY: {

        // Total star count across all three depth layers.
        // Split proportionally by STAR_LAYER_RATIOS below.
        STAR_COUNT: 260,

        STAR_LAYER_RATIOS: {
            far:  0.58,
            mid:  0.29,
            near: 0.13
        },

        // Every named star is a possible "hero" — the ones
        // occasionally allowed to sparkle. Naming them is a
        // small, private detail; nobody else will ever read
        // these words, but they were chosen on purpose.
        HERO_STAR_NAMES: [
            "Hope",
            "Promise",
            "Dream",
            "Distance",
            "Home"
        ],

        // Weighted so warm tones dominate — the sky should
        // feel warm-blooded, not clinical. Values map onto
        // CONFIG.COLOR above inside stars.js.
        STAR_COLOR_WEIGHTS: [
            { value: "warm",      weight: 48 },
            { value: "ivory",     weight: 30 },
            { value: "cool",      weight: 15 },
            { value: "champagne", weight: 7  }
        ],

        // Below this width, thin the star count a little — a
        // phone repainting hundreds of twinkling elements
        // every frame is how gentle magic turns into a
        // choppy mess.
        REDUCED_STAR_SCALE_BELOW: 480,
        REDUCED_STAR_SCALE: 0.62,

        // Restrained desktop-only pointer parallax.
        // Disabled entirely on touch devices and whenever
        // reduced motion is requested.
        PARALLAX_MAX_SHIFT_FAR:  4,
        PARALLAX_MAX_SHIFT_MID:  8,
        PARALLAX_MAX_SHIFT_NEAR: 13

    },

    //--------------------------------------------------------
    // Ambient Hero-Star Sparkles
    //
    // The recurring, randomly-timed "celestial wink" — not to
    // be confused with the first sparkle in SPARKLE below,
    // which is the one specific, story-critical moment.
    //--------------------------------------------------------

    HERO_SPARKLE: {
        MIN_DELAY: 5000,
        MAX_DELAY: 12000,
        DURATION:  760
    },

    //--------------------------------------------------------
    // The First Sparkle
    //
    // The single sparkle that bridges the opening wish and
    // the first stem (docs/MOMENTS.md, Moment #01). It
    // happens exactly once per visit.
    //--------------------------------------------------------

    SPARKLE: {
        DELAY_AFTER_INTRO: 500,
        GROW_DURATION:      1800,
        HOLD_DURATION:      450
    },

    //--------------------------------------------------------
    // Intro
    //--------------------------------------------------------

    INTRO: {
        TEXT:              "I wanted to give you flowers…",
        SILENCE_BEFORE:     1000,
        FADE_IN_DURATION:   2500,
        HOLD_DURATION:      4500,
        FADE_OUT_DURATION:  1300
    },

    //--------------------------------------------------------
    // Story Captions
    //
    // These two lines answer each other and are read as one
    // sentence, so the second joins the first rather than
    // replacing it. See docs/ART_DIRECTION.md, rule 02.
    //--------------------------------------------------------

    STORY: {
        DISTANCE_TEXT:          "Can't place these in your hands yet…",
        ANSWER_TEXT:            "so I made them bloom on your screen.",
        DISTANCE_DELAY_AFTER_STEMS: 1700,   // from the moment the first stem begins
        DISTANCE_HOLD:              3200,
        ANSWER_HOLD:                 3600,
        LINE_FADE_DURATION:          1300
    },

    //--------------------------------------------------------
    // Final Dedication
    //--------------------------------------------------------

    DEDICATION: {
        LINE_1: "A bouquet that will never wilt. 🌷",
        LINE_2: "For My Love, with all my love.",
        DELAY_AFTER_BOUQUET:  900,
        DELAY_BETWEEN_LINES:  650,
        FADE_DURATION:        1700,
        GLOW_FADE_DURATION:   2600
    },

    //--------------------------------------------------------
    // Atmospheric Particles
    //--------------------------------------------------------

    PARTICLES: {
        COUNT:          44,
        BLOOM_BOOST:    14,   // extra particles once the garden wakes
        SIZE_MIN:       1,
        SIZE_MAX:       3,
        DRIFT_MIN:      16,   // seconds for one slow vertical drift
        DRIFT_MAX:      34,
        SWAY_WIDTH:     22    // px of gentle horizontal wander (never a straight line)
    },

    //--------------------------------------------------------
    // Bouquet
    //--------------------------------------------------------

    BOUQUET: {

        STEM_STAGGER_MIN:        90,
        STEM_STAGGER_MAX:        260,
        STEM_GROW_MIN:           1900,
        STEM_GROW_MAX:           2500,

        LEAF_START_FRACTION:     0.45,  // leaves begin partway through stem growth
        LEAF_UNFOLD_DURATION:    900,

        BLOOM_DELAY_AFTER_STEM:  300,
        BLOOM_DURATION_MIN:      1100,
        BLOOM_DURATION_MAX:      1700,
        PETAL_STAGGER:           90,

        SWAY_DEGREES_MIN:        1.1,
        SWAY_DEGREES_MAX:        1.8,
        SWAY_DURATION_MIN:       5200,
        SWAY_DURATION_MAX:       9200,

        // Hand-composed arrangement. Small per-instance jitter
        // (rotation, height, timing) is layered on top of these
        // base values at runtime — see js/scene/bouquet.js.
        // x: 0-100, percentage across the bouquet's own width.
        // heightScale: multiplier on that flower type's natural
        // stem length in its SVG.
        COMPOSITION: [
            { type: "lily",        colorVariant: "cream", x: 42, heightScale: 1.05, rotation: -3  },
            { type: "lily",        colorVariant: "blush", x: 64, heightScale: 0.94, rotation:  4  },
            { type: "tulip",       colorVariant: "peach", x: 35, heightScale: 1.0,  rotation: -2  },
            { type: "tulip",       colorVariant: "blush", x: 22, heightScale: 0.86, rotation: -7  },
            { type: "tulip",       colorVariant: "rose",  x: 58, heightScale: 0.9,  rotation:  3  },
            { type: "tulip",       colorVariant: "peach", x: 77, heightScale: 0.82, rotation:  8  },
            { type: "rose",        colorVariant: "dusty", x: 50, heightScale: 0.66, rotation:  1  },
            { type: "lavender",    colorVariant: "muted", x: 15, heightScale: 0.88, rotation: -9  },
            { type: "lavender",    colorVariant: "deep",  x: 29, heightScale: 0.74, rotation: -5  },
            { type: "lavender",    colorVariant: "muted", x: 86, heightScale: 0.9,  rotation:  9  },
            { type: "babysBreath", colorVariant: "ivory", x: 10, heightScale: 0.7,  rotation: -11 },
            { type: "babysBreath", colorVariant: "ivory", x: 46, heightScale: 1.08, rotation:  0  },
            { type: "babysBreath", colorVariant: "ivory", x: 70, heightScale: 0.8,  rotation:  6  },
            { type: "babysBreath", colorVariant: "ivory", x: 91, heightScale: 0.68, rotation: 11  },
            { type: "babysBreath", colorVariant: "ivory", x: 38, heightScale: 0.6,  rotation: -3  }
        ]

    },

    //--------------------------------------------------------
    // Ribbon
    //--------------------------------------------------------

    RIBBON: {
        DELAY_AFTER_LAST_BLOOM: 350,
        FADE_DURATION:          1400
    },

    //--------------------------------------------------------
    // Firefly + Hidden Letter
    //--------------------------------------------------------

    FIREFLY: {
        ENTER_DELAY_AFTER_DEDICATION: 2600,
        ENTER_DURATION:       2200,
        DRIFT_DURATION_MIN:   9000,
        DRIFT_DURATION_MAX:   15000,
        PAUSE_MIN:            2500,
        PAUSE_MAX:            5000,
        GLOW_PULSE_MIN:       2600,
        GLOW_PULSE_MAX:       4200,
        // How close (px) a tap/click needs to land to count,
        // in addition to its own hit area — keeps the firefly
        // easy to catch on touch screens.
        TOUCH_FORGIVENESS_PX: 18
    },

    LETTER: {
        TEXT: "Until I can give you real flowers, let these remind you that distance has never stopped me from wanting to make you smile."
    },

    //--------------------------------------------------------
    // Audio
    //
    // Silent by default. A visitor must choose sound.
    //--------------------------------------------------------

    AUDIO: {
        AMBIENCE_SRC:     "assets/audio/ambience.mp3",
        SPARKLE_SRC:      "assets/audio/sparkle.mp3",
        AMBIENCE_VOLUME:  0.32,
        SPARKLE_VOLUME:   0.3,
        FADE_DURATION:    1800
    },

    //--------------------------------------------------------
    // Flower + Icon Assets
    //
    // Each is fetched once, cached, then cloned per stem —
    // see js/scene/flowers.js and js/scene/firefly.js.
    //--------------------------------------------------------

    FLOWER_ASSETS: {
        tulip:       "assets/svg/tulip.svg",
        lily:        "assets/svg/lily.svg",
        lavender:    "assets/svg/lavender.svg",
        babysBreath: "assets/svg/baby's-breath.svg",
        rose:        "assets/svg/rose.svg"
    },

    ICON_ASSETS: {
        firefly: "assets/icons/firefly.svg",
        ribbon:  "assets/icons/ribbon.svg"
    },

    //--------------------------------------------------------
    // Responsive
    //--------------------------------------------------------

    MOBILE_BREAKPOINT: 768,

    //--------------------------------------------------------
    // Future Magic Moments (README section 19)
    //
    // Off by default so an unfinished idea never dilutes the
    // first visit. Flip a flag on only once that moment has
    // actually been built and reviewed against the emotional
    // brief — not merely coded.
    //
    // SHOOTING_STAR_ON_IDLE is fully implemented and dormant
    // — see triggerShootingStar() in js/modules/stars.js — it
    // simply isn't called by anything while this is false.
    //--------------------------------------------------------

    FUTURE: {
        CONSTELLATION_SURPRISE: false,  // hook: js/modules/stars.js
        SHOOTING_STAR_ON_IDLE:  false,  // hook: js/modules/stars.js → triggerShootingStar()
        RETURN_VISITS:          false,  // hook: js/timeline.js — needs localStorage design
        TIME_AWARE_GREETING:    false,  // hook: js/modules/intro.js
        RARE_RAIN:               false  // hook: new js/modules/rain.js (not yet started)
    }

};