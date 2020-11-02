import { CanvasRender } from "./canvasRender.js";
import { phisics } from "./phisics.js";
import { Vector } from "./vectors.js";

const render = new CanvasRender(800, 600, '#608560');
const body1 = {
	mass: 1,
	velocity: new Vector(2, 1),
	pos: new Vector(50, 200),
	size: 50,
	color: 'red',
}

const body2 = {
	mass: 10,
	velocity: new Vector(0, 1),
	pos: new Vector(300, 200),
	size: 50,
	color: 'blue',
}

// phisics.hit(body1, body2);
console.log(body1);
console.log(body2);

function drawBody(body) {
	render.circle(body.pos.x, body.pos.y, body.size, body.color, true);
	render.text(body.pos.x - body.size, body.pos.y, `${body.velocity.x} ${body.velocity.y}`, 'yellow', '12px serif', true);
}

setInterval(() => {
	render.clear();
	phisics.motion(body1);
	phisics.motion(body2);
	if (phisics.collide(body1, body2)) {
		phisics.hit(body1, body2);
		// console.log(body1);
		// console.log(body2);
	}
	drawBody(body1);
	drawBody(body2);
}, 50);

