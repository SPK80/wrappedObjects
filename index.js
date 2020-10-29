import { Node } from "./node.js"
import { ListeningNode } from "./nodeWrap.js"
import { Object } from "./object.js";
import { DeletingObject, DrawingObject, MovingObject, Render, TimeoutObject } from "./wrappers.js";


const r = new Render();

const o = new DrawingObject(r, new Object('Owner'));

const n = new ListeningNode(
	new Node(o),
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
)

const obj1 = new DrawingObject(r,
	new Object('obj1'));
n.add(obj1);

const obj2 = new DrawingObject(r,
	new Object('obj2'));
n.add(obj2);

n.act('Draw', [0]);

// obj1.act('Draw', [1]);

// obj2.act('Draw', [2]);
