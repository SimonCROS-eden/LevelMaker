class Point extends Location {

    constructor(x, y, resistance, restore, solid) {
        super(x, y);
        this.restore = restore;
        this.resistance = resistance + 1;
        this.originalX = x;
        this.originalY = y;
        this.dx = 0;
        this.dy = 0;
        this.solid = solid || false;
        setInterval(this.actualise, this)
    }

    setSolid(solid) {
        this.solid = solid;
    }

    isSolid() {
        return this.solid;
    }

    setDirectionX(dx) {
        if (!this.isSolid()) {
            this.dx = dx;
        }
    }

    setDirectionY(dy) {
        if (!this.isSolid()) {
            this.dy = dy;
        }
    }

    getX() {
        return this.x + (this.dx / this.resistance);
    }

    getY() {
        return this.y + (this.dx / this.resistance);
    }

    actualise = () => {
        if (this.dx > 0.1 || this.dx < 0.1) {
            this.dx += (0 - this.dx) / this.resistance;
            this.addX(this.dx);
        }
        if (this.dy > 0.1 || this.dy < 0.1) {
            this.dy += (0 - this.dy) / this.resistance;
            this.addX(this.dy);
        }
        if (this.x - this.originalX > 0.1) {
            this.x += (this.x - this.originalX) / this.resistance;
        }
        if (this.y - this.originalY > 0.1) {
            this.y += (this.y - this.originalY) / this.resistance;
        }
    }

    clone() {
        return new Location(this.getX(), this.getY(), this.solid);
    }

    static fromLocation(location, solid) {
        return new Point(location.getX(), location.getY(), solid);
    }

    static unserialize(point) {
        return new Point(point.x, point.y, point.resistance, point.restore, point.solid);
    }
}
