class Polygon extends Collidable {

    constructor(points) {
        super();
        this.setPoints(points);
    }

    setPoints(points) {
        this.points = points;
    }

    getPoints() {
        return this.points;
    }
}
