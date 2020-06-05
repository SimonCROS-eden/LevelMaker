// Configuration

var gravity = 4;
var jumpforce = 5.5;
var max_fall_speed = 10;

// ASSETS
// sounds
var pick_coin = new Audio('/sounds/pick_coin.mp3');

// MAIN

movingPoints = [];

setInterval(() => {
    movingPoints.forEach(e => {
        e.actualise();
    });
}, 10);

canvasSize();
var slow = false;
var fps = 0;
var lastCalledTime = null;
let ctx = canvas.getContext('2d');
ctx.save();

var actualLevel = 1;
var level = null;
var perso = null;
    // new Level([
    //     new Collision([new Point(40, 460, true), new Point(80, 460, true), new Point(80, 500, true), new Point(40, 500, true)], "brown", 0, 0),
    //
    //     new Collision([new Point(200, 420, true), new Point(240, 420, true), new Point(240, 460, true), new Point(200, 460, true)], "rgb(203, 69, 33)", 0, 0),
    //     new Collision([new Point(200, 390, false), new Point(210, 390, false), new Point(240, 420, true), new Point(230, 420, true)], "brown", 0, 1),
    //     new Collision([new Point(240, 390, false), new Point(230, 390, false), new Point(200, 420, true), new Point(210, 420, true)], "brown", 0, 1),
    //     new Collision([new Point(200, 390, true), new Point(210, 390, true), new Point(210, 420, true), new Point(200, 420, true)], "transparent", 0, 0),
    //     new Collision([new Point(240, 390, true), new Point(230, 390, true), new Point(230, 420, true), new Point(240, 420, true)], "transparent", 0, 0),
    //     new Collision([new Point(200, 380, false), new Point(240, 380, false), new Point(240, 390, false), new Point(200, 390, false)], "rgb(203, 69, 33)", 10, 8),
    //
    //     new Collision([new Point(420, 320, true), new Point(460, 320, true), new Point(460, 360, true), new Point(420, 360, true)], "rgb(203, 69, 33)", 0, 0),
    //     new Collision([new Point(420, 290, false), new Point(430, 290, false), new Point(460, 320, true), new Point(450, 320, true)], "brown", 0, 1),
    //     new Collision([new Point(460, 290, false), new Point(450, 290, false), new Point(420, 320, true), new Point(430, 320, true)], "brown", 0, 1),
    //     new Collision([new Point(420, 290, true), new Point(430, 290, true), new Point(430, 320, true), new Point(420, 320, true)], "transparent", 0, 0),
    //     new Collision([new Point(460, 290, true), new Point(450, 290, true), new Point(450, 320, true), new Point(460, 320, true)], "transparent", 0, 0),
    //     new Collision([new Point(420, 280, false), new Point(460, 280, false), new Point(460, 290, false), new Point(420, 290, false)], "rgb(203, 69, 33)", 10, 8),
    //
    //     new Collision([new Point(580, 200), new Point(630, 200), new Point(630, 250), new Point(580, 250)], "rgb(22, 157, 0)", 0, 0),
    //     new Collision([new Point(600, 250), new Point(630, 250), new Point(630, 500), new Point(600, 500)], "rgb(22, 157, 0)", 0, 0),
    //     new Collision([new Point(630, 480), new Point(670, 480), new Point(670, 500), new Point(630, 500)], "rgb(22, 157, 0)", 0, 0),
    //     new Collision([new Point(670, 250), new Point(670, 500), new Point(700, 500), new Point(700, 250)], "rgb(22, 157, 0)", 0, 0),
    //
    //     // new RectangularCollision(new Location(200, 100), new Point(50, 50), "gray", 10, -1, true, 0),
    //     // new RectangularCollision(new Location(200, 0), new Point(50, 50), "gray", 5, -1, true, 0),
    //
    //     new Collision([new Point(670, 200), new Point(670, 250), new Point(720, 250), new Point(720, 200)], "rgb(22, 157, 0)", 0, 0),
    // ], [
    //     new Plateforme(new Location(400, 100), new Location(40, max_fall_speed + 1), "rgb(148, 0, 45)"),
    //     new Plateforme(new Location(630, 200), new Location(40, max_fall_speed + 1), "rgb(22, 157, 0)")
    // ], [
    //     new Coin(new Location(220, 350)),
    //     new Coin(new Location(440, 250)),
    //     new Coin(new Location(420, 80)),
    //     new Coin(new Location(650, 180))
    // ], [
    //     new ActionZone([new Point(630, 240), new Point(670, 240), new Point(670, 480), new Point(630, 480)], "rgba(219, 17, 17, .2)", GameAction.NEXT_LEVEL),
    // ], [
    //     new ForegroundElement([new Point(629, 201), new Point(671, 201), new Point(671, 480), new Point(629, 480)], "rgb(22, 157, 0)")
    // ], new Location(50, 440), "66, 188, 244"),
    // new Level([
    //     new Collision([new Point(0, 470), new Point(170, 470), new Point(170, 500), new Point(0, 500)], "brown", 0, 0),
    //     new Collision([new Point(170, 470), new Point(200, 470), new Point(200, 500), new Point(170, 500)], "red", 50, 0),
    //     new Collision([new Point(200, 470), new Point(250, 470), new Point(250, 500), new Point(200, 500)], "brown", 0, 0),
    //     new Collision([new Point(250, 470), new Point(280, 470), new Point(280, 500), new Point(250, 500)], "red", 50, 0),
    //     new Collision([new Point(280, 470), new Point(330, 470), new Point(330, 500), new Point(280, 500)], "brown", 0, 0),
    //     new Collision([new Point(330, 470), new Point(360, 470), new Point(360, 500), new Point(330, 500)], "red", 50, 0),
    //     new Collision([new Point(360, 470), new Point(410, 470), new Point(410, 500), new Point(360, 500)], "brown", 0, 0),
    //     new Collision([new Point(410, 470), new Point(440, 470), new Point(440, 500), new Point(410, 500)], "red", 50, 0),
    //     new Collision([new Point(440, 470), new Point(470, 470), new Point(470, 500), new Point(440, 500)], "brown", 0, 0),
    //     new Collision([new Point(470, 470), new Point(500, 470), new Point(500, 500), new Point(470, 500)], "red", 50, 0),
    //     new Collision([new Point(500, 470), new Point(530, 470), new Point(530, 500), new Point(500, 500)], "brown", 0, 0),
    //     new Collision([new Point(530, 470), new Point(620, 470), new Point(620, 500), new Point(530, 500)], "red", 50, 0),
    //     new Collision([new Point(620, 470), new Point(640, 470), new Point(640, 500), new Point(620, 500)], "brown", 0, 0),
    //     new Collision([new Point(640, 470), new Point(730, 470), new Point(730, 500), new Point(640, 500)], "red", 50, 0),
    //     new Collision([new Point(730, 470), new Point(890, 470), new Point(890, 500), new Point(730, 500)], "brown", 0, 0),
    // ], [], [
    //     new Coin(new Location(225, 440)),
    //     new Coin(new Location(305, 440)),
    //     new Coin(new Location(385, 440)),
    //     new Coin(new Location(455, 440)),
    //     new Coin(new Location(515, 440)),
    //     new Coin(new Location(630, 440)),
    //     new Coin(new Location(790, 440))
    // ], [
    //     new ActionZone([new Point(840, 420), new Point(890, 420), new Point(890, 470), new Point(840, 470)], "rgba(3, 196, 94, 1)", GameAction.NEXT_LEVEL),
    // ], [], new Location(50, 450), "66, 188, 244"),
    // new Level([
    //     new Collision([new Point(0, 470), new Point(890, 470), new Point(890, 500), new Point(0, 500)], "brown", 0, 0),
    //     new Collision([new Point(0, 380), new Point(890, 380), new Point(890, 420), new Point(0, 420)], "brown", 0, 0),
    //     new RectangularCollision(new Location(200, 420), new Point(50, 50), "gray", 0, -1, true, 0)
    // ], [], [
    //     new Coin(new Location(225, 450)),
    //     new Coin(new Location(305, 450)),
    //     new Coin(new Location(385, 450)),
    //     new Coin(new Location(455, 450)),
    //     new Coin(new Location(515, 450)),
    //     new Coin(new Location(630, 450)),
    //     new Coin(new Location(790, 450))
    // ], [
    //     new ActionZone([new Point(790, 420), new Point(840, 420), new Point(840, 470), new Point(790, 470)], "rgba(3, 196, 94, 1)", GameAction.NEXT_LEVEL),
    // ], [], new Location(50, 450), "66, 188, 244"),
