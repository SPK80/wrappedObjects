import { IRender } from "./canvasRender.js";

export class RenderWrap extends IRender {
	#render;
	// get render() { return this.#render; }

	constructor(render) {
		super();
		this.#render = render;
	}

	clear(x, y, wi, he) {
		this.#render.clear(x, y, wi, he)
	}

	rect(x, y, wi, he, color, fill) {
		this.#render.rect(x, y, wi, he, color, fill)
	}

	circle(x, y, radius, color, fill) {
		this.#render.circle(x, y, radius, color, fill)
	}

	text(text, x, y, color, font, fill) {
		this.#render.text(text, x, y, color, font, fill)
	}

	sprite(image, x, y, wi, he) {
		this.#render.sprite(image, x, y, wi, he)
	}

	tile(image, x, y, wi, he, tiX, tiY, tiWi, tiHe) {
		this.#render.tile(image, x, y, wi, he, tiX, tiY, tiWi, tiHe)
	}
}