import { Render } from "./canvasRender.js";

export class RenderWrap extends Render {
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

	text(x, y, text, color, font, fill) {
		this.#render.text(x, y, text, color, font, fill)
	}

	sprite(x, y, wi, he, image) {
		this.#render.sprite(x, y, wi, he, image)
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		this.#render.tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image)
	}
}
