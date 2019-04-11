class Level {
    constructor(collisions, rectangularCollisions, plateforms, coins, actionzones, foreground, spawnpoint, backgroundColor) {
        this.setCollisions(collisions.concat(rectangularCollisions));
        this.setPlateforms(plateforms);
        this.setCoins(coins);
        this.setForegroundElements(foreground);
        this.setActionZones(actionzones);
        this.setSpawnPoint(spawnpoint);
        this.backgroundColor = backgroundColor;
        this.seralized = JSON.stringify(this);
        this.getCollisions().forEach(e => {
            e.registerPointsPolygon();
        });

        // ONLY SERALIZATION
        this.rectangularCollisions = rectangularCollisions;
    }

    setActionZones(actionzones) {
        this.actionzones = actionzones;
    }

    getActionZones() {
        return this.actionzones;
    }

    setForegroundElements(foreground) {
        this.foreground = foreground;
    }

    getForegroundElements() {
        return this.foreground;
    }

    setCollisions(collisions) {
        this.collisions = collisions;
    }

    setPlateforms(plateforms) {
        this.plateforms = plateforms;
    }

    getCollisions() {
        return this.collisions;
    }

    getPlateforms() {
        return this.plateforms;
    }

    getSpawnPoint() {
        return this.spawnpoint;
    }

    setSpawnPoint(spawnpoint) {
        this.spawnpoint = spawnpoint;
    }

    getCoins() {
        return this.coins;
    }

    setCoins(coins) {
        this.coins = coins;
    }

    getBackgroundColor() {
        return this.backgroundColor;
    }

    draw() {
        if (!slow) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgb(" + this.backgroundColor + ")";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            ctx.save();
            ctx.fillStyle = "rgba(" + this.backgroundColor + ", 0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }

        var hover = null;
        var clicked = null;
        this.getCollisions().forEach(e => {
            if (e.hover) {
                hover = e;
            } else if (e.clicked) {
                clicked = e;
            } else {
                e.draw();
            }
        }, this);
        this.getPlateforms().forEach(e => {
            if (e.hover) {
                hover = e;
            } else if (e.clicked) {
                clicked = e;
            } else {
                e.draw();
            }
        }, this);
        this.getActionZones().forEach(e => {
            if (e.hover) {
                hover = e;
            } else if (e.clicked) {
                clicked = e;
            } else {
                e.draw();
            }
        }, this);
        this.getCoins().forEach(e => {
            if (e.hover) {
                hover = e;
            } else if (e.clicked) {
                clicked = e;
            } else {
                e.draw();
            }
        }, this);
        perso.draw();
        this.getForegroundElements().forEach(e => {
            if (e.hover) {
                hover = e;
            } else if (e.clicked) {
                clicked = e;
            } else {
                e.draw();
            }
        }, this);
        if (hover) {
            hover.draw();
        }
        if (clicked) {
            clicked.draw();
        }
    }

    seralize() {
        return this.seralized;
    }

    static unserialize(object) {
        let collisions = Array.from(object.collisions, e => new Collision(e.points, e.color, e.ejection, e.flexibility)),
            rectangularCollisions = Array.from(object.rectangularCollisions, e => new rectangularCollisions(Location.unserialize(e.location), e.size, e.color, e.ejection, e.flexibility, e.gravity, e.resistance)),
            plateforms = Array.from(object.plateforms, e => new Plateforme(Location.unserialize(e.location), Point.unserialize(e.size), e.color)),
            coins = Array.from(object.coins, e => new Coin(Location.unserialize(e.location))),
            actionzones = Array.from(object.actionzones, e => new ActionZone(e.points, e.color, e.gameaction)),
            foreground = Array.from(object.foreground, e => new ForegroundElement(e.points, e.color)),
            spawnpoint = new Location(object.spawnpoint.x, object.spawnpoint.y);

        return new Level(collisions, rectangularCollisions, plateforms, coins, actionzones, foreground, spawnpoint, object.backgroundColor);
    }
}
