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

function drawBody(body) {
	render.circle(body.pos.x, body.pos.y, body.size, body.color, true);
	// render.text(body.pos.x - body.size, body.pos.y, `${body.velocity.x} ${body.velocity.y}`, 'yellow', '12px serif', true);
}

setInterval(() => {
	render.clear();
	if (phisics.collide(body1, body2)) {
		phisics.hit(body1, body2);		
	}
	phisics.gravi(body1, body2);
	phisics.gravi(body2, body1);
	phisics.motion(body1);
	phisics.motion(body2);


	drawBody(body1);
	drawBody(body2);
}, 50);