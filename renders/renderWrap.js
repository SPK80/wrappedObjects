import { Render } from "./canvasRender.js";

export class RenderWrap extends Render {
	#render;
	get render() { return this.#render; }

	constructor(render) {
		super();
		this.#render = render;
	}
}
