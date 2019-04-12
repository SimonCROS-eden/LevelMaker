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

    registerPointsPolygon() {
        for (let i = 0; i < this.getPoints().length; i++) {
            this.getPoints()[i].setPolygon(this, i);
        }
    }

    getPoints() {
        return this.points;
    }
}
