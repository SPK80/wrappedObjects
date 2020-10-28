import { ObjectWrap } from "./objectWrap.js";


export class TimeoutObject extends ObjectWrap {

	act(action, args) {
		super.act(action, args);

		if (action == 'Timeout') {
			args.forEach(ms => {
				if (ms > 0)
					setTimeout(() => {
						this._callEvent('Timeout', [ms]);
					}, ms);
				else
					this._callEvent('Timeout', ['no delay']);

			});
		}
	}
}

export class DeletingObject extends ObjectWrap {

	act(action, args) {
		super.act(action, args);

		if (action == 'Delete') {
			this._callEvent('Delete', args);
		}
	}
}

export class MovingObject extends ObjectWrap {
	#x = 0;
	#y = 0;

	act(action, args) {
		super.act(action, args);

		if (action == 'Move') {
			const x = args[0];
			const y = args[1];
			this.#x = x;
			this.#y = y;
			this._callEvent('Move', [this.#x, this.#y]);
		}
	}
}

export class DrawingObject extends ObjectWrap {
	#render;
	constructor(render) {
		this.#render = render;
	}

	act(action, args) {
		super.act(action, args);

		if (action == 'Move') {

			const x = args[0];
			const y = args[1];

			this.#render.pushPos();
			this.#render.move(x, y);
			this.#render.sprite();
			this.#render.popPos();

			this._callEvent('Draw');
		}
	}
}

class Render {
	#x = 0;
	#y = 0;
	#posStack = [];

	pushPos() {
		this.#posStack.push({ x: this.#x, y: this.#y })
		console.log(`pushPos(${this.#x},${this.#y})`);
	}

	popPos() {
		const pos = this.#posStack.pop();
		console.log(`popPos(${this.#x},${this.#y})`);
	}

	move(x, y) {
		this.#x = x;
		this.#y = y;
		console.log(`move(${x},${y})`);
	}

	sprite() {
		console.log(`sprite(${this.#x},${this.#y})`);
	}
}