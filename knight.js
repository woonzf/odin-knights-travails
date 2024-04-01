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
        this.edge ||= square ;
    }
}

function createSquare(x, y) {
    const name = `${x}${y}`;
    if (map.has(name)) return map.get(name);

    const square = new Square(x, y);
    map.set(name, square);
    return square;
}

function getNextSquareList(square) {
    const pos = square.getPos();
    return moves.map(getNextSquare, pos).filter(Boolean);
}

function getNextSquare(move) {
    const x = this[0] + move[0];
    const y = this[1] + move[1];

    if (x >= 0 && x < boardHeight && y >= 0 && y < boardHeight) return createSquare(x, y);
}

export default function knightMoves(start, finish) {
    const origin = createSquare(... start);
    const destination = createSquare(... finish);

    let queue = [destination];
    let path = [origin];

    while (!queue.includes(origin)) {
        const current = queue.shift();
        const squareList = getNextSquareList(current);

        squareList.forEach(square => square.setEdge(current));
        queue.push(... squareList);
    }
    
    while (!path.includes(destination)) {
        const next = path.at(-1).getEdge();
        path.push(next);
    }

    console.log(`You made it in ${path.length - 1} moves! Here's your path:`)
    path.forEach(square => console.log(square.getPos()));

    map.clear();
}