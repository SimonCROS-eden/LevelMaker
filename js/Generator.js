document.addEventListener("mousemove", hover);
document.addEventListener("mousedown", clickStart);
document.addEventListener("mouseup", clickEnd);

var generatorMouseX = 0;
var generatorMouseY = 0;
var lastSelected = null;
var clickedElement = null;
var clickPoint = null;

function hover(e) {
    generatorMouseX = Math.round(((e.pageX - canvas.offsetLeft) * Location.originalSize.width / Location.size.width) / 10) * 10;
    generatorMouseY = Math.round(((e.pageY - canvas.offsetTop) * Location.originalSize.height / Location.size.height) / 10) * 10;
    if (clickedElement) {
        let diffX = generatorMouseX - clickPoint.x;
        let diffY = generatorMouseY - clickPoint.y;
        clickedElement.getPoints().forEach(e => {
            e.addX(diffX);
            e.addY(diffY);
        });
        clickPoint = {x: generatorMouseX, y: generatorMouseY};
    } else {
        var testPoint = new Collision([
            new Point(generatorMouseX, generatorMouseY, false),
            new Point(generatorMouseX, generatorMouseY, false),
            new Point(generatorMouseX, generatorMouseY, false),
            new Point(generatorMouseX, generatorMouseY, false)
        ], "transparent", 0, 0);
        var isSelectedOne = false;
        level.getCollisions().forEach(e => {
            if (e.isPolygonsIntersecting(testPoint)) {
                if (lastSelected) {
                    lastSelected.hover = false;
                }
                lastSelected = e;
                e.hover = true;
                isSelectedOne = true;
            }
        });
        if (!isSelectedOne) {
            if (lastSelected) {
                lastSelected.hover = false;
            }
        }
    }
}

function clickStart(e) {
    if (lastSelected) {
        clickedElement = lastSelected;
        clickPoint = {x: generatorMouseX, y: generatorMouseY};
    }
}

function clickEnd(e) {
    if (clickedElement) {
        clickedElement = null;
        clickPoint = null;
    }
}
