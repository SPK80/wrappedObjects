import { RenderWrap } from "./renderWrap.js";

export class AttachedRender extends RenderWrap {

	#target;
	constructor(render, target) {
		super(render);
		this.#target = target;
	}

	rect(x, y, wi, he, color, fill) {
		super.rect(x + this.#target.x, y + this.#target.y, wi, he, color, fill);
	}

	circle(x, y, radius, color, fill) {
		super.circle(x + this.#target.x, y + this.#target.y, radius, color, fill);
	}

	text(x, y, text, color, font, fill) {
		super.text(x + this.#target.x, y + this.#target.y, text, color, font, fill);
	}

	sprite(x, y, wi, he, image) {
		super.sprite(x + this.#target.x, y + this.#target.y, wi, he, image);
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		super.tile(x + this.#target.x, y + this.#target.y, wi, he, tiX, tiY, tiWi, tiHe, image);
	}
}