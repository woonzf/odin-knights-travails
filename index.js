import knightMoves from './knight.js';

knightMoves([0,0],[3,3]);
// You made it in 2 moves! Here's your path:
// [ 0, 0 ]
// [ 2, 1 ]
// [ 3, 3 ]

knightMoves([0,0],[7,7]);
// You made it in 6 moves! Here's your path:
// [ 0, 0 ]
// [ 2, 1 ]
// [ 4, 0 ]
// [ 6, 1 ]
// [ 7, 3 ]
// [ 6, 5 ]
// [ 7, 7 ]

knightMoves([3,3],[4,3]);
// You made it in 3 moves! Here's your path:
// [ 3, 3 ]
// [ 5, 2 ]
// [ 6, 4 ]
// [ 4, 3 ]