class Collidable {

    /// Checks if the two polygons are intersecting.
    isPolygonsIntersecting(a) {
        return Collidable.isPolygonsIntersecting(a, this);
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
