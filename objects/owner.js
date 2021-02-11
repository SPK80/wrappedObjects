import { IObject } from "./object.js";

export class IOwner extends IObject {
	push(object) { throw ('put() not implemented') }
	pop(name) { throw ('pop() not implemented') }
	moveTo(owner, names) { throw ('moveTo() not implemented') }
}

export class Owner extends IOwner {
	#owner;
	constructor(object) {
		super();
		if (!(object instanceof IObject)) throw (`${object} must by instanceof IObject`)
		this.#owner = object;
	}

	#objects = [];

	push(...objects) {
		objects.forEach(obj => {
			if (!(obj instanceof IObject)) throw (`${obj} must be instanceof IObject`)
			if (this.#objects.includes(obj)) {
				console.warn(`${obj.name} already inside!`)
				return
			}
			this.#objects.push(obj)
			// this._callEvent('push', { object: obj })
		})
	}

	pop(name) {
		if (!name) return;
		const obj = this.#objects.find(o => o?.name == name);
		if (!obj) console.warn(`${name} not found!`)
		else {
			delete this.#objects[this.#objects.indexOf(obj)];
			// this._callEvent('get', { object: obj })
		}
		return obj
	}

	moveTo(owner, ...names) {
		if (!(owner instanceof IOwner)) throw (`${owner} must be instanceof IOwner`)
		names.forEach(name => {
			const obj = this.get(name)
			if (obj) owner.push(obj)
		})
	}

	// Wrap/implement IObject:
	get name() { return this.#owner.name }
	_callEvent(type, args) { return this.#owner._callEvent(this.#owner, type, args) }
	onEvent(callback) { return this.#owner.onEvent(callback) }
	do(action, args) { return this.#owner.do(action, args) }
	// initDriver(name, driver) { this.#owner.initDriver(name, driver) }
	// removeDriver(name) { this.#owner.removeDriver(name) }
}

export class OwnerWrap extends IOwner {
	#owner;
	// get owner() { return this.#owner }

	constructor(owner) {
		super();
		if (!(owner instanceof IOwner)) throw (`${owner} must by instanceof IOwner`)
		this.#owner = owner;
	}

	push(...objects) { this.#owner.push(...objects) }
	pop(name) { this.#owner.pop(name) }
	moveTo(owner, ...names) { this.#owner.moveTo(owner, ...names) }

	// Wrap IObject:
	get name() { return this.#owner.name }
	_callEvent(type, args) { return this.#owner._callEvent(this.#owner, type, args) }
	onEvent(callback) { return this.#owner.onEvent(callback) }
	do(action, args) { return this.#owner.do(action, args) }
	initDriver(name, driver) { this.#owner.initDriver(name, driver) }
	removeDriver(name) { this.#owner.removeDriver(name) }
}