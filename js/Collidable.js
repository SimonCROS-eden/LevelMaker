class Collidable {

    /// Checks if the two polygons are intersecting.
    isPolygonsIntersecting(a) {
        if (Point.prototype.isPrototypeOf(a)) {
            a = new Collision([a], "transparent", 0, 0);
        }
        return Collidable.isPolygonsIntersecting(a, this);
    }

    static getLinesCollide(polygon, point) {
        for (let i1 = 0; i1 < polygon.getPoints().length; i1++) {
            let i2 = (i1 + 1) % polygon.getPoints().length;
            let p1 = polygon.getPoints()[i1];
            let p2 = polygon.getPoints()[i2];
            if (Collidable.isPointOnSegment(p1, p2, point, 1)) {
                return [p1, p2];
            }
        }
        return [];
    }

    static isPointOnSegment(startPoint, endPoint, checkPoint, tolerance) {
        //test if the point c is inside a pre-defined distance (tolerance) from the line
        var a = {x: startPoint.getX(), y: startPoint.getY()};
        var b = {x: endPoint.getX(), y: endPoint.getY()};
        var c = {x: checkPoint.getX(), y: checkPoint.getY()};

        var distance = Math.abs((c.y - b.y) * a.x - (c.x - b.x) * a.y + c.x * b.y - c.y * b.x) / Math.sqrt(Math.pow((c.y - b.y), 2) + Math.pow((c.x - b.x), 2));
        if (distance > tolerance) {
            return false;
        }

        //test if the point c is between a and b
        var dotproduct = (c.x - a.x) * (b.x - a.x) + (c.y - a.y) * (b.y - a.y);
        if (dotproduct < 0) {
            return false;
        }

        var squaredlengthba = (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
        if (dotproduct > squaredlengthba) {
            return false;
        }
        return true;
    }

    /// Checks if the two polygons are intersecting.
    static isPolygonsIntersecting(a, b) {
        for (let polygon of [a, b]) {
            for (let i1 = 0; i1 < polygon.getPoints().length; i1++) {
                let i2 = (i1 + 1) % polygon.getPoints().length;
                let p1 = polygon.getPoints()[i1];
                let p2 = polygon.getPoints()[i2];

                let normal = new Location(p2.getY() - p1.getY(), p1.getX() - p2.getX());

                let minA = null,
                    maxA = null;
                for (let p of a.getPoints()) {
                    let projected = normal.getX() * p.getX() + normal.getY() * p.getY();
                    if (minA == null || projected < minA)
                        minA = projected;
                    if (maxA == null || projected > maxA)
                        maxA = projected;
                }

                let minB = null,
                    maxB = null;
                for (let p of b.getPoints()) {
                    let projected = normal.getX() * p.getX() + normal.getY() * p.getY();
                    if (minB == null || projected < minB)
                        minB = projected;
                    if (maxB == null || projected > maxB)
                        maxB = projected;
                }

                if (maxA < minB || maxB < minA) {
                    return false;
                }
            }
        }
        return true;
    }
}
