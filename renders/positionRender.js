import { RenderWrap } from "./renderWrap.js";

export class PositionRender extends RenderWrap {

	#attachedObject;
	constructor(render, attachedObject) {
		super(render);
		this.#attachedObject = attachedObject;
	}

	rect(x, y, wi, he, color, fill) {
		super.rect(x + this.#attachedObject.x, y + this.#attachedObject.y, wi, he, color, fill);
	}

	circle(x, y, radius, color, fill) {
		super.circle(x + this.#attachedObject.x, y + this.#attachedObject.y, radius, color, fill);
	}

	text(x, y, text, color, font, fill) {
		super.text(x + this.#attachedObject.x, y + this.#attachedObject.y, text, color, font, fill);
	}

	sprite(x, y, wi, he, image) {
		super.sprite(x + this.#attachedObject.x, y + this.#attachedObject.y, wi, he, image);
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		super.tile(x + this.#attachedObject.x, y + this.#attachedObject.y, wi, he, tiX, tiY, tiWi, tiHe, image);
	}
}