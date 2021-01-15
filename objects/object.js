import { Event } from "../event.js";

export class IObject {
	get name() { throw ('get name() not implemented') }
	onEvent(callback) { throw ('onEvent() not implemented') } //must return unlisten function
	act(action, args) { throw ('act() not implemented') }
}

export class Object extends IObject {
	#name = '';
	get name() { return this.#name }

	constructor(name) {
		super();
		if (!name) throw ('name undifined!')
		this.#name = name;
	}

	#event = new Event()
	_callEvent(type, args) {
		this.#event.call(this, type, args)
	}

	onEvent(callback) { return this.#event.subscribe(callback) }

	act(action, args) { }
}


export class IOwner extends IObject {
	get objects() { throw ('get objects() not implemented') }
	add(obj) { throw ('add() not implemented') }
	del(name) { throw ('del() not implemented') }
}


export class Owner extends IOwner {
	#owner;
	constructor(owner) {
		super()
		this.#owner = owner;
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