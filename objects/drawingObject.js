import { Object } from "./object.js";



export class DrawingObject extends Object {
	#x = 0;
	get x() { return this.#x; }
	set x(val) {
		if (isNaN(val))
			return;
		this.#x = val;
	}

	#y = 0;
	get y() { return this.#y; }
	set y(val) {
		if (isNaN(val))
			return;
		this.#y = val;
	}

}
