class Coin extends Polygon {

    constructor(location) {
        if (!Location.prototype.isPrototypeOf(location)) {
            location = new Location(location.x, location.y);
        }

        let size = Location.size.width / 30;
        let pointsDeplacements = [
            [-size / 2, -size / 2],
            [size / 2, -size / 2],
            [size / 2, size / 2],
            [-size / 2, size / 2]
        ]
        let points = [];
        for (let dep of pointsDeplacements) {
            let modified = location.clone();
            modified.addX(dep[0]);
            modified.addY(dep[1]);
            points.push(Point.fromLocation(modified, true));
        }
        super(points);

        this.location = location;
        this.step = 0;
        this.maxstep = 5;
        this.imageSize = 84;
        this.size = size;
        this.borders = 2;
        this.taked = false;

        var img = new Image(); // Crée un nouvel élément img
        img.addEventListener('load', () => {
            this.img = img;
        }, false);
        img.src = '/images/coin.png';
        this.img = null;

        canvas.addEventListener("keydown", this.move);
    }

    setTaked(taked) {
        this.taked = taked;
    }

    isTaked() {
        return this.taked;
    }

    getLocation() {
        return this.location;
    }

    setDirectionY(dy) {
        this.dy = dy * 4;
        for (let e of levels[actualLevel].getCollisions()) {
            if (e != this && e.isPolygonsIntersecting(this)) {
                e.dy = dy * 4;
            }
        }
    }

    getSize() {
        return this.imageSize;
    }

    draw() {
        if (this.taked) {
            return;
        }
        let size = Location.size.width / 30;
        this.size = size;
        let pointsDeplacements = [
            [-size / 2, -size / 2],
            [size / 2, -size / 2],
            [size / 2, size / 2],
            [-size / 2, size / 2]
        ]
        let points = [];
        for (let dep of pointsDeplacements) {
            let modified = this.getLocation().clone();
            modified.addX(dep[0]);
            modified.addY(dep[1]);
            points.push(Point.fromLocation(modified, true));
        }
        this.step+= 0.2;
        let step = Math.round(this.step);
        if (step > this.maxstep) {
            this.step = 0;
            step = 0;
        }
        if (this.img) {
            ctx.drawImage(this.img, step * this.imageSize + step * this.borders + this.borders, this.borders, this.imageSize, this.imageSize, this.getLocation().getRenderX() - this.size / 2, this.getLocation().getRenderY() - this.size / 2, this.size, this.size);
        }
        ctx.restore();
    }
}
