import { IObject } from "./object.js";

export class IOwner extends IObject {
	get objects() { throw ('get objects() not implemented') }
	add(object) { throw ('add() not implemented') }
	del(name) { throw ('del() not implemented') }
}

export class Owner extends IOwner {
	#owner;
	constructor(object) {
		super();
		if (!(object instanceof IObject))
			throw (`${object} must by instanceof IObject`)
		this.#owner = object;
	}

	#objects = [];
	get objects() { return this.#objects.slice() }

	add(obj) {
		if (!(obj instanceof IObject)) throw (`${obj} must be instanceof IObject`);
		this.#objects.push(obj);
		this._callEvent('add', { object: obj })
	}

	// add(...objects) { objects.forEach(this.add) }

	del(name) {
		if (!name) return;
		const obj = this.#objects.find(o => o?.name == name);

		if (!obj) console.warn(`${name} not found!`)
		else {
			delete this.#objects[this.#objects.indexOf(obj)];
			this._callEvent('del', { object: obj })
		}
		return obj
	}

	// del(...names) { names.forEach(this.del) }

	// Wrap/implement IObject:
	get name() { return this.#owner.name }
	_callEvent(type, args) { return this.#owner._callEvent(this.#owner, type, args) }
	onEvent(callback) { return this.#owner.onEvent(callback) }
	act(action, args) { return this.#owner.act(action, args) }
	initDriver(name, driver) { this.#owner.initDriver(name, driver) }
	removeDriver(name) { this.#owner.removeDriver(name) }
}

export class OwnerWrap extends IOwner {
	#owner;
	get owner() { return this.#owner }

	constructor(owner) {
		super();
		if (!(owner instanceof IOwner)) throw (`${owner} must by instanceof IOwner`)
		this.#owner = owner;
	}

	get objects() { return this.#owner.objects }

	add(object) {
		this.#owner.add(object)
	}

	del(name) {
		this.#owner.del(name)
	}

	// Wrap IObject:
	get name() { return this.#owner.name }
	_callEvent(type, args) { return this.#owner._callEvent(this.#owner, type, args) }
	onEvent(callback) { return this.#owner.onEvent(callback) }
	act(action, args) { return this.#owner.act(action, args) }
	initDriver(name, driver) { this.#owner.initDriver(name, driver) }
	removeDriver(name) { this.#owner.removeDriver(name) }
}