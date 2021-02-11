import { AttachedRender } from "../renders/attachedRender.js";
import { Object } from "./object.js";
import { Owner, OwnerWrap } from "./owner.js";

export class SortingOwnerWrap extends Owner {
	#sortOn = 'Draw';
	#sortBy = '';
	#revers = false;

	do(action, args) {
		if (action == this.#sortOn) {
			this.objects.sort((o1, o2) => {
				if (this.#revers)
					return o1[this.#sortBy] - o2[this.#sortBy]
				else
					return o2[this.#sortBy] - o1[this.#sortBy]
			})
		}
		super.do(action, args)
	}
}

export class Scene extends OwnerWrap {
	constructor(name) {
		super(new Owner(new Object(name)))

	}

	_drivers = {}

	init(drivers) {
		Object.assign(this._drivers, drivers)
		this._drivers.forEach(driver => {
			driver.init()
		})
	}

	done() {
		this._drivers.forEach(driver => {
			driver.done()
		})
		this._drivers = {}
	}

	update() {
		this._drivers.forEach(driver => {
			driver.update()
		})
	}

	// do(action, args) {
	// 	if (action == 'Draw') {
	// 		args.render.clear()
	// 	}
	// 	// const result = super.act(action, args)
	// 	//Act ForEach containing object		
	// 	this.objects.forEach(obj => {
	// 		// if (action == 'Draw') {
	// 		obj.do(action, args)
	// 	})
	// return result;
	// }
}

export class TestScene extends Scene {
	init(drivers) {
		super.init(drivers);
		console.log(`${this.name} init`);
	}

	done() {
		super.done();
		console.log(`${this.name} done`);
	}

	update() {
		super.update();
		this._drivers.forEach(obj => {
			obj.do(action, args)
		})
	}
}