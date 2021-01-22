import { Circle } from "./circle.js";

export class WanderingCircle extends Circle {
	dx = 0;
	dy = 0;
	constructor(x, y, radius, color, fill, name, maxX, maxY) {
		super(x, y, radius, color, fill, name);

		setInterval(() => {
			//changes direction randomly
			this.dx = (Math.random() - 0.5) * 2;
			this.dy = (Math.random() - 0.5) * 2;

			//keeps in limets
			if ((this.x <= radius && this.dx < 0) ||
				(this.x - radius > maxX && this.dx > 0))
				this.dx = -this.dx;

			if ((this.y <= radius && this.dy < 0) ||
				(this.y - radius > maxY && this.dy > 0))
				this.dy = -this.dy;
		}, 400);
	}

	act(action, args) {
		super.act(action, args);
		this.x += this.dx;
		this.y += this.dy;
	}
}
