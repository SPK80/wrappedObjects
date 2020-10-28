// import { Object } from "./object.js";
// import { TestNode, TestObject } from "./testNode.js"

import { Node } from "./node.js"
import { ListeningNode } from "./nodeWrap.js"
import { Object } from "./object.js";
import { DeletingObject, MovingObject, TimeoutObject } from "./wrappers.js";

// const testNode = new TestNode('TestNode');
// testNode.add(new TestObject('Object1'));
// testNode.add(new TestObject('Object2'));
// testNode.act('OwnerAct', [1, 2, 3]);

const o = new Object('Owner');

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
	}
)

const obj1 = new DeletingObject(
	new TimeoutObject(
		new Object('obj1')));
n.add(obj1);

const obj2 = new MovingObject(
	new DeletingObject(
		new TimeoutObject(
			new Object('obj2'))));
n.add(obj2);

const obj3 = new DeletingObject(
	new Object('obj3'));
n.add(obj3);

obj2.act('Timeout', ['']);

obj1.act('Timeout', [100]);

obj2.act('Move', [1, 2]);

setTimeout(() => {
	// console.log('Delete obj1');
	obj1.act('Delete');
}, 1000);

obj2.act('Delete', [1, 2, 3]);

obj2.act('Move', [3, 4]);

// n.del(obj1.name);
// obj1.act('TestAct', [10]);