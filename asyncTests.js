
import { CanvasRender } from "./renders/canvasRender.js";
import { Circle } from "./objects/circle.js";
import { Tile } from "./objects/tile.js";
import { DrawingNode, Node } from "./nodes/node.js";
import { DrawingNodeWrap, SortingNodeWrap } from "./nodes/nodeWrap.js";

function decimalToHexString(number) {
	if (number < 0) {
		number = 0xFFFFFFFF + number + 1;
	}

	return number.toString(16).toUpperCase();
}


function load(src) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onerror = () => { throw (`${src} not loaded`) }
		image.onload = () => {
			if (image.width <= 0 || image.height <= 0) reject(`wrong image width or height`);
			resolve(image);
		}

		try {
			image.src = src;
		} catch (error) {
			reject(error)
		}
	})
}

load('tiles.png')
	.then(image => {
		const r = new CanvasRender(800, 800, '#00E0A0');
		const c = new Circle(100, 200, 100, '#F000F1', true)
		const c1 = new Circle(-20, 10, 10, '#0000F0', true)
		const c2 = new Circle(0, -10, 15, '#F00000', true)
		const t = new Tile(image, 32, 32, 0, 9);
		const n = new DrawingNodeWrap(new Node(c), { y: true });
		n.add(c1)
		n.add(c2)

		// c.color = '#00E0A0';
		// console.log(decimalToHexString(1000));
		setInterval(
			() => {
				r.clear()
				// r.sprite(0, 0, image.width, image.height, image)
				// r.clear(0, 0, 100, 200)
				// r.circle(100, 200, 100, '#F00000', true)
				c.act('Draw', { render: r })
				// c.fill = !c.fill
				// c.radius = Math.abs(256 * Math.sin(r.x / 3.14))
				// c.color = `#F0${decimalToHexString(Math.round(c.radius - 1))}00`
				c.x++
				c.y += 10 * Math.sin(c.x / 3.14)
				c1.y++
				c2.x = 20 * Math.sin(2 * c.x / 3.14)
				c2.y = 20 * Math.cos(c.x / 3.14)

				t.act('Draw', { render: r })
				t.x++;
				t.y++;

			},
			60
		)
	}
	)
	// .catch(console.error)
	.catch(console.error)