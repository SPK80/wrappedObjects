import { IRender } from "../renders/canvasRender.js";
import { DrawingObject } from "./drawingObject.js";

export class Circle extends DrawingObject {

	#radius = 0;
	get radius() { return this.#radius }
	set radius(val) {
		if (isNaN(val))
			return;
		this.#radius = val;
	}

	#color = 0;
	get color() { return this.#color }
	set color(val) {
		this.#color = val;
	}

	#fill = 0;
	get fill() { return this.#fill }
	set fill(val) {
		this.#fill = val;
	}

	constructor(x, y, radius, color, fill, name) {
		if (name) super(name)
		else super('TestObject');

		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.fill = fill;
	}

	act(action, args) {
		if (action == 'Draw' && args.render && args.render instanceof IRender) {
			args.render.circle(this.x, this.y, this.#radius, this.#color, this.#fill);
			args.render.text(this.name, this.x - this.#radius, this.y - this.#radius, this.color, '14px arial')
			// this._callEvent('Draw', { render: args.render })
		}
	}
}