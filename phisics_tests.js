import { CanvasRender } from "./canvasRender.js";
import { phisics } from "./phisics.js";
import { Vector } from "./vectors.js";

const render = new CanvasRender(800, 600, '#608560');
const body1 = {
	mass: 1000,
	velocity: new Vector(10, 0),
	pos: new Vector(50, 200),
	size: 10,
	color: 'red',
}

const body2 = {
	mass: 100,
	velocity: new Vector(-5, -5),
	pos: new Vector(300, 300),
	size: 10,
	color: 'blue',
}

class Body {
	#mass = 1;
	get mass() { return this.#mass }

	#pos;
	get pos() { return this.#pos }

	#size;
	get size() { return this.#size }

	#velocity;
	get velocity() { return this.#velocity }

	constructor(mass, pos, size, velocity) {
		this.#mass = mass;
		this.#pos = pos;
		this.#size = size;
		this.#velocity = velocity;
	}
}

class View {
	#color;
	get color() { return this.#color }

	#body;
	get pos() { return this.#body.pos }

	get size() { return this.#body.size }

	constructor(body, color) {
		this.#body = body;
		this.#color = color;
	}
}

class Person {
	#body;
	get body() { return this.#body }

	#view;
	get view() { return this.#view }

	constructor(mass, pos, size, velocity, color) {
		this.#body = new Body(mass, pos, size, velocity);
		this.#view = new View(this.#body, color);
	}
}

const pers1 = new Person(1, new Vector(100, 200), 50, new Vector(), 'red');
const pers2 = new Person(1, new Vector(200, 100), 50, new Vector(), 'blue');

function drawCircle(view) {
	render.circle(view.pos.x, view.pos.y, view.size, view.color, true);
	// render.text(body.pos.x - body.size, body.pos.y, `${body.velocity.x} ${body.velocity.y}`, 'yellow', '12px serif', true);
}

setInterval(() => {
	render.clear();
	if (phisics.collide(body1, body2)) {
		phisics.hit(body1, body2);
	}
	// phisics.gravi(body1, body2);
	// phisics.gravi(body2, body1);
	// phisics.motion(body1);
	// phisics.motion(body2);


	drawCircle(pers1.view);
	drawCircle(pers2.view);
}, 50);