/*

    Math.atan
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

