class Collision extends Polygon {

    constructor(points, color, ejection, flexibility) {
        super(points);
        this.color = color;
        this.ejection = ejection;
        this.dy = 0;
        this.dx = 0;
        this.flexibility = flexibility;
        this.hover = false;
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
        for (let point of this.getPoints()) {
            if (point.dy < 1) {
                point.setDirectionY(dy);
            }
        }
        // this.dy = dy * this.flexibility;
        // if (!parents) {
        //     parents = [];
        // }
        // parents.push(this);
        // for (let e of level.getCollisions()) {
        //     if (e != this && parents.indexOf(e) == -1 && e.getFlexibility() > 0 && e.isPolygonsIntersecting(this)) {
        //         e.setDirectionY(this.dy * e.flexibility, parents);
        //     }
        // }
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

        if (this.clicked) {
            this.clickStyle();
        } else if (this.hover) {
            this.hoverStyle();
        } else if (this.showPoints) {
            for (let point of this.points) {
                ctx.fillStyle = "black";
                if (point.selected) {
                    ctx.fillStyle = "white";
                }
                ctx.beginPath();
                ctx.arc(point.getRenderX(), point.getRenderY(), 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }

    hoverStyle() {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(this.points[0].getRenderX(), this.points[0].getRenderY() + (this.points[0].isSolid() ? 0 : this.dy));
        for (let point of this.points) {
            ctx.lineTo(point.getRenderX(), point.getRenderY() + (point.isSolid() ? 0 : this.dy));
        }
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.stroke();

        for (let point of this.points) {
            ctx.fillStyle = "black";
            if (point.solid) {
                ctx.fillStyle = "yellow";
            }
            if (point.selected) {
                ctx.fillStyle = "white";
            }
            ctx.beginPath();
            ctx.arc(point.getRenderX(), point.getRenderY(), 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    clickStyle() {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(this.points[0].getRenderX(), this.points[0].getRenderY() + (this.points[0].isSolid() ? 0 : this.dy));
        for (let point of this.points) {
            ctx.lineTo(point.getRenderX(), point.getRenderY() + (point.isSolid() ? 0 : this.dy));
        }
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.stroke();

        for (let point of this.points) {
            ctx.fillStyle = "red";
            if (point.solid) {
                ctx.fillStyle = "yellow";
            }
            if (point.selected) {
                ctx.fillStyle = "white";
            }
            ctx.beginPath();
            ctx.arc(point.getRenderX(), point.getRenderY(), 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
