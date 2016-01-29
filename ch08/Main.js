/*
 <벡터>
 크기와 방향을 가진 물리량

 삼각함수를 사용하지 않고 벡터의 개념을 이용해서 구현
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

var lines = [];
var ball = new Ball(context);

var line1 = new Line(context, {x: 100, y: 500}, {x: 800, y: 400});
lines.push(line1);
var line2 = new Line(context, {x: 100, y: 200}, {x: 300, y: 300});
lines.push(line2);
var line3 = new Line(context, {x: 200, y: 200}, {x: 100, y: 300});
lines.push(line3);
var line4 = new Line(context, {x: 500, y: 100}, {x: 300, y: 400});
//lines.push(line4);

var startX = 20,
    startY = canvas.height - 20;
var speed = 25;
var bounce = -1;
var gravity = 0.5;

ball.x = startX;
ball.y = startY;

canvas.onmousedown = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);

    ball.x = startX;
    ball.y = startY;

    var vec = new Vector2d(loc.x - ball.x, loc.y - ball.y);

    ball.vec = vec.normalize().scale(speed);
};

render();
requestAnimationFrame(loop);

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    for(var i = 0; i < lines.length; i++)
        lines[i].draw();
}

function loop(time) {

    ball.vec.vy += gravity;
    ball.x += ball.vec.vx;
    ball.y += ball.vec.vy;

    for(var i = 0; i < lines.length; i++)
        lineCheck(lines[i]);

    if (ball.x > canvas.width - ball.radius) {
        ball.x = canvas.width - ball.radius;
        ball.vec.vx *= bounce;
    }
    else if (ball.x < ball.radius) {
        ball.x = ball.radius;
        ball.vec.vx *= bounce;
    }
    else if (ball.y < ball.radius) {
        ball.y = ball.radius;
        ball.vec.vy *= bounce;
    }
    else if (ball.y > canvas.height - ball.radius) {
        ball.y = canvas.height - ball.radius;
        ball.vec.vy *= bounce;
    }

    render();
    requestAnimationFrame(loop);
}

function lineCheck(line) {
    var a = new Vector2d(line.endPt.x - line.startPt.x, line.endPt.y - line.startPt.y);
    var b = new Vector2d(line.startPt.x - ball.x, line.startPt.y - ball.y);

    var t = (b.dotProduct(a) / a.dotProduct(a)) * -1;

    if (t >= 0 && t <= 1) {
        var p = a.scale(t).add(b);

        if(p.length() <= ball.radius)
        {
            var u = a.normal().normalize();
            var s = ball.vec.scale(-1).dotProduct(u);
            var n = u.scale(s).scale(2);
            ball.vec = ball.vec.add(n);
        }
    }
}


