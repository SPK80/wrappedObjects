import { IRender } from "../renders/canvasRender.js";
import { DrawingObject } from "./drawingObject.js";

export class Tile extends DrawingObject {
	#width = 0;
	get width() { return this.#width; }

	#height = 0;
	get height() { return this.#height; }

	#tX = 0;
	#tY = 0;
	#image;

	constructor(image, width, height, nX, nY) {
		super('Tile');
		this.#image = image;
		if (!isNaN(width))
			this.#width = width;
		if (!isNaN(height))
			this.#height = height;
		if (!isNaN(nX))
			this.#tX = nX * this.#width;
		if (!isNaN(nY))
			this.#tY = nY * this.#height;
	}

	act(action, args) {
		if (action == 'Draw' && args.render && args.render instanceof IRender) {
			args.render.tile(this.#image,
				this.x, this.y,
				this.#width, this.#height,
				this.#tX, this.#tY,
				this.#width, this.#height
			);
			// this._callEvent('Draw', { render: args.render });
		}
	}
}
