import { Object } from "./object.js";

export class DrawingObject extends Object {
	#x = 0;
	// get x() { return this.#x }
	// set x(val) {
	// 	if (isNaN(val)) return
	// 	this.#x = val;
	// }

	#y = 0;
	// get y() { return this.#y }
	// set y(val) {
	// 	if (isNaN(val)) return
	// 	this.#y = val;
	// }

	get(...args) {
		if (args.length <= 0) return
		if (args.length > 1) {
			const result = {}
			args.forEach(arg => {
				if (arg == 'x') result.x = this.#x
				if (arg == 'y') result.y = this.#y
			})
		}
		else {
			if (args == 'x') return this.#x
			else if (arg == 'y') return this.#y
		}
	}

	do(action, args) {
		if (action == 'move') {
			if (!isNaN(args.x)) this.#x = args.x
			if (!isNaN(args.y)) this.#y = args.y
		}
		else if (action == 'shift') {
			if (!isNaN(args.x)) this.#x += args.x
			if (!isNaN(args.y)) this.#y += args.y
		}
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