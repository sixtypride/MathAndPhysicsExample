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
var lines2 = [];
var ball = new Ball(context);

var pt0 = { x: 500, y:300 };
var pt1 = { x: 800, y:300 };
var pt2 = { x: 800, y:350 };
var pt3 = { x: 500, y:350 };

var line1 = new Line(context, pt0, pt1);
lines.push(line1);
var line2 = new Line(context, pt1, pt2);
lines.push(line2);
var line3 = new Line(context, pt2, pt3);
lines.push(line3);
var line4 = new Line(context, pt3, pt0);
lines.push(line4);


var pt0 = { x: 100, y:300 };
var pt1 = { x: 400, y:300 };
var pt2 = { x: 400, y:350 };
var pt3 = { x: 100, y:350 };

var line1 = new Line(context, pt0, pt1);
lines2.push(line1);
var line2 = new Line(context, pt1, pt2);
lines2.push(line2);
var line3 = new Line(context, pt2, pt3);
lines2.push(line3);
var line4 = new Line(context, pt3, pt0);
lines2.push(line4);

var startX = 10,
    startY = canvas.height - 20;
var speed = 20;
var bounce = -1;
var gravity = 0.2;

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


function render(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();

    var t = Math.cos(time / 500);

    for(var i = 0; i < lines.length; i++)
    {
        lines[i].rotate(t > 0 ? 0.005 : -0.005);
        lines[i].draw();
    }

    for(var i = 0; i < lines2.length; i++)
    {
        lines2[i].rotate(t < 0 ? 0.005 : -0.005);
        lines2[i].draw();
    }
}

function loop(time) {

    ball.vec.vy += gravity;
    ball.x += ball.vec.vx;
    ball.y += ball.vec.vy;

    for(var i = 0; i < lines.length; i++)
        lineCheck(lines[i]);

    for(var i = 0; i < lines.length; i++)
        lineCheck(lines2[i]);

    if (ball.x > canvas.width - ball.radius) {
        ball.x = canvas.width - ball.radius;
        ball.vec.vx *= bounce;
    }
    else if (ball.x < ball.radius) {
        ball.x = ball.radius;
        ball.vec.vx *= bounce;
    }
    //else if (ball.y < ball.radius) {
    //    ball.y = ball.radius;
    //    ball.vec.vy *= bounce;
    //}
    else if (ball.y > canvas.height - ball.radius) {
        ball.y = canvas.height - ball.radius;
        ball.vec.vy *= bounce;
    }

    render(time);
    requestAnimationFrame(loop);
}

function lineCheck(line) {
    var a = new Vector2d(line.endPt.x - line.startPt.x, line.endPt.y - line.startPt.y);
    var b = new Vector2d(line.startPt.x - ball.x, line.startPt.y - ball.y);

    var t = (b.dot(a) / a.dot(a)) * -1;

    if (t >= 0 && t <= 1) {
        var p = a.scale(t).add(b);

        if(p.length() <= ball.radius)
        {
            var u = a.normal().normalize();
            var s = ball.vec.scale(-1).dot(u);
            var n = u.scale(s).scale(2);

            var d = u.scale(ball.radius - b.dot(u));

            ball.x -= d.vx;
            ball.y -= d.vy;

            ball.vec = ball.vec.add(n);
        }
    }
}


