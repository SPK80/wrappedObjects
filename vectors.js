export class Vector {
	#x = 0;
	get x() { return this.#x }
	set x(x) { this.#x = x }
	#y = 0;
	get y() { return this.#y }
	set y(y) { this.#y = y }

	constructor(x = 0, y = 0) {
		this.#x = x;
		this.#y = y;
	}

	scale(scalar) {
		return new Vector(this.#x * scalar, this.#y * scalar);
	}

	add(vector) {
		return new Vector(this.#x + vector.x, this.#y + vector.y);
	}

	sub(vector) {
		return new Vector(this.#x - vector.x, this.#y - vector.y);
	}

	normalize() {
		return this.scale(1.0 / this.length);
	}

	get length() {
		return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
	}
}