start("level_2")
function start(levelName) {
    Loader.loadData("/levels/" + levelName + ".json", (text) => {
        level = Level.unserialize(text);
        perso = new Personnage(level.getSpawnPoint(), new Location(10, 20), 'rgb(0, 161, 40)', ctx);
        animation();
    })
}

function animation() {
    level.draw();
    showFPS();
    showLevel();

    window.requestAnimationFrame(animation);
}

function showFPS() {
    if (!lastCalledTime) {
        lastCalledTime = Date.now();
        fps = 0;
        return;
    }
    let delta = (Date.now() - lastCalledTime) / 1000;
    lastCalledTime = Date.now();
    fps = Math.floor(1 / delta);

    ctx.fillStyle = "Black";
    ctx.font = "normal 16pt Arial";

    ctx.fillText(fps + " fps", 10, 26);
}

function showLevel() {
    ctx.fillStyle = "Black";
    ctx.font = "normal 16pt Arial";

    ctx.fillText("Niveau " + actualLevel, canvas.width / 2, 26);
}

function canvasSize() {
    if (window.innerWidth / window.innerHeight > Location.originalSize.width / Location.originalSize.height) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerHeight * Location.originalSize.width / Location.originalSize.height;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth * Location.originalSize.height / Location.originalSize.width;
    }
    Location.size = {
        width: canvas.width,
        height: canvas.height
    }
}

window.onresize = canvasSize;
