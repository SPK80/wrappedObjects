import { IObject } from "../objects/object.js";

export class INode {
	// get owner() { throw ('get owner() not implemented') }
	get objects() { throw ('get objects() not implemented') }
	add(obj) { throw ('add() not implemented') }
	del(name) { throw ('del() not implemented') }
}

export class Node extends INode { //Node wraps owner Object	
	constructor(owner) {
		super();
	}

	#objects = [];
	get objects() { return this.#objects.slice() }

	add(obj) {
		if (!(obj instanceof IObject)) throw (`${obj} not instanceof IObject`);
		this.#objects.push(obj);
	}

	del(name) {
		if (!name) return;
		const obj = this.#objects.find(o => o?.name == name);
		if (!obj)
			console.warn(`${name} not found!`);
		else {
			delete this.#objects[this.#objects.indexOf(obj)];
		}
	}
}