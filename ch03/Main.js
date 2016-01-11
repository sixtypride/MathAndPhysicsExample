/*
 <중력>
 각을 가진 속도

 <경계>
 경계와 충돌 검출

 <바운드>
 속도가 음수가 되면 방향이 반전된다
 */

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();

    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    }
}

var ball = new Ball(context);

var startX = 0,
    startY = 400;
var speed = 20;
var radian;
var bounce = -0.9;
var gravity = 0.4;

ball.x = startX;
ball.y = startY;

canvas.onmousedown = function(e) {
    var loc = windowToCanvas(e.clientX, e.clientY);

    radian = Math.atan2(loc.y - ball.y, loc.x - ball.x);

    ball.vx = speed * Math.cos(radian);
    ball.vy = speed * Math.sin(radian);
}


render();
requestAnimationFrame(loop);

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
}

function loop() {

    ball.angle = Math.atan2(ball.vy, ball.vx);

    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;

    if(ball.x > canvas.width - ball.radius)
    {
        ball.x = canvas.width - ball.radius;
        ball.vx *= bounce;
    }
    else if(ball.x < ball.radius)
    {
        ball.x = ball.radius;
        ball.vx *= bounce;
    }
    else if(ball.y > canvas.height - ball.radius)
    {
        ball.y = canvas.height - ball.radius;
        ball.vy *= bounce;
    }

    render();
    requestAnimationFrame(loop);
}


