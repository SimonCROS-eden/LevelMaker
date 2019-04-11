class Point extends Location {

    constructor(x, y, flexibility, restore, solid) {
        super(x, y);
        this.restore = restore;
        this.flexibility = flexibility + 1;
        this.originalX = x;
        this.originalY = y;
        this.dx = 0;
        this.dy = 0;
        this.solid = solid || false;
        this.polygon = null;
        this.index = -1;
        movingPoints.push(this);
    }

    setPolygon(polygon, index) {
        this.polygon = polygon;
        this.index = index;
    }

    getPolygon() {
        return this.polygon;
    }

    getIndex() {
        return this.index;
    }

    setSolid(solid) {
        this.solid = solid;
    }

    isSolid() {
        return this.solid;
    }

    setDirectionX(dx) {
        if (!this.isSolid()) {
            this.dx += dx;
        }
    }

    setDirectionY(dy, used) {
        let first = used == undefined;
        if (!this.isSolid()) {
            this.dy += dy;
            if (!used) {
                var used = [];
            }
            used.push(this);
            for (let collision of level.getCollisions()) {
                if (collision != this && collision.isPolygonsIntersecting(this)) {
                    for (let point of collision.getPoints()) {
                        if (point != this && point.dy < 1 && used.indexOf(point) == -1 && Math.max(point.getRenderX(), this.getRenderX()) - Math.min(point.getRenderX(), this.getRenderX()) < 1 && Math.max(point.getRenderY(), this.getRenderY()) - Math.min(point.getRenderY(), this.getRenderY())) {
                            point.setDirectionY(dy, used);
                            used.push(point);
                        }
                    }
                }
            }
        }
    }

    getX() {
        return this.x + (this.dx / this.flexibility);
    }

    getY() {
        return this.y + (this.dx / this.flexibility);
    }

    actualise = () => {
        if (this.dx > 0.1 || this.dx < 0.1) {
            this.dx += (0 - this.dx) / this.flexibility;
            this.addX(this.dx);
        } else {
            this.dx = 0;
        }
        if (this.dy > 0.1 || this.dy < 0.1) {
            this.dy += (0 - this.dy) / this.flexibility;
            this.addY(this.dy);
        } else {
            this.dy = 0;
        }
        if (this.restore && this.x - this.originalX > 0.1) {
            this.x -= (this.x - this.originalX) / this.flexibility;
        } else {
            this.x = this.originalX;
        }
        if (this.restore && this.y - this.originalY > 0.1) {
            this.y -= (this.y - this.originalY) / this.flexibility;
        } else {
            this.y = this.originalY;
        }
    }

    clone() {
        return new Location(this.getX(), this.getY(), this.solid);
    }

    static fromLocation(location, solid) {
        return new Point(location.getX(), location.getY(), solid);
    }

    static unserialize(point) {
        return new Point(point.x, point.y, point.flexibility, point.restore, point.solid);
    }
}
