import { INode } from "./node.js";

export class NodeWrap extends INode {

	#node;

	constructor(node) {
		if (!(node instanceof INode)) throw (`${node} is not instanceof INode!`)
		super();
		this.#node = node;
	}

	add(obj) {
		this.#node.add(obj);
	}

	del(name) {
		this.#node.del(name);
	}

	get objects() {
		return this.#node.objects;
	}


	get name() { return this.#node.name; }
	listen(callback) {
		return this.#node.listen(callback);
	}

	act(action, args) {
		this.#node.act(action, args);
	}
}

export class ListeningNode extends NodeWrap {
	#listeningFunc;
	#unlistenFuncs = {};

	constructor(node, listeningFunc) {
		super(node);
		if (!listeningFunc) throw ('listeningFunc undifined');
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
		if (unlistenFunc) {
			unlistenFunc();
		}
	}
}