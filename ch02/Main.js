/*
 <각속도>
 각을 가진 속도

 <라디언의 이해>
 원주율 : 원의 둘레 / 지름 = 3.14.... = PI
 호도법 : 각도를 호의 길이로써 표현하는 방법
 PI(3.14.....) = 180

 <도, 라디언 변환>
 라디언 = 도 * Math.PI / 180
 도 = 라디언 * 180 / Math.PI

 <삼각 함수의 정의 및 기초>
 직각삼각형일 때
 cos(r) = 밑변 / 빗변
 sin(r) = 높이 / 빗변
 tan(r) = 높이 / 밑변

 <역삼각함수>
 아크사인 아크코사인 아크탄젠트
 비율을 입력하면 각이 나온다
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
var speed = 5;
var radian;

ball.x = startX;
ball.y = startY;


canvas.onmousedown = function(e) {
    var loc = windowToCanvas(e.clientX, e.clientY);

    radian = Math.atan2(loc.y - startY, loc.x - startX);

    ball.x = startX;
    ball.y = startY;
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
    ball.x += ball.vx;
    ball.y += ball.vy;

    render();
    requestAnimationFrame(loop);

}


