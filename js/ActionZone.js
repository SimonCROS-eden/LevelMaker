class ActionZone extends Polygon {
    constructor(points, color, gameaction) {
        super(points);

        this.points = points;
        this.color = color;
        this.gameaction = gameaction;
    }

    getLocation() {
        return this.location;
    }

    getGameAction() {
        return this.gameaction;
    }

    callGameAction() {
        this.getGameAction()();
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
