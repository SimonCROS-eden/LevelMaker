class Level {
    constructor(collisions, plateforms, coins, actionzones, foreground, spawnpoint, backgroundColor) {
        this.setCollisions(collisions);
        this.setPlateforms(plateforms);
        this.setCoins(coins);
        this.setForegroundElements(foreground);
        this.setActionZones(actionzones);
        this.backgroundColor = backgroundColor;
        this.spawnpoint = spawnpoint;
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

        this.getCollisions().forEach(e => {
            e.draw();
        }, this);
        this.getPlateforms().forEach(e => {
            e.draw();
        }, this);
        this.getActionZones().forEach(e => {
            e.draw();
        }, this);
        this.getCoins().forEach(e => {
            e.draw();
        }, this);
        perso.draw();
        this.getForegroundElements().forEach(e => {
            e.draw();
        }, this);
    }
}
