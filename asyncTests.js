import { CanvasRender } from "./renders/canvasRender.js";
import { Circle } from "./objects/circle.js";
import { Tile } from "./objects/tile.js";
import { SortingRender } from "./renders/SortingRender.js";
import { AttachedRender } from "./renders/attachedRender.js";
import { DrawingObject, Shaker } from "./objects/drawingObject.js";
import { IObject } from "./objects/object.js";
import { Owner, IOwner } from "./objects/owner.js";
import { DrawingOwnerWrap } from "./objects/drawingOwnerWrap.js";
import { WanderingCircle } from "./objects/wanderingCircle.js";
import { Scene } from "./objects/Scene.js";

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
		const r =
			//new SortingRender(
			new CanvasRender(800, 800, '#00E0A0')
		// 'y')

		const c = new WanderingCircle(300, 250, 50, '#F000F1', true, 'WanderingCircle', 800, 800)
		const c1 = new Circle(0, -50, 20, '#0000F0', true, 'Circle1')
		const c2 = new Circle(100, 10, 10, '#F00000', true, 'Circle2')
		const t = new Tile(image, 32, 32, 0, 9);
		t.x = 70;
		t.y = 150;

		const shaker = new Shaker('shaker', 5);
		// const n = new DrawingNodeWrap(
		// 	new Node(c),
		// 	new AttachedRender(new AttachedRender(r, shaker), c)
		// )

		// n.add(c)
		// n.add(c1)
		// n.add(t)

		// const n1 = new DrawingNodeWrap(
		// 	new Node(c1),
		// 	new PositionRender(r, c1)
		// )
		// n1.add(c2)
		const w1 = new DrawingOwnerWrap(new Owner(c), c)
		w1.add(c1)
		// w1.add(c2)

		const w2 = new DrawingOwnerWrap(new Owner(c2), c2)
		w2.add(t)

		const scene = new Scene('123')
		scene.add(w1)
		scene.add(w2)

		setInterval(
			() => {
				// r.sprite(0, 0, image.width, image.height, image)
				// r.clear(0, 0, 100, 200)
				// r.circle(100, 200, 100, '#F00000', true)
				// c.act('Draw', { render: r })
				// c.fill = !c.fill
				// c.radius = Math.abs(256 * Math.sin(r.x / 3.14))
				// c.color = `#F0${decimalToHexString(Math.round(c.radius - 1))}00`
				// n.draw()
				scene.act('Draw', { render: r })
				// c.y++
				c1.y = Math.sin((c.x + c.y) * 0.1) * 50
				c1.x = Math.cos((c.x + c.y) * 0.1) * 50


				c2.x++
				c2.y = Math.sin((c2.x) * 0.1) * 50 + 10
				// c.y += 10 * Math.sin(c.x / 3.14)
				// c1.y++
				// c2.x = 20 * Math.sin(2 * c.x / 3.14)
				// c2.y = 20 * Math.cos(c.x / 3.14)

				// t.act('Draw', { render: r })
				// t.x++;
				// t.x++;
				// t.y++;
				// t.y++;
			},
			1000 / 60
		)
	})
	.catch(console.error)