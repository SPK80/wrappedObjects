// import { IDriver } from "./driver.js";

// export class Fiber extends IDriver {
// 	#driver;
// 	constructor(driver) {
// 		if (driver == undefined)throw ('driver must be defined');
// 		this.#driver = driver;
// 	}

// 	cutOff() {
// 		this.#driver = emptyDriver
// 	}

// 	get(arg) {
// 		return this.#driver.get(arg)
// 	}

// 	put(func, args) {
// 		this.#driver.put(func, args)
// 	}
// }

// const emptyDriver = new EmptyDriver();
// class EmptyDriver extends IDriver {
// 	get(arg) { }
// 	put(func, args) { }
// }