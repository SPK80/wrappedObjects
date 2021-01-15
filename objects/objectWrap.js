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

	listen(callback) {
		return this.#object.listen(callback)
	}

	act(action, args) {
		this.#object.act(action, args);
	}

	_callEvent(type, args) { //protected method must call under extenders
		this.#object._callEvent(type, args);
	}
}