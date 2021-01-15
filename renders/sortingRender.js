import { RenderWrap } from "./renderWrap.js";

export class SortingRender extends RenderWrap {
	#sortBy = []

	constructor(render, ...sortBy) {
		super(render)
		if (sortBy) this.#sortBy = sortBy.slice()
	}

	#cache = []

	clear(x, y, wi, he) {
		super.clear(x, y, wi, he)
		this.#sortBy.forEach(param => {
			this.#cache.sort((o1, o2) => { return o1[param] - o2[param] })
		})

		this.#cache.forEach(o => { o.f() })
		this.#cache = []
	}

	rect(x, y, wi, he, color, fill) {
		const c = { f: () => { super.rect(x, y, wi, he, color, fill) } }
		this.#sortBy.forEach(param => {
			if (param == 'x') c[param] = x;
			if (param == 'y') c[param] = y;
			if (param == 'wi') c[param] = wi;
			if (param == 'he') c[param] = he;
			if (param == 'color') c[param] = color;
			if (param == 'fill') c[param] = fill;
		})
		this.#cache.push(c)
	}

	circle(x, y, radius, color, fill) {
		const c = { f: () => { super.circle(x, y, radius, color, fill) } }
		this.#sortBy.forEach(param => {
			if (param == 'x') c[param] = x;
			if (param == 'y') c[param] = y;
			if (param == 'radius') c[param] = radius;
			if (param == 'color') c[param] = color;
			if (param == 'fill') c[param] = fill;
		})
		this.#cache.push(c)
	}

	text(x, y, text, color, font, fill) {
		const c = { f: () => { super.text(x, y, text, color, font, fill) } }
		this.#sortBy.forEach(param => {
			if (param == 'x') c[param] = x;
			if (param == 'y') c[param] = y;
			if (param == 'text') c[param] = text;
			if (param == 'font') c[param] = font;
			if (param == 'color') c[param] = color;
			if (param == 'fill') c[param] = fill;
		})
		this.#cache.push(c)
	}

	sprite(x, y, wi, he, image) {
		const c = { f: () => { super.sprite(x, y, wi, he, image) } }
		this.#sortBy.forEach(param => {
			if (param == 'x') c[param] = x;
			if (param == 'y') c[param] = y;
			if (param == 'wi') c[param] = wi;
			if (param == 'he') c[param] = he;
		})
		this.#cache.push(c)
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		const c = { f: () => { super.tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) } }
		this.#sortBy.forEach(param => {
			if (param == 'x') c[param] = x;
			if (param == 'y') c[param] = y;
			if (param == 'wi') c[param] = wi;
			if (param == 'he') c[param] = he;
		})
		this.#cache.push(c)
	}
}