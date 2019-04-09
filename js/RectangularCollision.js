class RectangularCollision extends Collision {

    constructor(location, size, color, ejection, flexibility, gravity, resistance) {
        let points = [Point.fromLocation(location, false), new Point(location.getX(), location.getY() + size.getY(), false), new Point(location.getX() + size.getX(), location.getY() + size.getY(), false),
            new Point(location.getX() + size.getX(), location.getY(), false)]
        super(points, color, ejection, flexibility);
        this.location = location;
        this.size = size;
        this.gravity = gravity;
        this.resistance = resistance;
        this.fall_distance = 0;
        this.dy = 0;
        if (gravity || resistance > -1) {
            this.sheduler = setInterval(this.calcul, 10);
        }
    }

    calcul = () => {
        if (!this.isOnGround()) {
            let fall_speed = this.fall_distance / 10 / gravity;
            this.getLocation().addY(fall_speed < max_fall_speed ? fall_speed : max_fall_speed);
            this.fall_distance += gravity;

            let collisions = this.collision();
            if (collisions.length) {
                this.getLocation().subtractY(fall_speed < max_fall_speed ? fall_speed : max_fall_speed);
                this.fall_distance = 0;
            }
            for (let collision of collisions) {
                if (collision.getEjection() > 0) {
                    this.dy = collision.getEjection();
                    collision.setDirectionY(fall_speed);
                }
            }
        }

        this.getLocation().subtractY(this.dy);
        if (this.collision().length) {
            this.getLocation().addY(this.dy);
            this.dy = 0;
        }

        this.getLocation().addX(this.dx);
        if (this.collision().length) {
            this.getLocation().subtractX(this.dx);
            this.dx = 0;
        }

        if (this.dy > 0.5) {
            this.dy -= this.dy / (jumpforce * gravity);
        }

        if (this.getLocation().getY() + this.getSize().getY() > Location.originalSize.height || this.getLocation().getY() + this.getSize().getY() < -Location.originalSize.height) {
            clearInterval(this.sheduler);
        }
    }

    collision() {
        let tr = [];
        this.reloadPoints();
        for (let e of levels[actualLevel].getCollisions()) {
            if (e != this && e.isPolygonsIntersecting(this)) {
                tr.push(e);
            }
        }
        return tr;
    }

    isOnGround() {
        var ground = false;
        levels[actualLevel].getPlateforms().forEach(e => {
            if (e.isUnderPlayer(this)) {
                if (e.distanceTop(this) > -5) {
                    if (this.dy <= 1) {
                        ground = true;
                        if (e.distanceTop(this) != 0) {
                            let y = e.getLocation().getY() - this.getSize().getY();
                            let diff = y - this.getLocation().getY();
                            this.getLocation().setY(y);
                            if (this.collision().length) {
                                this.getLocation().subtractY(diff);
                            }
                        }
                    }
                }
            }
        }, this);
        return ground;
    }

    getLocation() {
        return this.location;
    }

    getSize() {
        return this.size;
    }

    getLocation() {
        return this.location;
    }

    reloadPoints() {
        this.setPoints([Point.fromLocation(this.getLocation(), false), new Point(this.getLocation().getX(), this.getLocation().getY() + this.getSize().getY(), false), new Point(this.getLocation().getX() + this.getSize().getX(), this.getLocation().getY() + this.getSize().getY(), false),
            new Point(this.getLocation().getX() + this.getSize().getX(), this.getLocation().getY(), false)]);
    }

    draw() {
        this.reloadPoints();
        super.draw();
    }
}
