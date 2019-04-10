document.addEventListener("mousemove", hover);
document.addEventListener("mousedown", clickStart);
document.addEventListener("mouseup", clickEnd);

var generatorMouseX = 0;
var generatorMouseY = 0;
var lastSelected = null;
var clickedElement = null;
var clickPoint = null;
var moving = false;
var selectedPoint = null;

function hover(e) {
    generatorMouseX = Math.round(((e.pageX - canvas.offsetLeft) * Location.originalSize.width / Location.size.width) / 10) * 10;
    generatorMouseY = Math.round(((e.pageY - canvas.offsetTop) * Location.originalSize.height / Location.size.height) / 10) * 10;
    if (clickedElement && selectedPoint && moving) {
        let diffX = generatorMouseX - clickPoint.x;
        let diffY = generatorMouseY - clickPoint.y;
        selectedPoint.addX(diffX);
        selectedPoint.addY(diffY);
        clickPoint = {
            x: generatorMouseX,
            y: generatorMouseY
        };

        if (Collision.prototype.isPrototypeOf(clickedElement)) {
            if (e.shiftKey) {
                
            }
        }
    } else if (clickedElement && moving) {
        let diffX = generatorMouseX - clickPoint.x;
        let diffY = generatorMouseY - clickPoint.y;
        clickedElement.getPoints().forEach(e => {
            e.addX(diffX);
            e.addY(diffY);
        });
        clickPoint = {
            x: generatorMouseX,
            y: generatorMouseY
        };
    } else {
        var p = new Point(generatorMouseX, generatorMouseY, false);
        if (lastSelected) {
            lastSelected.hover = false;
        }
        if (selectedPoint) {
            selectedPoint.selected = false;
            selectedPoint = null;
        }

        var selection = getSelected(p);
        if (selection.type === 1) {
            lastSelected = selection.element;
            selection.element.hover = true;
        } else if (selection.type === 2) {
            lastSelected = selection.element;
            selectedPoint = selection.point;
            selection.point.selected = true;
            selection.element.hover = true;
        }
    }
}

function getSelected(point) {
    var tr = {
        type: 0,
        element: null,
        point: null,
    }
    var testPoint = new Collision([
        point
    ], "transparent", 0, 0);
    var isSelectedOne = false;

    for (let e of level.getCollisions()) {
        if (e.isPolygonsIntersecting(testPoint)) {
            tr.element = e;
            tr.type = 1;
            isSelectedOne = true;
            if (e == clickedElement) {
                e.getPoints().forEach(e1 => {
                    if (e1.distanceTo(point) < 5) {
                        tr.type = 2;
                        tr.point = e1;
                    }
                });
                return tr;
            }
        }
    }
    for (let e of level.getCoins()) {
        if (e.getLocation().distanceTo(point) < e.size / 2) {
            tr.element = e;
            tr.type = 2;
            tr.point = e.getLocation();
            if (e == clickedElement) {
                return tr;
            }
        }
    }
    return tr;
}

function clickStart(e) {
    generatorMouseX = Math.round(((e.pageX - canvas.offsetLeft) * Location.originalSize.width / Location.size.width) / 10) * 10;
    generatorMouseY = Math.round(((e.pageY - canvas.offsetTop) * Location.originalSize.height / Location.size.height) / 10) * 10;
    var p = new Point(generatorMouseX, generatorMouseY, false);
    if (lastSelected) {
        if (clickedElement) {
            clickedElement.clicked = false;
        }
        lastSelected.clicked = true;
        moving = true;
        clickedElement = lastSelected;
        clickPoint = {
            x: generatorMouseX,
            y: generatorMouseY
        };
    }
    if (getSelected(p).type === 0) {
        if (clickedElement) {
            clickedElement.clicked = false;
            clickedElement = null;
        }
    }
}

function clickEnd(e) {
    if (clickedElement) {
        moving = false;
        clickPoint = null;
        selectedPoint = null;
    }
}
