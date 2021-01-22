import { IObject } from "../object.js";

export class ObjectWrap extends IObject {
	#object;
	get object() { return this.#object }

	constructor(object) {
		if (!(object instanceof IObject))
			throw (`${object} is not instance of IObject`);
		super();
		this.#object = object;
	}

	get name() { return this.#object.name }

	act(action, args) {

		this.#object.act(action, args);
		super.act(action, args);
	}

	onEvent(callback) {
		return this.#object.onEvent(callback)
	}

	// _callEvent(type, args) { //protected method must call under extenders
	// 	this.#object._callEvent(type, args);
	// }
}