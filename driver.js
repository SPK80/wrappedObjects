export class IDriver {
	get(args) { throw ('get() not implemented'); }
	put(func, args) { throw ('put() not implemented'); }
}

export class UniDriver extends IDriver {
	#driver;
	constructor(driver) {
		this.#driver = driver
	}

	get(arg) {
		return this.#driver[arg]
	}

	put(func, args) {
		this.#driver[func](args)
	}
}