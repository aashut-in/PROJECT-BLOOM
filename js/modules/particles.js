/*============================================================

    Project Bloom
    File: particles.js

    Purpose
    -------
    Fills the air with extremely subtle floating particles —
    pollen, dust, soft magical specks. Almost unnoticed at
    first; their job is to make the air feel alive, not to be
    seen directly.

    Philosophy
    ----------
    Particles never move in straight lines.
    (docs/ART_DIRECTION.md, Rule 04)

=============================================================*/


//============================================================
// Imports
//============================================================

import { CONFIG } from "../config.js";

import {
    createElement,
    append,
    setVars,
    prefersReducedMotion
} from "../utils/helpers.js";

import {
    random,
    randomItem
} from "../utils/random.js";


//============================================================
// Constants
//============================================================

// Weighted toward small — a sky full of medium/large motes
// would read as snow, not dust.
const SIZE_CLASSES = [
    "particle-small", "particle-small", "particle-small",
    "particle-medium", "particle-medium",
    "particle-large"
];

const DEPTH_CLASSES = ["particle-far", "particle-mid", "particle-near"];


//============================================================
// Private Variables
//============================================================

let atmosphere = null;
let awake = false;


//============================================================
// Initialise Particles
//============================================================

/**
 * Entry point. Called once by timeline.js alongside the rest
 * of the "living night" (Phase 2).
 */

export function initParticles() {

    atmosphere = document.getElementById("atmosphere");

    if (!atmosphere) {
        console.error("Project Bloom: #atmosphere container not found.");
        return;
    }

    atmosphere.innerHTML = "";

    if (prefersReducedMotion()) {
        // A drifting field is exactly the kind of motion this
        // preference asks us to remove — the atmosphere stays
        // dark and still instead.
        return;
    }

    spawnParticles(CONFIG.PARTICLES.COUNT);

}


//============================================================
// Spawn Particles
//============================================================

function spawnParticles(count) {

    for (let i = 0; i < count; i++) {

        append(atmosphere, createSingleParticle());

    }

}


//============================================================
// Create One Particle
//============================================================

function createSingleParticle() {

    const element = createElement("div");

    element.classList.add(
        "particle",
        randomItem(SIZE_CLASSES),
        randomItem(DEPTH_CLASSES)
    );

    const duration = random(CONFIG.PARTICLES.DRIFT_MIN, CONFIG.PARTICLES.DRIFT_MAX);
    const width = CONFIG.PARTICLES.SWAY_WIDTH;

    element.style.left = `${random(0, 100)}%`;
    element.style.top = `${random(0, 100)}%`;

    setVars(element, {

        "--drift-duration": `${duration}s`,

        // Negative delay = "pretend this cycle already began
        // N seconds ago", so particles are mid-drift the
        // instant the page loads instead of all fading in
        // from nothing together.
        "--drift-delay": `${-random(0, duration)}s`,

        // Three independent horizontal wobble stops — this is
        // what keeps the path from ever reading as a straight
        // line or a simple sideways sway.
        "--drift-x1": `${random(-width, width)}px`,
        "--drift-x2": `${random(-width, width)}px`,
        "--drift-x3": `${random(-width, width)}px`,
        "--drift-x4": `${random(-width * 0.6, width * 0.6)}px`

    });

    return element;

}


//============================================================
// Awaken Atmosphere
//============================================================

/**
 * "The particles should become slightly more noticeable as
 * the flowers begin to grow, as though the garden is waking."
 * (Brief, section 6.) Called once by timeline.js right as the
 * first stem begins.
 */

export function awakenAtmosphere() {

    if (!atmosphere || awake) return;

    awake = true;

    atmosphere.classList.add("atmosphere--awake");

    if (!prefersReducedMotion()) {
        spawnParticles(CONFIG.PARTICLES.BLOOM_BOOST);
    }

}