const groundCOLL = [5, 0];
const PENALTY = 2;
const CUT_COST = 2;
const CUT_PUSH = 1;
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



// STORAGE
// FROM Mozzilla : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
                // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

if (!storageAvailable('localStorage') && !storageAvailable('sessionStorage'))
    var globalVarStorage = {};

function getStorage() {
    let storage = null;
    if (storageAvailable('localStorage')) {
        storage = window['localStorage'];
    } else if (storageAvailable("sessionStorage")) {
        storage = window['sessionStorage'];
    } else {
        storage = globalVarStorage;
    }
    return storage;
}

function save(name, obj) {
    getStorage()[name] = JSON.stringify(obj);
}
function load(name) {
    let storage = getStorage();
    if (!storage.getItem(name))
        return null;
    return JSON.parse(storage.getItem(name));
}

const NAME_BEST_SCORES_STORAGE = "SacriflagBestScores";

class BestScores {
    constructor () {
        this.scores = load(NAME_BEST_SCORES_STORAGE);
        if (!this.scores) {
            this.scores = [];
            for (let i = 0; i < LEVEL_NUMBER; i++)
                this.scores.push(0);
            save(NAME_BEST_SCORES_STORAGE, this.scores);
        }
        console.log(this.scores)
    }

    getScore(lvl) {
        return this.scores[lvl];
    }

    setBestScore(lvl, score) {
        this.scores[lvl] = score;
        save(NAME_BEST_SCORES_STORAGE, this.scores);
        console.log(this.scores);
    }

    setScore(lvl, score) {
        console.log(`set score for level ${lvl} to ${score}`);
        if (score > this.getScore(lvl))
            this.setBestScore(lvl, score);
    }

    update() {
        let scores = load(NAME_BEST_SCORES_STORAGE);
        if (!scores) {
            this.scores = scores;
        }
    }
}
