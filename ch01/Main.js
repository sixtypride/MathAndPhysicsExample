/*
    소스 이해를 위한 캔버스 기초

    라디언의 이해

    도, 라디언 변환

    삼각 함수의 정의 및 기초
 */

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

var speed = 5,
    angle = 360;


var ball = new Ball(context);

ball.x = 100;
ball.y = 100;


requestAnimationFrame(loop);

function render() {
    context.clearRect(0,0, canvas.width, canvas.height);
    ball.draw();
}

function loop() {

    var radian = angle * Math.PI/180;

    ball.x += speed * Math.cos(radian);
    ball.y += speed * Math.sin(radian);

    render();
    requestAnimationFrame(loop);
}

