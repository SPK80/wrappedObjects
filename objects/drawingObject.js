import { Object } from "./object.js";

export class DrawingObject extends Object {
	#x = 0;
	get x() { return this.#x }
	set x(val) {
		if (isNaN(val)) return
		this.#x = val;
	}

	#y = 0;
	get y() { return this.#y }
	set y(val) {
		if (isNaN(val)) return
		this.#y = val;
	}
}

export class Shaker extends DrawingObject {
	#force;
	constructor(name, force) {
		super(name)
		this.#force = force;
	}
	get x() { return super.x + ((Math.random() - 0.5) * this.#force) * 2 }
	get y() { return super.y + ((Math.random() - 0.5) * this.#force) * 2 }
}