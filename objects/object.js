import { Event } from "../event.js";

export class IObject {
	get name() { throw ('get name() not implemented') }
	onEvent(callback) { throw ('onEvent() not implemented') } //must return unlisten function
	do(action, args) { throw ('do() not implemented') }
	get(args) { throw ('get() not implemented') }
	// delete() { throw ('act() not implemented') }
	// initDriver(name, driver) { throw ('initDriver() not implemented') }
	// removeDriver(name) { throw ('removeDriver() not implemented') }
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
	_callEvent(type, args) {  //protected metod!
		return this.#event.call(this, type, args)
	}

	onEvent(callback) {
		return this.#event.subscribe(callback)
	}

	do(action, args) {
		this.#event.call(this, action, args)
	}

	get(args) {
		return {} //empty	object
	}

	// #drivers = {}
	// initDriver(name, driver) {
	// 	this.#drivers[name] = driver
	// }

	// removeDriver(name) {
	// 	delete this.#drivers[name]
	// }
}

// export class SubjectWrap extends ObjectWrap {
// 	#owner;
// 	get owner() { return this.#owner }

// 	submit(owner) {
// 		if (this.#owner) this.#owner.del(this.name)
// 		this.#owner = owner
// 		this.#owner.add(this)
// 	}
// }