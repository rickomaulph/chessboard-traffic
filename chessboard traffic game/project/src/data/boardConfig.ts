// Configuration for the chess board
// Each cell contains information about the traffic sign to display (if any)

export const boardConfig = [
  [
    { sign: 'curve-right' },      // a8
    { sign: null },               // b8
    { sign: 'y-intersection' },   // c8
    { sign: null },               // d8
    { sign: 'no-right-turn' },    // e8
    { sign: null },               // f8
    { sign: 'narrow-bridge' },    // g8
    { sign: null }                // h8
  ],
  [
    { sign: null },               // a7
    { sign: 'pedestrian' },       // b7
    { sign: null },               // c7
    { sign: 'parking' },          // d7
    { sign: null },               // e7
    { sign: 'construction' },     // f7
    { sign: null },               // g7
    { sign: 'overtaking' }        // h7
  ],
  [
    { sign: 'one-way' },          // a6
    { sign: null },               // b6
    { sign: 'bicycle' },          // c6
    { sign: null },               // d6
    { sign: 'winding-road' },     // e6
    { sign: null },               // f6
    { sign: 'no-entry' },         // g6
    { sign: null }                // h6
  ],
  [
    { sign: null },               // a5
    { sign: 'stop' },             // b5
    { sign: null },               // c5
    { sign: 'traffic-light' },    // d5
    { sign: null },               // e5
    { sign: 'road-narrows' },     // f5
    { sign: null },               // g5
    { sign: 'warning' }           // h5
  ],
  [
    { sign: 'landslide' },        // a4
    { sign: null },               // b4
    { sign: 'curve-left' },       // c4
    { sign: null },               // d4
    { sign: 'first-aid' },        // e4
    { sign: null },               // f4
    { sign: 'slippery' },         // g4
    { sign: null }                // h4
  ],
  [
    { sign: null },               // a3
    { sign: 'right-turn' },       // b3
    { sign: null },               // c3
    { sign: 'crossroads' },       // d3
    { sign: null },               // e3
    { sign: 'no-u-turn' },        // f3
    { sign: null },               // g3
    { sign: 'falling-rocks' }     // h3
  ],
  [
    { sign: 'give-way' },         // a2
    { sign: null },               // b2
    { sign: 'steep-hill' },       // c2
    { sign: null },               // d2
    { sign: 'roundabout' },       // e2
    { sign: null },               // f2
    { sign: 'left-turn' },        // g2
    { sign: null }                // h2
  ],
  [
    { sign: null },               // a1
    { sign: 'pedestrian-crossing' }, // b1
    { sign: null },               // c1
    { sign: 'roundabout' },       // d1
    { sign: null },               // e1
    { sign: 'no-stopping' },      // f1
    { sign: null },               // g1
    { sign: 'no-bicycles' }       // h1
  ]
];