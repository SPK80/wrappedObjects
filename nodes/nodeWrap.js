import { Render } from "../renders/canvasRender.js";
import { PositionRender } from "../renders/positionRender.js";
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
		}
	}
}


export class SortingNodeWrap extends NodeWrap {
	#sortBy;
	constructor(node, sortBy) {
		super(node);
		this.#sortBy = sortBy;
	}

	get objects() {
		const objects = super.objects;
		if (this.#sortBy.x)
			objects.sort((o1, o2) => { o1.x - o2.x })
		if (this.#sortBy.y)
			objects.sort((o1, o2) => { o1.y - o2.y })
		if (this.#sortBy.z)
			objects.sort((o1, o2) => { o1.z - o2.z })
		return objects
	}
}

export class DrawingNodeWrap extends NodeWrap {
	constructor(node) {
		super(node);

		node.owner.onEvent((sender, type, args) => {
			if (type == 'Draw' && args.render && args.render instanceof Render) {
				const r = new PositionRender(args.render, sender.x, sender.y);
				this.objects.forEach(obj => {
					obj.act('Draw', { render: r });
				});
			}
		});
	}
}