/*
    <소스 이해를 위한 캔버스 기초>
    즉시모드

    <속도>
    시간당 운동량

    <가속도>
    가속 - 속도를 높히다
    감속 - 속도를 낮추다
 */

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');


var ball = new Ball(context);

ball.x = 0;
ball.y = 400;
ball.ax = 0.1;
ball.ay = 0.1;
ball.vx = 5;
ball.vy = 5;

render();
requestAnimationFrame(loop);

function render() {
    context.clearRect(0,0, canvas.width, canvas.height);
    ball.draw();
}

function loop() {

    if(ball.vx > 0)
    {
        ball.vx -= ball.ax;
        ball.x += ball.vx;
        ball.vy -= ball.ay;
        ball.y += ball.vy;
    }

    render();
    requestAnimationFrame(loop);
}


