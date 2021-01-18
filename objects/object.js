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
		return this.#event.call(this, type, args)
	}

	onEvent(callback) { return this.#event.subscribe(callback) }

	act(action, args) { }
}