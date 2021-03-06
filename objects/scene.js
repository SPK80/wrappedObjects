import { AttachedRender } from "../renders/attachedRender.js";
import { Object } from "./object.js";
import { Owner, OwnerWrap } from "./owner.js";

export class SortingOwnerWrap extends Owner {
	#sortOn = 'Draw';
	#sortBy = '';
	#revers = false;

	act(action, args) {
		if (action == this.#sortOn) {
			this.objects.sort((o1, o2) => {
				if (this.#revers)
					return o1[this.#sortBy] - o2[this.#sortBy]
				else
					return o2[this.#sortBy] - o1[this.#sortBy]
			})
		}
		super.act(action, args)
	}
}

export class Scene extends OwnerWrap {
	constructor(name) {
		super(new Owner(new Object(name)))
		
	}

	act(action, args) {
		if (action == 'Draw') {
			args.render.clear()
		}
		// const result = super.act(action, args)
		//Act ForEach containing object		
		this.objects.forEach(obj => {
			// if (action == 'Draw') {
			obj.act(action, args)
		})

		// return result;
	}
}