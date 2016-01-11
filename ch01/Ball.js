function Ball(context) {
    this._context = context;
    this.x = 0;
    this.y = 0;
    this.radius = 10;
}

Ball.prototype = {
    draw: function() {
        this._context.save();

        this._context.translate(this.x, this.y);
        this._context.beginPath();
        this._context.arc(0,0, this.radius, 0, Math.PI * 2);
        this._context.fillStyle = "red";
        this._context.fill();

        this._context.restore();
    }
};