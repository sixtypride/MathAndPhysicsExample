/*
 <원과 직선의 충돌 체크>

 점과 직선 사이의 거리

 Math.sqrt(a

 */

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();

    return {
        x: x - bbox.left,
        y: y - bbox.top
    }
}

var ball = new Ball(context);
var line = new Line(context, {x: 200, y: 100}, {x: 400, y: 200});

canvas.onmousemove = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);

    ball.x = loc.x;
    ball.y = loc.y;
}


render();
requestAnimationFrame(loop);

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    line.draw();
}

function loop() {

    var a = new Vector2d(line.endPt.x - line.startPt.x, line.endPt.y - line.startPt.y);
    var b = new Vector2d(line.startPt.x - ball.x, line.startPt.y - ball.y);

    var t = (b.dotProduct(a) / a.dotProduct(a)) * -1;

    if (t >= 0 && t <= 1) {
        var p = a.scale(t).add(b);
        if (p.length() < ball.radius) {
            ball.color = "red";
        }
        else {
            ball.color = "black";
        }
    }


    render();
    requestAnimationFrame(loop);
}


