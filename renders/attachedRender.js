import { DrawingObject } from "../objects/drawingObject.js";
import { RenderWrap } from "./renderWrap.js";

export class AttachedRender extends RenderWrap {

	#target;
	constructor(render, target) {
		super(render);
		// if (!(target instanceof DrawingObject)) throw ('target must by instanceof DrawingObject')
		this.#target = target;

	}

	rect(x, y, wi, he, color, fill) {
		super.rect(x + this.#target.get('x'), y + this.#target.get('y'), wi, he, color, fill);
	}

	circle(x, y, radius, color, fill) {
		super.circle(x + this.#target.get('x'), y + this.#target.get('y'), radius, color, fill);
	}

	text(text, x, y, color, font, fill) {
		super.text(text, x + this.#target.get('x'), y + this.#target.get('y'), color, font, fill);
	}

	sprite(image, x, y, wi, he) {
		super.sprite(image, x + this.#target.get('x'), y + this.#target.get('y'), wi, he);
	}

	tile(image, x, y, wi, he, tiX, tiY, tiWi, tiHe) {
		super.tile(image, x + this.#target.get('x'), y + this.#target.get('y'), wi, he, tiX, tiY, tiWi, tiHe,);
	}
}