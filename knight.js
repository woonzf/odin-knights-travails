const map = new Map();
const boardHeight = 8;
const moves = [
    [1, 2], [2, 1],
    [2, -1], [1, -2],
    [-1, -2], [-2, -1],
    [-2, 1], [-1, 2]
];

class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.edge = null;
    }

    getPos() {
        return [this.x, this.y];
    }

    getEdge() {
        return this.edge;
    }

    setEdge(square) {
        // Can only set if edge is null
        this.edge ||= square ;
    }
}

function createSquare(x, y) {
    // Check if current square exist in map
    // If yes return the existing square
    const name = `${x}${y}`;
    if (map.has(name)) return map.get(name);

    // Create a new square and set into map
    const square = new Square(x, y);
    map.set(name, square);
    return square;
}

function getNextSquareList(square) {
    // Create an array of next possible squares
    // .filter(Boolean) is used to remove undefined elements
    const pos = square.getPos();
    return moves.map(getNextSquare, pos).filter(Boolean);
}

function getNextSquare(move) {
    // "this" is the callback second argument, "pos"
    const x = this[0] + move[0];
    const y = this[1] + move[1];

    // Return the square if the conditions are met, otherwise return "undefined" by default
    if (x >= 0 && x < boardHeight && y >= 0 && y < boardHeight) return createSquare(x, y);
}

export default function knightMoves(start, finish) {
    const origin = createSquare(... start);
    const destination = createSquare(... finish);

    let queue = [destination];
    let path = [origin];

    // Breadth First Search
    // Starting from destination, queue all the next possible squares
    // Setting the edge of each square it travels along the way
    // Until one of the moves reaches the origin
    // Each root can have a maximum of 8 leaf nodes
    // The first branch that reaches the origin is the fastest path
    while (!queue.includes(origin)) {
        const current = queue.shift();
        const squareList = getNextSquareList(current);

        squareList.forEach(square => square.setEdge(current));
        queue.push(... squareList);
    }
    
    // Starting from the origin, trace the edge until it reaches the destination
    // Pushing the square it travels along the way into an array
    while (!path.includes(destination)) {
        const next = path.at(-1).getEdge();
        path.push(next);
    }

    console.log(`You made it in ${path.length - 1} moves! Here's your path:`)
    path.forEach(square => console.log(square.getPos()));

    // Reset the map
    map.clear();
}