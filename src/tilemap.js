class Tilemap {

    constructor(map, scene) {
        var data = scene.cache.json.get(map);

        this.tileWidthHalf = 32;
        this.tileHeightHalf = 16;

        this.layers = data.layers;

        this.width = data.layers[0].width;
        this.height = data.layers[0].height;
    }

    buildMap(scene) {
        var centerX = 0;
        var centerY = this.height * this.tileHeightHalf;
        var layer = this.layers[0].data;
        
        var i = 0;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var id = layer[i] - 1;
    
                var tx = (x - y) * this.tileWidthHalf;
                var ty = (x + y) * this.tileHeightHalf;
    
                var tile = scene.add.image(centerX + tx, centerY + ty, 'tiles', id);
                tile.depth = centerY + ty;
                i++;
            }
        }
    }

}