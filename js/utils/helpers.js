/*============================================================

    Project Bloom
    File: helpers.js

    Purpose
    -------
    Reusable DOM helper functions.

    These helpers keep every module clean,
    readable and consistent.

=============================================================*/


//============================================================
// Create Element
//============================================================

export function createElement(tagName) {

    return document.createElement(tagName);

}


//============================================================
// Append Child
//============================================================

export function append(parent, child) {

    if (!parent || !child) return;

    parent.appendChild(child);

}


//============================================================
// Append Multiple Children
//============================================================

export function appendMany(parent, children) {

    children.forEach(child => {

        append(parent, child);

    });

}


//============================================================
// Query Selector
//============================================================

export function $(selector) {

    return document.querySelector(selector);

}


//============================================================
// Query Selector All
//============================================================

export function $$(selector) {

    return [...document.querySelectorAll(selector)];

}


//============================================================
// Apply Multiple CSS Styles
//============================================================

export function setStyles(element, styles) {

    Object.entries(styles).forEach(([property, value]) => {

        element.style[property] = value;

    });

}


//============================================================
// Add Class
//============================================================

export function addClass(element, className) {

    element.classList.add(className);

}


//============================================================
// Remove Class
//============================================================

export function removeClass(element, className) {

    element.classList.remove(className);

}


//============================================================
// Toggle Class
//============================================================

export function toggleClass(element, className) {

    element.classList.toggle(className);

}


//============================================================
// Delay (Promise)
//============================================================

export function wait(milliseconds) {

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });

}


//============================================================
// Clamp
//============================================================

export function clamp(value, min, max) {

    return Math.min(

        Math.max(value, min),

        max

    );

}


//============================================================
// Lerp
//============================================================

export function lerp(start, end, amount) {

    return start + (end - start) * amount;

}


//============================================================
// Viewport Width
//============================================================

export function viewportWidth() {

    return window.innerWidth;

}


//============================================================
// Viewport Height
//============================================================

export function viewportHeight() {

    return window.innerHeight;

}


//============================================================
// Percentage → Pixels (Width)
//============================================================

export function vw(percent) {

    return viewportWidth() * percent / 100;

}


//============================================================
// Percentage → Pixels (Height)
//============================================================

export function vh(percent) {

    return viewportHeight() * percent / 100;

}


//============================================================
// Prefers Reduced Motion
//============================================================

/*
    Every module that schedules its own drifting, looping or
    procedurally-timed animation should check this first.

    CSS already collapses transition/animation durations to
    near-zero globally (see 01-base.css), but JavaScript-driven
    loops — hero sparkles, particle drift, firefly wandering —
    need to know as well, so they can stop scheduling the next
    cycle instead of quietly running a zero-length loop forever.
*/

export function prefersReducedMotion() {

    return window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    ).matches;

}


//============================================================
// Has Fine Pointer
//============================================================

/*
    True on mice/trackpads, false on touch-only devices.

    Used to gate the desktop-only star parallax — section 4
    of the brief is explicit that touch devices should not
    receive a motion-based substitute.
*/

export function hasFinePointer() {

    return window.matchMedia("(pointer: fine)").matches;

}


//============================================================
// Is Mobile Width
//============================================================

export function isMobileWidth(breakpoint) {

    return viewportWidth() < breakpoint;

}


//============================================================
// Is Tab Visible
//============================================================

export function isTabVisible() {

    return document.visibilityState === "visible";

}


//============================================================
// Debounce
//============================================================

/*
    Used for
    --------
    • Resize handlers

    Waits until the events stop arriving before running once.
*/

export function debounce(fn, delay = 150) {

    let timer = null;

    return function debounced(...args) {

        clearTimeout(timer);

        timer = setTimeout(() => fn.apply(this, args), delay);

    };

}


//============================================================
// Set Many CSS Custom Properties
//============================================================

/*
    Small companion to setStyles() specifically for
    "--custom-property" values, since those can't be set
    through element.style[property] = value the same way
    plain CSS properties can.
*/

export function setVars(element, vars) {

    Object.entries(vars).forEach(([name, value]) => {

        element.style.setProperty(name, value);

    });

}