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
    return map.layers[1].data[pos[1]][pos[0]].index != -1;
}

function buildMap(map, scene) {
    var data = scene.cache.json.get(map);

    var tileWidthHalf = 32;
    var tileHeightHalf = 16;

    var layer = data.layers[0].data;

    var mapwidth = data.layers[0].width;
    var mapheight = data.layers[0].height;

    var centerX = mapwidth * tileWidthHalf;
    var centerY = 0;

    var i = 0;

    for (var y = 0; y < mapheight; y++) {
        for (var x = 0; x < mapwidth; x++) {
            id = layer[i] - 1;

            var tx = (x - y) * tileWidthHalf;
            var ty = (x + y) * tileHeightHalf;

            var tile = scene.add.image(centerX + tx, centerY + ty, 'tiles', id);
            tile.depth = centerY + ty;
            i++;
        }
    }

    return data.layers;
}