/**
 * Created by sixtypride on 2016. 1. 12..
 */

function Shooter(context) {
    this._context = context;
    this.x = 0;
    this.y = 0;
}

Shooter.prototype = {
    draw: function() {
        this._context.save();

        this._context.translate(this.x, this.y);
        this._context.rotate(this.angle);
        this._context.beginPath();
        this._context.fillRect(0, -1, 800, 2);

        this._context.restore();
    }
}
