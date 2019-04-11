class Personnage extends Polygon {

    constructor(location, size, color, ctx) {
        super([location, new Location(location.getX(), location.getY() + size.getY()), new Location(location.getX() + size.getX(), location.getY() + size.getY()),
            new Location(location.getX() + size.getX(), location.getY())
        ]);

        this.setLocation(location);
        this.ctx = ctx;
        this.color = color;
        this.size = size;
        this.keyboard = {
            right: false,
            left: false,
            up: false,
            down: false,
            any: false,
        };
        this.jump = 0;
        this.fall_distance = 0;
        this.dx = 0;
        this.slow = null;
        this.gold = 0;
        this.life = 100;

        this.moveSheduler = setInterval(this.move, 10);
        document.addEventListener("keydown", this.keyHandler);
        document.addEventListener("keyup", this.keyHandler);
    }

    getLocation() {
        return this.location;
    }

    setLocation(location) {
        this.location = location.clone();
    }

    getSize() {
        return this.size;
    }

    keyHandler = (e) => {
        const state = e.type === "keydown"
        if (e.keyCode == 39 || e.key == "d") {
            this.keyboard.right = state;
        } else if (e.keyCode == 37 || e.key == "q") {
            this.keyboard.left = state;
        } else if (e.keyCode == 38 || e.key == " " || e.key == "z") {
            this.keyboard.up = state;
            e.preventDefault();
        } else if (e.keyCode == 40 || e.key == "s") {
            this.keyboard.down = state;
        } else if (e.keyCode == 69 || e.key == "e") {
            if (state && !slow) {
                slow = setTimeout(() => {
                    slow = null;
                }, 5000);
            }
        }
        if (state) {
            this.keyboard.any = true;
        }
        if (!this.keyboard.right && !this.keyboard.left && !this.keyboard.up && !this.keyboard.down) {
            this.keyboard.any = false;
        }
    }

    move = () => {
        if (!this.isOnGround()) {
            if (this.jump <= 1) {
                let fall_speed = this.fall_distance / 10 / gravity;
                this.getLocation().addY(fall_speed < max_fall_speed ? fall_speed : max_fall_speed);
                this.fall_distance += gravity;

                let collisions = this.collision();
                if (collisions.length) {
                    this.getLocation().subtractY(fall_speed < max_fall_speed ? fall_speed : max_fall_speed);
                    this.fall_distance = 0;
                }
                for (let collision of collisions) {
                    collision.setDirectionY(fall_speed);
                    if (this.jump <= 1) {
                        if (collision.getEjection() > 0) {
                            this.jump = collision.getEjection();
                        } else {
                            this.jump = 0;
                            if (this.keyboard.up) {
                                this.jump = jumpforce;
                                if (this.keyboard.left) {
                                    this.dx = -2;
                                }
                                if (this.keyboard.right) {
                                    this.dx = 2;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (this.jump <= 1) {
                this.jump = 0;
                this.fall_distance = 0;
                if (this.keyboard.up) {
                    this.jump = jumpforce;
                    if (this.keyboard.left) {
                        this.dx = -2;
                    }
                    if (this.keyboard.right) {
                        this.dx = 2;
                    }
                }
            }
        }

        this.getLocation().subtractY(this.jump);
        if (this.collision().length) {
            this.getLocation().addY(this.jump);
            this.jump = 0;
        }

        if (this.keyboard.left) {
            this.getLocation().subtractX(2);
            this.dx = -2;
            if (this.collision().length) {
                this.getLocation().subtractY(1);
                if (this.collision().length) {
                    this.getLocation().addX(2);
                    this.getLocation().addY(1);
                    this.dx = 0;
                }
            }
        }
        if (this.keyboard.right) {
            this.getLocation().addX(2);
            this.dx = 2;
            if (this.collision().length) {
                this.getLocation().subtractY(1);
                if (this.collision().length) {
                    this.getLocation().subtractX(2);
                    this.getLocation().addY(1);
                    this.dx = 0;
                }
            }
        }
        if (!this.keyboard.left && !this.keyboard.right) {
            this.getLocation().addX(this.dx);
            this.dx += (0 - this.dx) / (this.jump > 0 ? 1 : 5);
            if (this.collision().length) {
                this.getLocation().subtractX(this.dx);
                this.dx = 0;
            }
        }

        this.takeCoins();
        this.actionZone();

        if (this.jump > 0.5) {
            this.jump -= this.jump / (jumpforce * gravity);
        }

        if (this.getLocation().getY() + this.getSize().getY() > Location.originalSize.height || this.getLocation().getY() + this.getSize().getY() < -Location.originalSize.height) {
            this.gold = Math.floor(this.gold / 2);
            this.reload();
        }
    }

    reload() {
        let location = level.getSpawnPoint();
        this.setLocation(location);
        this.reloadPoints();
        this.keyboard = {
            right: false,
            left: false,
            up: false,
            any: false,
        };
        this.jump = 0;
        this.dx = 0;
    }

    reloadPoints() {
        this.setPoints([this.getLocation(), new Location(this.getLocation().getX(), this.getLocation().getY() + this.getSize().getY()), new Location(this.getLocation().getX() + this.getSize().getX(), this.getLocation().getY() + this.getSize().getY()),
            new Location(this.getLocation().getX() + this.getSize().getX(), this.getLocation().getY())
        ]);
    }

    collision() {
        let tr = [];
        this.reloadPoints();
        for (let e of level.getCollisions()) {
            if (e.isPolygonsIntersecting(this)) {
                tr.push(e);
            }
        }
        return tr;
    }

    actionZone() {
        this.reloadPoints();
        for (let e of level.getActionZones()) {
            if (e.isPolygonsIntersecting(this)) {
                e.callGameAction();
            }
        }
    }

    takeCoins() {
        for (let e of level.getCoins()) {
            if (!e.isTaked() && e.isPolygonsIntersecting(this)) {
                e.setTaked(true);
                this.gold++;
                pick_coin.pause();
                pick_coin.currentTime = 0;
                pick_coin.play();
            }
        }
    }

    isOnGround() {
        if (this.keyboard.down) {
            return false;
        }
        var ground = false;
        level.getPlateforms().forEach(e => {
            if (e.isUnderPlayer(this)) {
                if (e.distanceTop(this) > -5) {
                    if (this.jump <= 1) {
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

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.getLocation().getRenderX(), this.getLocation().getRenderY(), this.getSize().getRenderX(), this.getSize().getRenderY());
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

        this.ctx.fillStyle = "rgb(214, 6, 6)";
        this.ctx.beginPath();
        this.ctx.rect(canvas.width - 210, 10, 200 - (100 - this.life) * 2, 20);
        this.ctx.fill();

        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.rect(canvas.width - 210, 10, 200, 20);
        this.ctx.stroke();

        this.ctx.fillStyle = "rgb(214, 218, 0)";
        this.ctx.beginPath();
        this.ctx.rect(canvas.width - 235, 60 - this.gold * 5, 20, this.gold * 5);
        this.ctx.fill();

        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.rect(canvas.width - 235, 10, 20, 50);
        this.ctx.stroke();

        this.ctx.restore();
    }
}
