/*============================================================

    Project Bloom
    File: app.js

    Purpose
    -------
    Application Entry Point.

    This file is responsible for starting
    the entire Project Bloom experience.

    No animation logic should live here.

=============================================================*/


//============================================================
// Imports
//=============================================================

import { initStars } from "./modules/stars.js";
import { initParticles } from "./modules/particles.js";
import { initSparkle } from "./modules/sparkle.js";
import { initIntro } from "./modules/intro.js";


//============================================================
// Start Application
//=============================================================

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        console.clear();

        console.log("%c🌷 Project Bloom", "color:#FFDDAA;font-size:16px;");
        console.log("%cAwakening the night...", "color:#CCCCCC;");

        try {

            //--------------------------------------------------
            // Sky
            //--------------------------------------------------

            initStars();

            //--------------------------------------------------
            // Atmosphere
            //--------------------------------------------------

            initParticles();

            //--------------------------------------------------
            // Sparkles
            //--------------------------------------------------

            initSparkle();

            //--------------------------------------------------
            // Story
            //--------------------------------------------------

            await initIntro();

            console.log("%cBloom is ready.", "color:#8FD694;");

        }

        catch (error) {

            console.error(

                "Project Bloom failed to start.",

                error

            );

        }

    }

);