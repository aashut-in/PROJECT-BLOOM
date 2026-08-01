/*============================================================

    Project Bloom
    File: stars.js

    Purpose
    -------
    Creates and manages the night sky: layered stars,
    independent twinkles, occasional hero-star sparkles,
    and two rare "future magic" moments — a constellation
    that quietly forms a heart, and a shooting star that
    always stays behind the bouquet.

    Philosophy
    ----------
    The sky should never demand attention.
    It exists to hold the story.
    (docs/ART_DIRECTION.md)

=============================================================*/


//============================================================
// Imports
//============================================================

import { CONFIG } from "../config.js";

import {
    createElement,
    append,
    setStyles,
    prefersReducedMotion
} from "../utils/helpers.js";

import {
    random,
    randomInt,
    weightedRandom
} from "../utils/random.js";


//============================================================
// Constants
//============================================================

// Maps the config's abstract colour names onto the actual
// hex values, so this file only has one place that needs to
// agree with config.js.
const STAR_COLOR_MAP = {
    warm:      CONFIG.COLOR.starWarm,
    ivory:     CONFIG.COLOR.ivory,
    cool:      CONFIG.COLOR.starCool,
    champagne: CONFIG.COLOR.champagne
};

const STAR_COLOR_WEIGHTS = CONFIG.SKY.STAR_COLOR_WEIGHTS.map(entry => ({
    value: STAR_COLOR_MAP[entry.value],
    weight: entry.weight
}));


//============================================================
// Private Variables
//============================================================

const stars = [];
const heroStars = [];

let starsContainer = null;
let skyLayers = {};

let constellationTimer = null;
let shootingStarTimer = null;


//============================================================
// Initialise Stars
//============================================================

/**
 * Entry point. This is the only function app.js needs to call.
 */

export function initStars() {

    createSkyLayers();
    createStars();
    createHeroStars();

    if (!prefersReducedMotion()) {

        startHeroSparkles();

        if (CONFIG.FUTURE.CONSTELLATION_SURPRISE) {
            scheduleConstellationSurprise();
        }

        if (CONFIG.FUTURE.SHOOTING_STAR) {
            scheduleShootingStar();
        }

    }

    window.addEventListener("resize", handleResize);

}


//============================================================
// Create Sky Layers
//============================================================

/**
 * Creates four independent layers (three depth layers plus
 * one reserved for hero stars). Separate layers let each
 * depth twinkle at its own pace without one giant NodeList.
 */

function createSkyLayers() {

    starsContainer = document.getElementById("stars");

    if (!starsContainer) {
        console.error("Project Bloom: #stars container not found.");
        return;
    }

    starsContainer.innerHTML = "";

    skyLayers = {
        distant: createElement("div"),
        middle:  createElement("div"),
        nearby:  createElement("div"),
        hero:    createElement("div")
    };

    Object.values(skyLayers).forEach(layer => {
        layer.classList.add("stars-layer");
        layer.setAttribute("aria-hidden", "true");
        append(starsContainer, layer);
    });

}


//============================================================
// Create All Stars
//============================================================

function createStars() {

    // On very small screens, thin the field out a little —
    // a phone shouldn't repaint 260 twinkles every frame.
    const scale = window.innerWidth < CONFIG.SKY.REDUCED_STAR_SCALE_BELOW
        ? CONFIG.SKY.REDUCED_STAR_SCALE
        : 1;

    const counts = CONFIG.SKY.STAR_COUNTS;

    createLayerStars("distant", Math.round(counts.far  * scale), 1,   1.4);
    createLayerStars("middle",  Math.round(counts.mid  * scale), 1.6, 2.5);
    createLayerStars("nearby",  Math.round(counts.near * scale), 2.8, 4);

}


//============================================================
// Create Layer Stars
//============================================================

function createLayerStars(layerName, count, minSize, maxSize) {

    for (let i = 0; i < count; i++) {

        const star = createSingleStar(layerName, minSize, maxSize, false);

        append(skyLayers[layerName], star.element);

        stars.push(star);

    }

}


//============================================================
// Create One Star
//============================================================

