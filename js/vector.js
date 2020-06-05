class Vector {

    constructor(location, y) {
        this.x = location.x || location || 0;
        this.y = location.y || y || 0;
    }

    // return the angle of the vector in radians
    getDirection() {
        return Math.atan2(this.y, this.x);
    }

    // set the direction of the vector in radians
    setDirection(direction) {
        var magnitude = this.getMagnitude();
        this.x = Math.cos(direction) * magnitude;
        this.y = Math.sin(direction) * magnitude;
        return this;
    }

    // get the magnitude of the vector
    getMagnitude() {
        // use pythagoras theorem to work out the magnitude of the vector
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    rotate(angle) {
        this.setDirection((angle * (Math.PI / 180)) + this.getDirection())
        return this;
    }

    // set the magnitude of the vector
    setMagnitude(magnitude) {
        var direction = this.getDirection();
        this.x = Math.cos(direction) * magnitude;
        this.y = Math.sin(direction) * magnitude;
    }

    // add two vectors together and return a new one
    add(v2) {
        return new Vector(this.x + v2.x, this.y + v2.y);
    }

    // add a vector to this one
    addTo(v2) {
        this.x += v2.x;
        this.y += v2.y;
        return this;
    }

    // subtract two vectors and reutn a new one
    subtract(v2) {
        return new Vector(this.x - v2.x, this.y - v2.y);
    }

    // subtract a vector from this one
    subtractFrom(v2) {
        this.x -= v2.x;
        this.y -= v2.y;
        return this;
    }

    // multiply this vector by a scalar and return a new one
    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    // multiply this vector by the scalar
    multiplyBy(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    // scale this vector by scalar and return a new vector
    divide(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }

    // scale this vector by scalar
    divideBy(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    // Utilities
    copy() {
        return new Vector(this.x, this.y);
    }

    toString() {
        return 'x: ' + this.x + ', y: ' + this.y;
    }

    toArray() {
        return [this.x, this.y];
    }

    toObject() {
        return {
            x: this.x,
            y: this.y
        };
    }

    // dot product of two vectors
    dotProduct(v2) {
        return this.x * v2.x + this.y * v2.y;
    }

    // normalize a given vector
    normalize() {
        return new Vector(this.x / (Math.sqrt(this.x * this.x + this.y * this.y)), this.y / (Math.sqrt(this.x * this.x + this.y * this.y)));
    }

}
