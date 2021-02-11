export class IDriver {
	get(args) { throw ('get() not implemented') }
	put(func, args) { throw ('put() not implemented') }
	init() { throw ('init() not implemented') }
	done() { throw ('done() not implemented') }
	update() { throw ('update() not implemented') }
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