function Ball(context) {
    this._context = context;
    this.x = 0;
    this.y = 0;
    this.radius = 10;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.color = "black";
}

Ball.prototype = {
    draw: function() {
        this._context.save();

        this._context.translate(this.x, this.y);
        this._context.rotate(this.angle);

        this._context.beginPath();
        this._context.arc(0,0, this.radius, 0, Math.PI * 2);
        this._context.fillStyle = this.color;
        this._context.fill();
        //this._context.fillRect(-50, -5, 50, 10);

        this._context.restore();
    }
};