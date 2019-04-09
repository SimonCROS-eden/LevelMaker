class Polygon extends Collidable {

    constructor(points) {
        super();
        if (!Point.prototype.isPrototypeOf(points[0])) {
            points = Array.from(points, e => Point.unserialize(e));
        }
        this.setPoints(points);
    }

    setPoints(points) {
        this.points = points;
    }

    getPoints() {
        return this.points;
    }
}
