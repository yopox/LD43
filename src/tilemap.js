class Tilemap {

    constructor(map, scene) {
        var data = scene.cache.json.get(map);

        this.tileWidthHalf = 32;
        this.tileHeightHalf = 16;

        this.layers = data.layers;

        this.width = data.layers[0].width;
        this.height = data.layers[0].height;

        this.startingPos = [0, 0];
        this.goal = [0, 0];

        for (let i = 0; i < this.layers[0].data.length; i++) {
            var j = Math.floor(i / this.width);
            if (this.layers[0].data[i] == 4) {
                this.startingPos = [i % this.width, j];
            } else if (this.layers[0].data[i] == 5) {
                this.goal = [i % this.width, j];
            }
        }
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