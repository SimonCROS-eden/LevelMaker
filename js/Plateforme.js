class Plateforme {

    constructor(location, size, color) {
        this.location = location;
        this.size = size;
        this.color = color;
    }

    getLocation() {
        return this.location;
    }

    getSize() {
        return this.size;
    }

    draw() {
        let grd = ctx.createLinearGradient(0, this.getLocation().getRenderY(), 0, this.getLocation().getRenderY() + this.getSize().getRenderY());

        // Add colors
        grd.addColorStop(0.000, this.color);
        grd.addColorStop(1.000, 'rgba(255, 255, 255, 0.000)');

        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(this.getLocation().getRenderX(), this.getLocation().getRenderY(), this.getSize().getRenderX(), this.getSize().getRenderY());
        ctx.restore();
    }

    isUnderPlayer(player) {
        if (this.getLocation().getY() >= player.getLocation().getY() + player.getSize().getY()) {
            if (this.getLocation().getX() < player.getLocation().getX() + player.getSize().getX() &&
                this.getLocation().getX() + this.getSize().getX() > player.getLocation().getX()) {
                return true;
            }
        }
        return false;
    }

    distanceTop(player) {
        return player.getLocation().getY() + player.getSize().getY() - this.getLocation().getY();
    }
}
