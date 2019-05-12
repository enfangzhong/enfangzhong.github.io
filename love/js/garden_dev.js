	    function Vector(x, y) {
	        this.x = x;
	        this.y = y;
	    };
		
	    Vector.prototype = {
	        rotate: function (theta) {
	            var x = this.x;
	            var y = this.y;
	            this.x = Math.cos(theta) * x - Math.sin(theta) * y;
	            this.y = Math.sin(theta) * x + Math.cos(theta) * y;
	            return this;
	        },
	        mult: function (f) {
	            this.x *= f;
	            this.y *= f;
	            return this;
	        },
	        clone: function () {
	            return new Vector(this.x, this.y);
	        },
	        length: function () {
	            return Math.sqrt(this.x * this.x + this.y * this.y);
	        },
	        subtract: function (v) {
	            this.x -= v.x;
	            this.y -= v.y;
	            return this;
	        },
	        set: function (x, y) {
	            this.x = x;
	            this.y = y;
	            return this;
	        }
	    };
		
	    function Petal(stretchA, stretchB, startAngle, angle, growFactor, bloom) {
	        this.stretchA = stretchA;
	        this.stretchB = stretchB;
	        this.startAngle = startAngle;
	        this.angle = angle;
	        this.bloom = bloom;
	        this.growFactor = growFactor;
	        this.r = 1;
	        this.isfinished = false;
	        //this.tanAngleA = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
	        //this.tanAngleB = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
	    }
	    Petal.prototype = {
	        draw: function () {
	            var ctx = this.bloom.garden.ctx;
	            var v1, v2, v3, v4;
	            v1 = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle));
	            v2 = v1.clone().rotate(Garden.degrad(this.angle));
	            v3 = v1.clone().mult(this.stretchA); //.rotate(this.tanAngleA);
	            v4 = v2.clone().mult(this.stretchB); //.rotate(this.tanAngleB);
	            ctx.strokeStyle = this.bloom.c;
	            ctx.beginPath();
	            ctx.moveTo(v1.x, v1.y);
	            ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y);
	            ctx.stroke();
	        },
	        render: function () {
	            if (this.r 