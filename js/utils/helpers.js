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