/*============================================================

    Project Bloom
    File: intro.js

    Purpose
    -------
    Owns every narrative line of text in the experience —
    the opening wish, the distance line, its answer, and the
    final dedication — not just the intro. One shared "story
    slot" in the layout, one line visible at a time, so the
    copy never overflows or collides with the bouquet on a
    small screen.

    Each line follows the same rhythm:
    reveal → hold → conceal. That rhythm is what "silence is
    part of the animation" (docs/ART_DIRECTION.md) actually
    looks like in code.

=============================================================*/


//============================================================
// Imports
//============================================================

import { CONFIG } from "../config.js";
import { $, wait } from "../utils/helpers.js";


//============================================================
// Private Variables
//============================================================

let introTextEl = null;
let distanceEl = null;
let answerEl = null;
let finaleLine1El = null;
let finaleLine2El = null;


//============================================================
// Initialise Intro
//============================================================

export function initIntro() {

    introTextEl  = $("#intro-text");
    distanceEl   = $("#distance-text");
    answerEl     = $("#answer-text");
    finaleLine1El = $("#finale-line-1");
    finaleLine2El = $("#finale-line-2");

    const missing = [
        ["#intro-text", introTextEl],
        ["#distance-text", distanceEl],
        ["#answer-text", answerEl],
        ["#finale-line-1", finaleLine1El],
        ["#finale-line-2", finaleLine2El]
    ].filter(([, el]) => !el);

    if (missing.length) {
        console.error(
            "Project Bloom: missing story elements —",
            missing.map(([name]) => name).join(", ")
        );
    }

    // INTRO.TEXT / STORY.* / DEDICATION.* in config.js hold
    // the same copy already sitting in index.html. They exist
    // so timing code has something to reference without
    // reaching into textContent — the HTML remains the single
    // place to actually edit the words themselves.

}


//============================================================
// Reveal / Conceal (shared rhythm)
//============================================================

function revealLine(el, durationMs) {

    return new Promise(resolve => {

        if (!el) { resolve(); return; }

        el.classList.remove("fade-out", "hidden");

        if (durationMs) {
            el.style.setProperty("animation-duration", `${durationMs}ms`);
        }

        // Force a reflow so a line being shown for a second
        // time (were the page ever replayed) restarts its
        // animation instead of the browser silently no-op'ing
        // a class that's technically "already there".
        void el.offsetWidth;

        el.classList.add("rise");

        const onDone = () => {
            el.removeEventListener("animationend", onDone);
            resolve();
        };

        el.addEventListener("animationend", onDone);

    });

}

function concealLine(el, durationMs) {

    return new Promise(resolve => {

        if (!el) { resolve(); return; }

        el.classList.remove("rise");

        if (durationMs) {
            el.style.setProperty("animation-duration", `${durationMs}ms`);
        }

        void el.offsetWidth;

        el.classList.add("fade-out");

        const onDone = () => {
            el.removeEventListener("animationend", onDone);
            el.classList.add("hidden");
            el.classList.remove("fade-out");
            resolve();
        };

        el.addEventListener("animationend", onDone);

    });

}


//============================================================
// Opening Line — "I wanted to give you flowers…"
//============================================================

export async function playOpeningLine() {

    await revealLine(introTextEl, CONFIG.INTRO.FADE_IN_DURATION);

    await wait(CONFIG.INTRO.HOLD_DURATION);

    await concealLine(introTextEl, CONFIG.INTRO.FADE_OUT_DURATION);

}


//============================================================
// Distance Line — "Can't place these in your hands yet…"
//============================================================

export async function playDistanceLine() {

    await revealLine(distanceEl, CONFIG.STORY.LINE_FADE_DURATION);

    await wait(CONFIG.STORY.DISTANCE_HOLD);

    await concealLine(distanceEl, CONFIG.STORY.LINE_FADE_DURATION);

}


//============================================================
// Answer Line — "so I made them bloom on your screen."
//============================================================

export async function playAnswerLine() {

    await revealLine(answerEl, CONFIG.STORY.LINE_FADE_DURATION);

    await wait(CONFIG.STORY.ANSWER_HOLD);

    await concealLine(answerEl, CONFIG.STORY.LINE_FADE_DURATION);

}


//============================================================
// Finale — the resting, permanent ending state
//============================================================

/**
 * Unlike the three lines above, the finale is never concealed
 * again — it's where the story comes to rest.
 */

export async function playFinale() {

    await revealLine(finaleLine1El, CONFIG.DEDICATION.FADE_DURATION);

    await wait(CONFIG.DEDICATION.DELAY_BETWEEN_LINES);

    await revealLine(finaleLine2El, CONFIG.DEDICATION.FADE_DURATION);

}