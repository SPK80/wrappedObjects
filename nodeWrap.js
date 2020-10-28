import { INode } from "./node.js";

export class NodeWrap extends INode {

	#object;
	get object() { return this.#object; }

	constructor(object) {
		super();
		this.#object = object;
	}

	add(obj) {
		this.#object.add(obj);
	}

	del(name) {
		this.#object.del(name);
	}

	get name() { return this.#object.name; }
	listen(callback) {
		return this.#object.listen(callback);
	}

	act(action, args) {
		this.#object.act(action, args);
	}
}

export class ListeningNode extends NodeWrap {
	#listeningFunc;
	constructor(node, listeningFunc) {
		super(node);
		if (!listeningFunc) throw ('listeningFunc undifined');
		this.#listeningFunc = listeningFunc;
	}

	#unlistenFuncs = {};

	add(obj) {
		super.add(obj);
		this.#unlistenFuncs[obj.name] = obj.listen(this.#listeningFunc);
	}

	del(name) {
		super.del(name);
		const unlistenFunc = this.#unlistenFuncs[name];
		if (unlistenFunc) {
			unlistenFunc();
		}
	}
}