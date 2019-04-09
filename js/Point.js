class Point extends Location {

    constructor(x, y, solid) {
        super(x, y);
        this.solid = solid || false;
    }

    setSolid(solid) {
        this.solid = solid;
    }

    isSolid() {
        return this.solid;
    }

    clone() {
        return new Location(this.getX(), this.getY(), this.solid);
    }

    static fromLocation(location, solid) {
        return new Point(location.getX(), location.getY(), solid);
    }

    static unserialize(point) {
        return new Point(point.x, point.y, point.solid)
    }
}
