import { IObject } from "./object.js";

export class INode extends IObject {
	get objects() { throw ('get objects() not implemented') }
	add(obj) { throw ('add() not implemented') }
	del(name) { throw ('del() not implemented') }
}

export class Node extends INode { //Node wraps owner Object
	#objects = [];
	get objects() { return this.#objects.slice() }

	#owner;
	constructor(owner) {
		super();
		this.#owner = owner;
	}

	get name() { return this.#owner.name }

	listen(callback) { return this.#owner.listen(callback) }

	act(action, args) { this.#owner.act(action, args) }

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