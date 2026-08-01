/*============================================================

    Project Bloom
    File: easing.js

    Purpose
    -------
    Animation easing functions.

    Every visual movement in Project Bloom
    should pass through these functions.

=============================================================*/


//============================================================
// Linear
//============================================================

export function linear(t) {

    return t;

}


//============================================================
// Ease In Quad
//============================================================

export function easeInQuad(t) {

    return t * t;

}


//============================================================
// Ease Out Quad
//============================================================

export function easeOutQuad(t) {

    return t * (2 - t);

}


//============================================================
// Ease In Out Quad
//============================================================

export function easeInOutQuad(t) {

    return t < 0.5

        ? 2 * t * t

        : -1 + (4 - 2 * t) * t;

}


//============================================================
// Ease In Cubic
//============================================================

export function easeInCubic(t) {

    return t * t * t;

}


//============================================================
// Ease Out Cubic
//============================================================

export function easeOutCubic(t) {

    return 1 - Math.pow(1 - t, 3);

}


//============================================================
// Ease In Out Cubic
//============================================================

export function easeInOutCubic(t) {

    return t < 0.5

        ? 4 * t * t * t

        : 1 - Math.pow(-2 * t + 2, 3) / 2;

}


//============================================================
// Ease Out Quart
//============================================================

export function easeOutQuart(t) {

    return 1 - Math.pow(1 - t, 4);

}


//============================================================
// Ease Out Quint
//============================================================

export function easeOutQuint(t) {

    return 1 - Math.pow(1 - t, 5);

}


//============================================================
// Gentle Bloom
//============================================================

/*
    Used for:

    • Flower opening
    • Leaf unfolding
    • Stem growth

*/

export function bloom(t) {

    return easeOutQuint(t);

}


//============================================================
// Gentle Drift
//============================================================

/*
    Used for:

    • Pollen
    • Fireflies
    • Floating particles

*/

export function drift(t) {

    return easeInOutQuad(t);

}


//============================================================
// Soft Fade
//============================================================

/*
    Used for:

    • Intro
    • Messages
    • Hidden letter

*/

export function fade(t) {

    return easeOutCubic(t);

}


//============================================================
// Sparkle Pulse
//============================================================

/*
    Used for:

    • Hero stars
    • Tiny sparkles

*/

export function sparkle(t) {

    return Math.sin(t * Math.PI);

}