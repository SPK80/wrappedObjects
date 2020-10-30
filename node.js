import { IObject } from "./object.js";

export class INode extends IObject {
	get objects() { throw ('get objects() not implemented') }
	add(obj) { throw ('add() not implemented') }
	del(name) { throw ('del() not implemented') }
}

export class Node extends INode { //Node wraps owner Object	
	#owner;
	// get owner() { return this.#owner }
	constructor(owner) {
		super();
		this.#owner = owner;
	}

	get name() { return this.#owner.name }

	listen(callback) { return this.#owner.listen(callback) }

	act(action, args) { this.#owner.act(action, args) }

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

export class ListeningNode extends Node {
	#listeningFunc;
	#unlistenFuncs = {};

	constructor(owner, listeningFunc) {
		if (!listeningFunc) throw ('listeningFunc undifined');
		super(owner);
		this.#listeningFunc = listeningFunc;
		this.#unlistenFuncs[this.name] = this.listen(this.#listeningFunc);
	}

	add(obj) {
		super.add(obj);
		this.#unlistenFuncs[obj.name] = obj.listen(this.#listeningFunc);
	}

	del(name) {
		super.del(name);
		const unlistenFunc = this.#unlistenFuncs[name];
		if (unlistenFunc) { unlistenFunc() }
	}
}