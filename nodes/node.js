import { IObject } from "../objects/object.js";

export class INode {
	get owner() { throw ('get owner() not implemented') }
	get objects() { throw ('get objects() not implemented') }
	add(obj) { throw ('add() not implemented') }
	del(name) { throw ('del() not implemented') }
}

export class Node extends INode { //Node wraps owner Object	
	constructor(owner) {
		super();
		this.#owner = owner;
	}

	#owner;
	get owner() { return this.#owner }

	// get name() { return this.#owner.name }

	// listen(callback) { return this.#owner.listen(callback) }

	// act(action, args) {
	// 	this.#owner.act(action, args)
	// 	this.#objects.forEach(object => {
	// 		this._callEvent('act')
	// 		const r = new PositionRender(args.render, this.#owner.x, this.#owner.y);

	// 		object.act(action, { render: r })
	// 	});
	// }

	#objects = [];
	get objects() { return this.#objects.slice() }

	add(obj) {
		if (!(obj instanceof IObject)) throw (`${obj} not instanceof IObject`);
		this.#objects.push(obj);
	}

	del(name) {
		if (!name) return;
		const obj = this.#objects.find(o => o?.name == name);
		if (!obj)
			console.warn(`${name} not found!`);
		else {
			delete this.#objects[this.#objects.indexOf(obj)];
		}
	}
}

export class ListeningNode extends Node {
	#listeningFunc;
	#unlistenFuncs = {};

	constructor(owner, listeningFunc) {
		if (!listeningFunc) throw ('listeningFunc undifined');
		super(owner);
		this.#listeningFunc = listeningFunc;
		// this.#unlistenFuncs[this.name] = this.listen(this.#listeningFunc);
	}

	add(obj) {
		super.add(obj);
		this.#unlistenFuncs[obj.name] = obj.onEvent(this.#listeningFunc);
	}

	del(name) {
		super.del(name);
		const unlistenFunc = this.#unlistenFuncs[name];
		if (unlistenFunc) unlistenFunc();
	}
}

export class DrawingNode extends Node {
	constructor(owner) {
		super(owner);
		owner.onEvent((sender, type, args) => {
			if (type == 'Draw' && args.render && args.render instanceof Render) {
				const r = new PositionRender(args.render, sender.x, sender.y);
				this.objects.forEach(obj => {
					obj.act('Draw', { render: r });
				});
			}
		});
	}
}