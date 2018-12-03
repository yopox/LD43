const groundCOLL = [5, 0];
const PENALTY = 2;
const CUT_COST = 2;
const LEVEL_NUMBER = 10;

const GAME_WIDTH = 896;
const GAME_HEIGHT = 504;

const dir = {
    LEFT: [-1, 0],
    UP: [0, -1],
    RIGHT: [1, 0],
    DOWN: [0, 1]
};

function oob(pos, map) {
    return pos[0] < 0 || pos[0] >= map.width || pos[1] < 0 || pos[1] >= map.height;
}

// True if there is a collision
function checkCollision(pos, map) {
    return groundCOLL.includes(map.layers[0].data[pos[1] * map.width + pos[0]])
}

// How much moving there will cost
function moveCost(pos, map) {

    switch (map.layers[0].data[pos[1] * map.width + pos[0]]) {
        case 3:
        case 4:
            return 2;
        default:
            return 1;
    }

}