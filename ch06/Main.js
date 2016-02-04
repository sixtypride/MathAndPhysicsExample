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

var ball = new Ball(context);
var shooter = new Shooter(context);

var startX = 100,
    startY = canvas.height - 100;
var speed = 20;
var bounce = -0.9;
var gravity = 0.1;

ball.x = startX;
ball.y = startY;

shooter.x = startX;
shooter.y = startY;

canvas.onmousedown = function(e) {
    var loc = windowToCanvas(e.clientX, e.clientY);

    ball.x = startX;
    ball.y = startY;

    var vector = new Vector2d(loc.x - ball.x, loc.y - ball.y);

    vector = vector.normalize().scale(speed);

    ball.vx = vector.vx;
    ball.vy = vector.vy;
};

canvas.onmousemove = function(e) {
    var loc = windowToCanvas(e.clientX, e.clientY);

    shooter.angle = Math.atan2(loc.y - startY, loc.x - startX);
}

render();
requestAnimationFrame(loop);

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();

    context.beginPath();
    context.moveTo(0, canvas.height);
    context.lineTo(Math.cos(-30 * Math.PI/180) * 1500, canvas.height + Math.sin(-30 * Math.PI/180) * 1500);
    context.stroke();

    shooter.draw();
}

function loop() {

    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;


    var radian = -30 * Math.PI / 180;
    var cos = Math.cos(radian);
    var sin = Math.sin(radian);

    var x1 = ball.x;
    var y1 = ball.y - canvas.height;

    var x2 = cos * x1 + sin * y1;
    var y2 = cos * y1 - sin * x1;

    var vx1 = cos * ball.vx + sin * ball.vy;
    var vy1 = cos * ball.vy - sin * ball.vx;

    if(y2 > -ball.radius) {
        y2 = -ball.radius;
        vy1 *= bounce;
    }

    x1 = cos * x2 - sin * y2;
    y1 = cos * y2 + sin * x2;

    ball.vx = cos * vx1 - sin * vy1;
    ball.vy = cos * vy1 + sin * vx1;

    ball.x = x1;
    ball.y = y1 + canvas.height;

    if (ball.x > canvas.width - ball.radius) {
        ball.x = canvas.width - ball.radius;
        ball.vx *= bounce;
    }
    else if (ball.x < ball.radius) {
        ball.x = ball.radius;
        ball.vx *= bounce;
    }
    else if (ball.y < ball.radius) {
        ball.y = ball.radius;
        ball.vy *= bounce;
    }
    else if (ball.y > canvas.height - ball.radius) {
        ball.y = canvas.height - ball.radius;
        ball.vy *= bounce;
    }

    render();
    requestAnimationFrame(loop);
}


