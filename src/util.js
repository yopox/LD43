const COLLISION_TILES = [2];

function nextPos(pos, direction) {
    switch (direction) {
        case dir.UP:
            return [pos[0], pos[1] - 1];
        case dir.DOWN:
            return [pos[0], pos[1] + 1];
        case dir.LEFT:
            return [pos[0] - 1, pos[1]];
        case dir.RIGHT:
            return [pos[0] + 1, pos[1]];
    }
}

function oob(pos, map) {
    return pos[0] < 0 || pos[0] >= map.width || pos[1] < 0 || pos[1] >= map.height;
}

function checkCollision(pos, map) {
    return COLLISION_TILES.includes(map.layers[1].data[pos[0]][pos[1]].index);
}