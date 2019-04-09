class Collision extends Polygon {

    constructor(points, color, ejection, flexibility) {
        super(points);

        this.points = points;
        this.color = color;
        this.ejection = ejection;
        this.dy = 0;
        this.dx = 0;
        this.flexibility = flexibility;
    }

    getLocation() {
        return this.location;
    }

    setDirectionX(dx) {
        this.dx = dx;
    }

    getFlexibility() {
        return this.flexibility;
    }

    setDirectionY(dy, parents) {
        this.dy = dy * this.flexibility;
        if (!parents) {
            parents = [];
        }
        parents.push(this);
        for (let e of levels[actualLevel].getCollisions()) {
            if (e != this && parents.indexOf(e) == -1 && e.getFlexibility() > 0 && e.isPolygonsIntersecting(this)) {
                e.setDirectionY(this.dy * e.flexibility, parents);
            }
        }
    }

    getEjection() {
        return this.ejection;
    }

    draw() {
        this.dy += (0 - this.dy) / 5;
        if (this.dy < 0.1) {
            this.dy = 0;
        }
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.points[0].getRenderX(), this.points[0].getRenderY() + (this.points[0].isSolid() ? 0 : this.dy));
        for (let point of this.points) {
            ctx.lineTo(point.getRenderX(), point.getRenderY() + (point.isSolid() ? 0 : this.dy));
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}
