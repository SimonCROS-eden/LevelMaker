class Location {

    static originalSize = {
        width: 888,
        height: 500
    };
    static size = Location.originalSize;

    static setSize(width, height) {
        Location.size = {
            width,
            height
        };
    }

    static unserialize(location) {
        return new Location(location.x, location.y)
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
        return Math.floor(this.getX() * Location.size.width / Location.originalSize.width);
    }

    getRenderY() {        
        return Math.floor(this.getY() * Location.size.height / Location.originalSize.height);
    }

    clone() {
        return new Location(this.getX(), this.getY());
    }

    distanceTo(location) {
        return Math.sqrt(Math.pow((this.getX() - location.getX()), 2) + Math.pow((this.getY() - location.getY()), 2));
    }
}