function createSingleStar(layer, minSize, maxSize, hero = false) {

    const element = createElement("div");
    element.classList.add("star", `star-${layerDepthClass(layer)}`);

    const size = random(minSize, maxSize);
    const opacity = random(.35, .95);
    const colour = weightedRandom(STAR_COLOR_WEIGHTS);

    setStyles(element, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${random(0, 100)}%`,
        top: `${random(0, 100)}%`,
        opacity,
        background: colour,
        animationDuration: `${random(4, 9)}s`,
        animationDelay: `${random(0, 6)}s`
    });

    if (!hero) {
        element.classList.add("twinkle");
    }

    return { element, layer, size, opacity, hero };

}

// "distant" / "middle" / "nearby" → the CSS depth classes
// already defined in 04-stars.css (star-far / star-mid / star-near).
function layerDepthClass(layer) {

    if (layer === "distant") return "far";
    if (layer === "middle")  return "mid";
    if (layer === "nearby")  return "near";
    return "near";

}


//============================================================
// Create Hero Stars
//============================================================

/**
 * Hero stars are the only stars ever allowed to sparkle.
 * Keeping them in their own short, named list means the sky
 * never gets "busy" — only ever one gentle wink at a time.
 */

function createHeroStars() {

    CONFIG.SKY.HERO_STAR_NAMES.forEach(name => {

        const star = createSingleStar("nearby", 3, 4.5, true);

        star.name = name;
        star.element.classList.add("hero-star");

        append(skyLayers.hero, star.element);

        heroStars.push(star);
        stars.push(star);

    });

}


//============================================================
// Hero Star Sparkles
//============================================================

/**
 * Recursive randomised timeout rather than setInterval —
 * this is what keeps the timing from ever feeling mechanical.
 */

function startHeroSparkles() {
    scheduleNextHeroSparkle();
}

function scheduleNextHeroSparkle() {

    const delay = random(
        CONFIG.HERO_SPARKLE.MIN_DELAY,
        CONFIG.HERO_SPARKLE.MAX_DELAY
    );

    setTimeout(() => {

        sparkleHeroStar();
        scheduleNextHeroSparkle();

    }, delay);

}

/**
 * Makes one random hero star sparkle once, then return to
 * normal. Exported so timeline.js can call this directly for
 * story-critical moments (docs/MOMENTS.md #15 — a hero star
 * quietly acknowledging the final message).
 */

export function sparkleHeroStar() {

    if (heroStars.length === 0) return;

    const star = heroStars[randomInt(0, heroStars.length - 1)];

    star.element.classList.add("sparkling");

    setTimeout(() => {
        star.element.classList.remove("sparkling");
    }, CONFIG.HERO_SPARKLE.DURATION);

}


//============================================================
// Constellation Surprise (Section 19-A)
//
// After a long, quiet moment, a small handful of stars
// briefly connect into a tiny heart, then let go again.
//============================================================

function scheduleConstellationSurprise() {

    const delay = random(25000, 40000);

    constellationTimer = setTimeout(() => {

        if (document.visibilityState === "visible") {
            playConstellationSurprise();
        }

        // Rare means rare — the next one is a long way off,
        // so it never becomes a pattern the eye learns.
        constellationTimer = setTimeout(
            scheduleConstellationSurprise,
            random(90000, 160000)
        );

    }, delay);

}

function playConstellationSurprise() {

    if (!starsContainer) return;

    const holder = createElement("div");
    holder.className = "constellation";
    holder.setAttribute("aria-hidden", "true");

    // A small heart, six points, hand-placed rather than
    // procedurally generated — a real heart shape reads
    // instantly, a random polygon does not.
    const points = [
        [50, 34], [38, 20], [22, 30],
        [50, 62], [78, 30], [62, 20]
    ];

    const originX = random(18, 78);
    const originY = random(12, 34);

    holder.innerHTML = buildConstellationSVG(points);

    setStyles(holder, {
        left: `${originX}%`,
        top: `${originY}%`
    });

    append(starsContainer, holder);

    requestAnimationFrame(() => holder.classList.add("is-visible"));

    setTimeout(() => {
        holder.classList.remove("is-visible");
        setTimeout(() => holder.remove(), 1400);
    }, 1800);

}

function buildConstellationSVG(points) {

    const lines = points
        .map((point, index) => {
            const next = points[(index + 1) % points.length];
            return `<line x1="${point[0]}" y1="${point[1]}" x2="${next[0]}" y2="${next[1]}" />`;
        })
        .join("");

    const dots = points
        .map(point => `<circle cx="${point[0]}" cy="${point[1]}" r="1.6" />`)
        .join("");

    return `
        <svg viewBox="0 0 100 80" aria-hidden="true">
            <g class="constellation__lines">${lines}</g>
            <g class="constellation__stars">${dots}</g>
        </svg>
    `;

}


//============================================================
// Shooting Star (Section 19-A, docs/MOMENTS.md #26)
//
// Crosses BEHIND the bouquet — it lives inside the stars
// layer, which sits well below --z-bouquet, so this is true
// by construction rather than by careful timing.
//============================================================

function scheduleShootingStar() {

    const delay = random(45000, 75000);

    shootingStarTimer = setTimeout(() => {

        if (document.visibilityState === "visible") {
            playShootingStar();
        }

        shootingStarTimer = setTimeout(
            scheduleShootingStar,
            random(70000, 130000)
        );

    }, delay);

}

function playShootingStar() {

    if (!skyLayers.nearby) return;

    const streak = createElement("div");
    streak.className = "shooting-star";

    const startX = random(55, 95);
    const startY = random(4, 28);
    const angle = random(18, 28);

    setStyles(streak, {
        left: `${startX}%`,
        top: `${startY}%`,
        transform: `rotate(${angle}deg)`
    });

    append(skyLayers.nearby, streak);

    streak.addEventListener("animationend", () => streak.remove());

}


//============================================================
// Resize
//============================================================

function handleResize() {
    // Star positions are percentage-based, so they reflow on
    // their own. Reserved for future parallax recalculation.
}