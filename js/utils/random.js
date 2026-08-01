/*============================================================

    Project Bloom
    File: random.js

    Purpose
    -------
    Random utility functions.

    Every module should use these helpers instead of
    calling Math.random() directly.

=============================================================*/


//============================================================
// Random Decimal
//============================================================

export function random(min = 0, max = 1) {

    return Math.random() * (max - min) + min;

}


//============================================================
// Random Integer
//============================================================

export function randomInt(min, max) {

    return Math.floor(

        random(min, max + 1)

    );

}


//============================================================
// Random Boolean
//============================================================

export function randomBool(chance = 0.5) {

    return Math.random() < chance;

}


//============================================================
// Random Array Item
//============================================================

export function randomItem(array) {

    return array[

        randomInt(0, array.length - 1)

    ];

}


//============================================================
// Shuffle Array
//============================================================

export function shuffle(array) {

    const copy = [...array];

    for (

        let i = copy.length - 1;

        i > 0;

        i--

    ) {

        const j = randomInt(0, i);

        [

            copy[i],

            copy[j]

        ] = [

            copy[j],

            copy[i]

        ];

    }

    return copy;

}


//============================================================
// Random Percentage
//============================================================

export function chance(percent) {

    return Math.random() < percent;

}


//============================================================
// Weighted Random
//============================================================

/*

Example

weightedRandom([

    { value:"#FFF", weight:40 },

    { value:"#FFD", weight:30 },

    { value:"#DEF", weight:20 },

    { value:"#FFE", weight:10 }

]);

*/

export function weightedRandom(items) {

    const totalWeight = items.reduce(

        (sum, item) => sum + item.weight,

        0

    );

    let roll = random(0, totalWeight);

    for (const item of items) {

        roll -= item.weight;

        if (roll <= 0) {

            return item.value;

        }

    }

    return items[0].value;

}


//============================================================
// Random Position
//============================================================

export function randomPosition() {

    return {

        x: random(0, 100),

        y: random(0, 100)

    };

}


//============================================================
// Random Angle
//============================================================

export function randomAngle() {

    return random(0, 360);

}


//============================================================
// Random Rotation
//============================================================

export function randomRotation(max = 8) {

    return random(-max, max);

}