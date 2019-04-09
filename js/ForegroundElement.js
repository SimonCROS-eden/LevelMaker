class ForegroundElement extends Polygon {

    constructor(points, color) {
        super(points);

        this.color = color;
    }

    getLocation() {
        return this.location;
    }

    getSize() {
        return this.size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.points[0].getRenderX(), this.points[0].getRenderY() + (this.points[0].isSolid() ? 0 : this.dy));
        for (let point of this.points) {
            ctx.lineTo(point.getRenderX(), point.getRenderY());
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}
