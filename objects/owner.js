import { AttachedRender } from "../renders/attachedRender.js";
import { IObject } from "./object.js";

export class IOwner extends IObject {
	get objects() { throw ('get objects() not implemented') }
	add(obj) { throw ('add() not implemented') }
	del(name) { throw ('del() not implemented') }
}

export class Owner extends IOwner {
	#owner;
	constructor(owner) {
		super();
		this.#owner = owner;
	}

	#objects = [];
	get objects() { return this.#objects.slice(); }

	add(obj) {
		if (!(obj instanceof IObject))
			throw (`${obj} not instanceof IObject`);
		this.#objects.push(obj);
	}

	del(name) {
		if (!name)
			return;
		const obj = this.#objects.find(o => o?.name == name);
		if (!obj)
			console.warn(`${name} not found!`);
		else {
			delete this.#objects[this.#objects.indexOf(obj)];
		}
	}
}

export class OwnerWrap extends IOwner {
	#owner;
	#actForEach;
	constructor(object, actForEach) {
		super();
		this.#owner = object;
		this.#actForEach = actForEach;
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

		if (!obj) console.warn(`${name} not found!`)
		else delete this.#objects[this.#objects.indexOf(obj)];
	}

	get name() { return this.#owner.name }
	_callEvent(type, args) { return this.#owner._callEvent(this.#owner, type, args) }
	onEvent(callback) { return this.#owner.onEvent(callback) }

	act(action, args) {
		const result = this.#owner.act(action, args)
		if (this.#actForEach) {
			this.#objects.forEach(obj => {
				this.#actForEach(obj, action, args) // obj.act(action, args)
			})
		}
		return result;
	}
}

export class DrawingOwnerWrap extends OwnerWrap {
	constructor(owner) {
		super(owner, (obj, action, args) => {
			if (action == 'Draw') {
				obj.act(action, { render: new AttachedRender(args.render, owner) })
			}
		})
	}
}