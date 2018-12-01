const groundCOLL = [3];

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
    var collGround = groundCOLL.includes(map.layers[0].data[pos[1] * 8 + pos[0]]);

    return collGround;
}

// How much moving there will cost
function moveCost(pos, map) {

    switch (map.layers[0].data[pos[1] * 8 + pos[0]]) {
        case 2:
            return 2;
        default:
            return 1;
    }

}