function Line(context, startPt, endPt) {
    this.context = context;
    this.startPt = startPt;
    this.endPt = endPt;
}

Line.prototype = {
    draw : function () {
        this.context.save();

        this.context.beginPath();
        this.context.moveTo(this.startPt.x, this.startPt.y);
        this.context.lineTo(this.endPt.x, this.endPt.y);
        this.context.stroke();

        this.context.restore();
    },
    getLength: function() {
        return Math.sqrt((this.endPt.x-this.startPt.x) * (this.endPt.x-this.startPt.x) + (this.endPt.y-this.startPt.y)* (this.endPt.y-this.startPt.y));
    },
    rotate : function (r) {
        this.rotatePt(this.startPt, r);
        this.rotatePt(this.endPt, r);
    },
    rotatePt : function (pt, r) {
        var x = pt.x;
        var y = pt.y;
        pt.x = Math.cos(r) * x - Math.sin(r) * y;
        pt.y = Math.sin(r) * x + Math.cos(r) * y;
    }
}