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
    }
}