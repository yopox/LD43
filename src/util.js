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

const SFX = {
    CARAC: 0,
    CUT: 1,
    GEM: 2,
    JUMP: 3,
    MENU: 4,
    ROCK: 5,
    SACRIFICE: 6
};

const BGM = {
    TITLE: 0,
    LEVEL: 1
};

var SOUNDS = [];
var MUSICS = [];

function playSFX(sfx) {
    SOUNDS[sfx].play();
}

function playMusic(music) {
    if (music == BGM.TITLE && !MUSICS[0].isPlaying) {
        MUSICS[1].stop();
        MUSICS[0].play();
        MUSICS[0].setLoop(true);
    } else if (music == BGM.LEVEL && !MUSICS[1].isPlaying) {
        MUSICS[0].stop();
        MUSICS[1].play();
        MUSICS[1].setLoop(true);
    }
}

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
    catch (e) {
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
    constructor() {
        this.scores = load(NAME_BEST_SCORES_STORAGE);
        if (!this.scores || this.scores[0] == 0) {
            this.scores = [];
            for (let i = 0; i < LEVEL_NUMBER; i++)
                this.scores.push([0, false]);
            save(NAME_BEST_SCORES_STORAGE, this.scores);
        }
    }

    getScore(lvl) {
        return this.scores[lvl];
    }

    setBestScore(lvl, score) {
        this.scores[lvl][0] = score;
        save(NAME_BEST_SCORES_STORAGE, this.scores);
    }

    setGem(lvl, gem) {
        this.scores[lvl][1] = gem;
        save(NAME_BEST_SCORES_STORAGE, this.scores);
    }

    setScore(lvl, score, gem) {
        if (score > this.getScore(lvl)[0])
            this.setBestScore(lvl, score);
        if (gem) {
            this.setGem(lvl, gem);
        }
    }

    update() {
        this.scores = load(NAME_BEST_SCORES_STORAGE);
    }
}
