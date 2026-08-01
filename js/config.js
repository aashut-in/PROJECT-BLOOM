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
    // Kept here too because a few colours (flower fills,
    // the hidden-letter ink) are set directly from JavaScript
    // rather than through a CSS class.
    //--------------------------------------------------------

    COLOR: {

        night:        "#09090F",
        ivory:        "#F5F1E8",

        starWarm:     "#FFF6D8",
        starCool:     "#E6F4FF",
        champagne:    "#FFEFD5",

        tulipBlush:   "#F3B6C6",
        tulipPeach:   "#F0C7A8",
        tulipRose:    "#E2879C",

        lilyCream:    "#FBF4E7",
        lilyBlush:    "#F3D9DC",

        lavender:     "#B6A5D6",
        lavenderDeep: "#9A88C0",

        babysBreath:  "#F7F1E9",

        rose:         "#D98CA1",

        leaf:         "#5E7C55",
        leafDeep:     "#3E5A3B",

        ribbon:       "#D9A0AC",
        dedication:   "#E9B7C3"

    },

    //--------------------------------------------------------
    // Night Sky
    //--------------------------------------------------------

    SKY: {

        // How many stars live in each depth layer.
        STAR_COUNTS: {
            far:  150,
            mid:  75,
            near: 30
        },

        // Every named star is a possible "hero" —
        // the ones occasionally allowed to sparkle.
        // Naming them is a small, private detail; nobody
        // else will ever see these words.
        HERO_STAR_NAMES: [
            "Hope",
            "Promise",
            "Dream",
            "Distance",
            "Home"
        ],

        // Weighted so warm tones dominate — the sky should
        // feel warm-blooded, not clinical.
        STAR_COLOR_WEIGHTS: [
            { value: "warm",      weight: 48 },
            { value: "ivory",     weight: 30 },
            { value: "cool",      weight: 15 },
            { value: "champagne", weight: 7  }
        ],

        // Below this width, thin out the star count a little.
        // A phone repainting 260 twinkling elements every
        // frame is how gentle magic turns into a choppy mess.
        REDUCED_STAR_SCALE_BELOW: 480,
        REDUCED_STAR_SCALE: 0.6

    },

    //--------------------------------------------------------
    // Ambient Hero-Star Sparkles
    //
    // The recurring, randomly-timed "celestial wink" —
    // not to be confused with ORIGIN_SPARKLE below, which is
    // the one specific, story-critical sparkle.
    //--------------------------------------------------------

    HERO_SPARKLE: {
        MIN_DELAY: 5000,
        MAX_DELAY: 12000,
        DURATION: 700,
        MAX_CONCURRENT: 1
    },

    //--------------------------------------------------------
    // The Origin Sparkle
    //
    // The single sparkle that bridges the opening wish and
    // the first stem. It happens exactly once per visit.
    //--------------------------------------------------------

    ORIGIN_SPARKLE: {
        DELAY_AFTER_INTRO:  500,
        GROW_DURATION:      1700,
        HOLD_DURATION:      550,
        SETTLE_DURATION:    900
    },

    //--------------------------------------------------------
    // Intro
    //--------------------------------------------------------

    INTRO: {
        TEXT:               "I wanted to give you flowers…",
        SILENCE_BEFORE:      1000,
        FADE_IN_DURATION:    2500,
        HOLD_DURATION:       4500,
        FADE_OUT_DURATION:   2200
    },

    //--------------------------------------------------------
    // Story Captions
    //
    // These two lines answer each other and are read as one
    // sentence, so the second joins the first rather than
    // replacing it. See docs/ART_DIRECTION.md, rule 02.
    //--------------------------------------------------------

    STORY: {
        DISTANCE_LINE:       "Can't place these in your hands yet…",
        ANSWER_LINE:         "so I made them bloom on your screen.",
        DISTANCE_AT_PROGRESS: 0.35, // reveal once ~35% of stems have begun
        LINE_FADE_DURATION:  1300
    },

    //--------------------------------------------------------
    // Final Dedication
    //--------------------------------------------------------

    DEDICATION: {
        LINE_1: "A bouquet that will never wilt. 🌷",
        LINE_2: "For My Love, with all my love.",
        DELAY_AFTER_BOUQUET:  1600,
        DELAY_BETWEEN_LINES:  600,
        FADE_DURATION:        1700
    },

    //--------------------------------------------------------
    // Atmospheric Particles
    //--------------------------------------------------------

    PARTICLES: {
        COUNT:          45,
        BLOOM_BOOST:    16,   // extra particles once the garden wakes
        SIZE_MIN:       1,
        SIZE_MAX:       3,
        DRIFT_MIN:      15,   // seconds for one slow vertical drift
        DRIFT_MAX:      35,
        SWAY_WIDTH:     18    // px of gentle horizontal wander
    },

    //--------------------------------------------------------
    // Bouquet
    //--------------------------------------------------------

    BOUQUET: {
        STEM_STAGGER_MIN:        90,
        STEM_STAGGER_MAX:        260,
        STEM_GROW_MIN:           1900,
        STEM_GROW_MAX:           2500,
        LEAF_UNFOLD_DURATION:    900,
        BLOOM_DELAY_AFTER_STEM:  350,
        BLOOM_DURATION_MIN:      1100,
        BLOOM_DURATION_MAX:      1700,
        SWAY_DEGREES:            1.6,
        SWAY_DURATION_MIN:       5000,
        SWAY_DURATION_MAX:       9000
    },

    //--------------------------------------------------------
    // Firefly + Hidden Letter
    //--------------------------------------------------------

    FIREFLY: {
        ENTER_DELAY_AFTER_DEDICATION: 2400,
        DRIFT_DURATION_MIN:  9000,
        DRIFT_DURATION_MAX:  15000,
        PAUSE_MIN:           2500,
        PAUSE_MAX:           5000,
        GLOW_PULSE_MIN:      2600,
        GLOW_PULSE_MAX:      4200
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
        SPARKLE_VOLUME:   0.30,
        FADE_DURATION:    1800
    },

    //--------------------------------------------------------
    // Flower Assets
    //
    // Each is fetched once, cached, then cloned per stem —
    // see js/scene/flowers.js.
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
    // Future Magic Moments (Section 19)
    //
    // Off by default so an unfinished idea never dilutes the
    // first visit. Flip a flag on only once that moment has
    // actually been built and reviewed against the emotional
    // brief — not merely coded.
    //--------------------------------------------------------

    FUTURE: {
        CONSTELLATION_SURPRISE: true,   // implemented — rare + subtle
        SHOOTING_STAR:          true,   // implemented — passes behind bouquet
        RETURN_VISITS:          false,  // hook only, not yet designed
        TIME_AWARE_GREETING:    false,  // hook only, not yet designed
        RARE_RAIN:              false   // hook only, not yet designed
    }

};
