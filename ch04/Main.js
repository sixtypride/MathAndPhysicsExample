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
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    }
}

var ball = new Ball(context);
var shooter = new Shooter(context);



var startX = 20,
    startY = canvas.height - 20;
var speed = 25;
var bounce = -0.9;
var gravity = 0.5;

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
    shooter.draw();
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


