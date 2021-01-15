import { RenderWrap } from "./renderWrap.js";

export class ShakingRender extends RenderWrap {
	#force = 0;
	#x = 0;
	#y = 0;

	constructor(render, force) {
		super(render, 0, 0);
		if (force)
			this.#force = force;
	}
	#cleared = true;
	_calc() {
		if (this.#cleared) {
			this.#x = ((Math.random() - 0.5) * this.#force) * 2;
			this.#y = ((Math.random() - 0.5) * this.#force) * 2;
			this.#cleared = false;
		}
	}

	clear(x, y, wi, he) {
		super.clear(x, y, wi, he);
		this.#cleared = true;
	}

	rect(x, y, wi, he, color, fill) {
		this._calc();
		super.rect(x + this.#x, y + this.#y, wi, he, color, fill);
	}

	circle(x, y, radius, color, fill) {
		this._calc();
		super.circle(x + this.#x, y + this.#y, radius, color, fill);
	}

	text(x, y, text, color, font, fill) {
		this._calc();
		super.text(x + this.#x, y + this.#y, text, color, font, fill);
	}

	sprite(x, y, wi, he, image) {
		this._calc();
		super.sprite(x + this.#x, y + this.#y, wi, he, image);
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		this._calc();
		super.tile(x + this.#x, y + this.#y, wi, he, tiX, tiY, tiWi, tiHe, image);
	}

}