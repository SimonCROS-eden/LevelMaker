class Location {

    static originalSize = {width: 888, height: 500};
    static size = Location.originalSize;

    static setSize(width, height) {
        Location.size = {width, height};
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    addX(x) {
        this.x += x;
    }

    addY(y) {
        this.y += y;
    }

    subtractX(x) {
        this.x -= x;
    }

    subtractY(y) {
        this.y -= y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getRenderX() {
        return this.x * Location.size.width / Location.originalSize.width;
    }

    getRenderY() {
        return this.y * Location.size.height / Location.originalSize.height;
    }

    clone() {
        return new Location(this.getX(), this.getY());
    }

    distance(location) {

    }
}
