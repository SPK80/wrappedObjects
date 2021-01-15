import { Render } from "../renders/canvasRender.js";
import { INode } from "./node.js";

export class NodeWrap extends INode {
	#node;

	constructor(node) {
		if (!(node instanceof INode)) throw (`${node} is not instanceof INode!`)
		super();
		this.#node = node;
	}

	get owner() { return this.#node.owner }
	get objects() { return this.#node.objects }
	add(obj) { this.#node.add(obj) }
	del(name) { this.#node.del(name) }
}

export class ListeningNodeWrap extends NodeWrap {
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
			delete this.#unlistenFuncs[name];
		}
	}
}

export class DrawingNodeWrap extends NodeWrap {
	#render;
	constructor(node, render) {
		super(node)
		this.#render = render;
	}

	draw() {
		this.objects.forEach(obj => {
			obj.act('Draw', { render: this.#render })
		})
	}
}