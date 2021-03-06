import { ListeningNode, Node } from "./node.js"
import { Object } from "./object.js";
import { DrawingObject, PositionObject, Render } from "./wrappers.js";

const r = new Render();

const o = new DrawingObject(r,
	new PositionObject(
		new Object('Owner')));

const n = new ListeningNode(o,
	(sender, type, args) => {

		if (args && typeof args[Symbol.iterator] === 'function')
			console.log(sender.name, type, ...args)
		else
			console.log(sender.name, type, args);

		if (type == 'Delete') {
			n.del(sender.name);
		}

		// console.log(sender, o);
		if (type == 'Draw' && sender.name == 'Owner') {
			n.objects.forEach(obj => {
				obj.act('Draw')
			});
		}
	}
);

const obj1 = new DrawingObject(r,
	new PositionObject(
		new Object('obj1')));

n.add(obj1);
obj1.act('Move', [1, 2])

const obj2 = new DrawingObject(r,
	new PositionObject(
		new Object('obj2')));

n.add(obj2);
obj2.act('Move', [3, 4])

n.act('Move', [3, 4])
n.act('Draw');

n.act('Shift', [-1, 1])
n.act('Draw');