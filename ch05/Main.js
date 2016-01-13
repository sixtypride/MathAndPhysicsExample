/*
 <좌표 변환>

 이동 변환
 크기 변환
 회전 변환

 ax + by + c = 0 모든 변환은 일차방정식으로 표현할 수 있다
 x' = ax + cy + e;
 y' = bx + dy + f;

*/

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');


var leftTop = { x:0, y:0 }
var rightTop = { x:100, y:0 }
var leftBottom = { x:0, y:100 }
var rightBottom = { x:100, y:100 }


// 이동 변환 translate
// x' = x + dx;
// y' = y + dy;

function translate(pt, dx, dy) {
    pt.x = pt.x + dx;
    pt.y = pt.y + dy;
}

// 크기 변환 scale
// x' = x * sx;
// y' = y * sy;

function scale(pt, sx, sy) {
    pt.x = pt.x * sx;
    pt.y = pt.y * sy;
}

// 회전 변환 rotate
// x' = cos(r) * x - sin(r) * y;
// y' = sin(r) * x + cos(r) * y;

function rotate(pt, r) {
    var x = pt.x;
    var y = pt.y;
    pt.x = Math.cos(r) * x - Math.sin(r) * y;
    pt.y = Math.sin(r) * x + Math.cos(r) * y;
}

function transform(pt, a, b, c, d, e, f) {
    var x = pt.x,
        y = pt.y;

    pt.x = a * x + c * y + e;
    pt.y = b * x + d * y + f;
}


var dx = 100, dy = 100;

translate(leftTop, dx, dy);
translate(rightTop, dx, dy);
translate(rightBottom, dx, dy);
translate(leftBottom, dx, dy);


dx = -150, dy = -150;

translate(leftTop, dx, dy);
translate(rightTop, dx, dy);
translate(rightBottom, dx, dy);
translate(leftBottom, dx, dy);


var ax = 2, ay = 2;
/*
scale(leftTop, ax, ay);
scale(rightTop, ax, ay);
scale(rightBottom, ax, ay);
scale(leftBottom, ax, ay);
*/

transform(leftTop, ax, 0, 0, ay, 0, 0);
transform(rightTop, ax, 0, 0, ay, 0, 0);
transform(rightBottom, ax, 0, 0, ay, 0, 0);
transform(leftBottom, ax, 0, 0, ay, 0, 0);

dx = 150, dy = 150;

translate(leftTop, dx, dy);
translate(rightTop, dx, dy);
translate(rightBottom, dx, dy);
translate(leftBottom, dx, dy);


dx = -150, dy = -150;

translate(leftTop, dx, dy);
translate(rightTop, dx, dy);
translate(rightBottom, dx, dy);
translate(leftBottom, dx, dy);

var r = 45 * Math.PI/180;

rotate(leftTop, r);
rotate(rightTop, r);
rotate(rightBottom, r);
rotate(leftBottom, r);

dx = 150, dy = 150;

translate(leftTop, dx, dy);
translate(rightTop, dx, dy);
translate(rightBottom, dx, dy);
translate(leftBottom, dx, dy);

/*

*/


function draw() {
    context.save();

    context.globalAlpha = 0.3;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(100, 0);
    context.lineTo(100, 100);
    context.lineTo(0, 100);
    context.closePath();
    context.stroke();

    context.restore();

    context.save();

    context.beginPath();
    context.moveTo(leftTop.x, leftTop.y);
    context.lineTo(rightTop.x, rightTop.y);
    context.lineTo(rightBottom.x, rightBottom.y);
    context.lineTo(leftBottom.x, leftBottom.y);
    context.closePath();
    context.stroke();

    context.restore();
}


draw();


