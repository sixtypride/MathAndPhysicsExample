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
ball.radius = 10;

var line2 = new Line(context, {x: 300, y: 200}, {x: 300, y: 300});
lines.push(line2);
var line3 = new Line(context, {x: 700, y: 290}, {x: 100, y: 300});
lines.push(line3);

requestAnimationFrame(loop);

function loop(time){

    line2.endPt.x = 100 + Math.cos(time / 1000) * 600;
    line2.endPt.y = 100 + Math.sin(time / 1000) * 600;

    line3.endPt.y = 100 + Math.cos(time / 1000) * 400;
    line3.endPt.x = 100 + Math.cos(time / 1000) * 400;

    intersection(line2, line3);
    render();

    requestAnimationFrame(loop);
}


function intersection(l1, l2)
{
    var a = new Vector2d(l2.endPt.x - l2.startPt.x, l2.endPt.y - l2.startPt.y);
    var b = new Vector2d(l1.endPt.x - l1.startPt.x, l1.endPt.y - l1.startPt.y)
    var c = new Vector2d(l2.startPt.x - l1.startPt.x, l2.startPt.y - l1.startPt.y);

    var t = c.dotProduct(b.normal()) / a.dotProduct(b.normal()) * -1;
    var s = c.dotProduct(a.normal()) / b.dotProduct(a.normal());

    if(t <= 0 || t >= 1 || s <= 0 || s >= 1) return;

    var r = a.scale(t).add(c);

    ball.x = l1.startPt.x + r.vx;
    ball.y = l1.startPt.y + r.vy;
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    for(var i = 0; i < lines.length; i++)
        lines[i].draw();
}




