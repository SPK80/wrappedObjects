import { AttachedRender } from "../renders/attachedRender.js";
import { OwnerWrap } from "./owner.js";

export class DrawingOwnerWrap extends OwnerWrap {
	#render;
	#drawingOwner;
	constructor(owner, drawingOwner) {

		super(owner);
		this.#drawingOwner = drawingOwner;
	}

	getAttachedRender(render) {
		if (this.#render == undefined)
			this.#render = new AttachedRender(render, this.#drawingOwner);
		return this.#render;
	}

	add(object) {
		super.add(object);
		obj.initDriver('render', this.getAttachedRender(args.render))
	}

	del(name) {
		const obj = super.del(name);
		obj.removeDriver('render')
		return obj
	}
}

act(action, args) {
	const result = this.owner.act(action, args);
	// Act ForEach containing object		
	const newArgs = {};
	Object.assign(newArgs, args);
	newArgs.render = this.getAttachedRender(args.render);
	// newArgs.render = this.#render;
	if (action == 'Draw') {
		this.objects.forEach(obj => {
			obj.act(action, newArgs);
		});
	}
	return result;
}
}
