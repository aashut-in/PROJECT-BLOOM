/*============================================================

    Project Bloom
    File: sparkle.js

    Purpose
    -------
    The single, story-critical sparkle that bridges the
    opening wish and the first stem. Happens exactly once per
    visit. Not to be confused with the recurring ambient hero
    sparkles in stars.js.

    Sequence (brief, section 8)
    ----------------------------
    Small point → soft glow → four rays expand → brief peak
    → glow softens → the first stem begins to grow.

=============================================================*/


//============================================================
// Imports
//============================================================

import { CONFIG } from "../config.js";

import {
    $,
    setVars,
    prefersReducedMotion
} from "../utils/helpers.js";

import { playSparkleSound } from "./audio.js";


//============================================================
// Private Variables
//============================================================

let sparkleEl = null;


//============================================================
// Initialise Sparkle
//============================================================

/**
 * Entry point. Simply confirms the element exists — playing
 * it is a deliberate, separate step timeline.js takes once
 * the opening line has had time to settle.
 */

export function initSparkle() {

    sparkleEl = $("#intro-sparkle");

    if (!sparkleEl) {
        console.error("Project Bloom: #intro-sparkle not found.");
    }

}


//============================================================
// Play First Sparkle
//============================================================

/**
 * Returns a Promise that resolves once the sparkle has
 * finished, so timeline.js can begin growing the first stem
 * right as the glow settles rather than on a guessed delay.
 *
 * With reduced motion, the sparkle simply appears at rest —
 * the story still moves forward, just without the flare.
 */

export function playFirstSparkle() {

    return new Promise(resolve => {

        if (!sparkleEl) {
            resolve();
            return;
        }

        if (prefersReducedMotion()) {
            sparkleEl.style.opacity = "1";
            resolve();
            return;
        }

        setVars(sparkleEl, {
            "--sparkle-duration": `${CONFIG.SPARKLE.GROW_DURATION}ms`
        });

        playSparkleSound();

        sparkleEl.classList.add("sparkle-play");

        const onDone = () => {

            sparkleEl.removeEventListener("animationend", onDone);

            // Leave a faint, permanently-settled glow behind —
            // the moment shouldn't erase itself completely,
            // it should simply stop demanding attention.
            sparkleEl.classList.remove("sparkle-play");
            sparkleEl.classList.add("sparkle-settled");

            setTimeout(resolve, CONFIG.SPARKLE.HOLD_DURATION);

        };

        sparkleEl.addEventListener("animationend", onDone);

    });

}