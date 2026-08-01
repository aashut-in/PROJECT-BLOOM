/*============================================================

    Project Bloom
    File: audio.js

    Purpose
    -------
    Optional, respectful sound. Silent until the visitor asks
    for it; nothing here ever autoplays.

    Note on this file
    ------------------
    Nothing in the original architecture owned audio — the
    assets existed (assets/audio/) but no module referenced
    them. This file is a small, deliberate addition rather
    than a rename or a move of anything existing.

=============================================================*/


//============================================================
// Imports
//============================================================

import { CONFIG } from "../config.js";
import { $ } from "../utils/helpers.js";


//============================================================
// Private Variables
//============================================================

let ambience = null;
let sparkleSound = null;
let toggleButton = null;

let soundEnabled = false;
let ambienceFadeTimer = null;


//============================================================
// Initialise Audio
//============================================================

export function initAudio() {

    ambience = new Audio(CONFIG.AUDIO.AMBIENCE_SRC);
    ambience.loop = true;
    ambience.volume = 0;
    ambience.preload = "none";

    sparkleSound = new Audio(CONFIG.AUDIO.SPARKLE_SRC);
    sparkleSound.preload = "none";

    toggleButton = $("#sound-toggle");

    if (!toggleButton) {
        console.warn("Project Bloom: #sound-toggle not found; continuing without a sound control.");
        return;
    }

    toggleButton.addEventListener("click", handleToggleClick);

}


//============================================================
// Toggle Handling
//============================================================

function handleToggleClick() {

    soundEnabled = !soundEnabled;

    updateToggleUI();

    if (soundEnabled) {

        attemptPlay(ambience);
        fadeAmbienceTo(CONFIG.AUDIO.AMBIENCE_VOLUME);

    } else {

        fadeAmbienceTo(0, () => ambience && ambience.pause());

    }

}

function updateToggleUI() {

    if (!toggleButton) return;

    toggleButton.classList.toggle("is-on", soundEnabled);

    toggleButton.setAttribute("aria-pressed", String(soundEnabled));

    toggleButton.setAttribute(
        "aria-label",
        soundEnabled ? "Turn sound off" : "Turn sound on"
    );

}


//============================================================
// Play Sparkle Sound
//============================================================

/**
 * A quiet, delicate one-shot. Only ever called for the
 * story-critical sparkles (the first sparkle, hero sparkles)
 * — never for every ordinary background twinkle, and never
 * at all unless the visitor has opted into sound.
 */

export function playSparkleSound() {

    if (!soundEnabled || !sparkleSound) return;

    try {

        sparkleSound.currentTime = 0;
        sparkleSound.volume = CONFIG.AUDIO.SPARKLE_VOLUME;

        attemptPlay(sparkleSound);

    } catch (error) {

        // A source that hasn't loaded yet can throw when its
        // currentTime is set — the sparkle sound is a small
        // delight, never a requirement, so we simply skip it.

    }

}


//============================================================
// Attempt Play (defensive)
//============================================================

/**
 * play() returns a Promise that rejects if the browser blocks
 * playback or the source can't be decoded. Audio is a "nice
 * to have" throughout this project, so a rejection is caught
 * quietly rather than surfacing as a console error.
 */

function attemptPlay(audioElement) {

    if (!audioElement) return;

    const playPromise = audioElement.play();

    if (playPromise && typeof playPromise.catch === "function") {

        playPromise.catch(() => {

            console.warn(
                "Project Bloom: audio couldn't start (the source may still be a placeholder, or playback was blocked)."
            );

        });

    }

}


//============================================================
// Fade Ambience
//============================================================

function fadeAmbienceTo(target, onComplete) {

    if (!ambience) return;

    clearInterval(ambienceFadeTimer);

    const steps = 30;
    const stepTime = CONFIG.AUDIO.FADE_DURATION / steps;
    const startVolume = ambience.volume;
    const delta = (target - startVolume) / steps;

    let count = 0;

    ambienceFadeTimer = setInterval(() => {

        count++;

        const next = startVolume + delta * count;

        ambience.volume = Math.min(1, Math.max(0, next));

        if (count >= steps) {

            clearInterval(ambienceFadeTimer);
            ambience.volume = target;

            if (onComplete) onComplete();

        }

    }, stepTime);

}


//============================================================
// Public State
//============================================================

export function isSoundEnabled() {

    return soundEnabled;

}