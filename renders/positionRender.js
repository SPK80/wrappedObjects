import { RenderWrap } from "./renderWrap.js";


export class SortingRender extends RenderWrap {

	constructor(render, sortBy) {
		super();
		this.#render = render;
	}

	#cache = [];
	sort(){
		this.#cache

	// 	if (this.#sortBy.x)
	// 	objects.sort((o1, o2) => { o1.x - o2.x })
	// if (this.#sortBy.y)
	// 	objects.sort((o1, o2) => { o1.y - o2.y })
	// if (this.#sortBy.z)
	this.#cache.sort((o1, o2) => { o1.z - o2.z })

	}

	clear(x, y, wi, he) {
		this.render.clear(x, y, wi, he);
	}

	rect(x, y, wi, he, color, fill) {
		this.#cache.push({ func: 'rect', x: x, y: y, wi: wi, he: he, color: color, fill: fill })
	}

	circle(x, y, radius, color, fill) {
	}

	text(x, y, text, color, font, fill) {
	}

	sprite(x, y, wi, he, image) {
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
	}
}

export class PositionRender extends RenderWrap {
	#x = 0;
	get x() { return this.#x; }
	set x(val) {
		if (isNaN(val))
			return;
		this.#x = val;
	}

	#y = 0;
	get y() { return this.#y; }
	set y(val) {
		if (isNaN(val))
			return;
		this.#y = val;
	}

	constructor(render, x, y) {
		super(render);
		this.x = x;
		this.y = y;
	}

	clear(x, y, wi, he) {
		this.render.clear(x + this.#x, y + this.#y, wi, he);
	}

	rect(x, y, wi, he, color, fill) {
		this.render.rect(x + this.#x, y + this.#y, wi, he, color, fill);
	}

	circle(x, y, radius, color, fill) {
		this.render.circle(x + this.#x, y + this.#y, radius, color, fill);
	}

	text(x, y, text, color, font, fill) {
		this.render.text(x + this.#x, y + this.#y, text, color, font, fill);
	}

	sprite(x, y, wi, he, image) {
		this.render.sprite(x + this.#x, y + this.#y, wi, he, image);
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		this.render.tile(x + this.#x, y + this.#y, wi, he, tiX, tiY, tiWi, tiHe, image);
	}
}
