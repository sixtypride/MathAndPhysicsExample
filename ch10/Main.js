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

var line0 = new Line(context, {x: -100, y: 600}, {x: 1000, y: 300});
lines.push(line0);

var line1 = new Line(context, {x: -100, y: 700}, {x: 1000, y: 100});
lines.push(line1);

var line2 = new Line(context, {x: 50, y: 0}, {x: 50, y: 700});
lines.push(line2);

var line3 = new Line(context, {x: 700, y: 0}, {x: 700, y: 700});
lines.push(line3);

var line4 = new Line(context, {x: 200, y: 200}, {x: 100, y: 300});
lines.push(line4);

var line5 = new Line(context, {x: 500, y: 100}, {x: 300, y: 400});
lines.push(line5);

var startX = 120,
    startY = canvas.height - 300;
var speed = 10;
var bounce = 1;
var gravity = 0.1;

ball.x = startX;
ball.y = startY;

ball.radius = 10;


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

    for(var i = 0; i < lines.length; i++) {
        lines[i].draw();
    }
}

function loop(time) {
    ball.vec.vy += gravity;

    ball.x += ball.vec.vx;
    ball.y += ball.vec.vy;

    var pa = {x: ball.x, y: ball.y};
    var pb = {x: ball.x + ball.vec.vx, y: ball.y + ball.vec.vy + gravity};
    var pc = line1.startPt;
    var pd = line1.endPt;

    var cp = getIntersectionPoint(pa, pb, pc, pd);

    if (cp != null) {
        var v = new Vector2d(pd.x - pc.x, pd.y - pc.y);
        var n = v.normal().normalize();

        ball.x = cp.x;
        ball.y = cp.y;

        ball.vec = getReflectionVector(ball.vec, v);
    }
    render();
    requestAnimationFrame(loop);
}

function getIntersectionPoint(pa, pb, pc, pd) {
    var va = new Vector2d(pb.x - pa.x, pb.y - pa.y);
    var vb = new Vector2d(pd.x - pc.x, pd.y - pc.y);
    var vc = new Vector2d(pc.x - pa.x, pc.y - pa.y);

    var t = vc.dot(va.normal()) / vb.dot(va.normal()) * -1;
    var s = vc.dot(vb.normal()) / va.dot(vb.normal());

    if (t < 0 || t > 1 || s < 0 || s > 1)
    {
        return null;
    }

    var r = vb.scale(t).add(vc);

    return {x: pa.x + r.vx, y: pa.y + r.vy}
}

function getReflectionVector(va, vb) {
    var vn = vb.normal().normalize(),
        vp = vn.scale(va.scale(-1).dot(vn));

    return vp.scale(2).add(va).scale(bounce);
}


