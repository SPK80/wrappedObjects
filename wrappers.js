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

export class PositionObject extends ObjectWrap {
	#x = 0;
	get x() { return this.#x }
	#y = 0;
	get y() { return this.#y }

	act(action, args) {
		super.act(action, args);

		if (action == 'Move') {
			const x = args[0];
			const y = args[1];
			this._x = x;
			this.#y = y;
			this._callEvent('Move', [this.#x, this.#y]);
		}

		if (action == 'Shift') {
			const x = args[0];
			const y = args[1];
			this.#x += x;
			this.#y += y;
			this._callEvent('Shift', [this.#x, this.#y]);
		}
	}
}

export class DrawingObject extends ObjectWrap {
	#render;
	constructor(render, object) {
		if (!(object instanceof PositionObject)) throw (`${object} is not instanceof PositionObject!`);
		if (!(render instanceof Render)) throw (`${render} is not instanceof Render!`);
		super(object);
		this.#render = render;
	}

	act(action, args) {
		super.act(action, args);

		if (action == 'Draw') {
			console.group(this.name);
			this.#render.pushPos();
			this.#render.move(this.object.x, this.object.y);
			this.#render.sprite();
			this._callEvent('Draw');
			this.#render.popPos();
			console.groupEnd();
		}
	}
}

export class Render {
	#x = 0;
	#y = 0;
	#posStack = [];

	pushPos() {
		this.#posStack.push({ x: this.#x, y: this.#y })
		console.log(`pushPos(${this.#x},${this.#y})`);
	}

	popPos() {
		const pos = this.#posStack.pop();
		this.#x = pos.x;
		this.#y = pos.y;

		console.log(`popPos(${this.#x},${this.#y})`);
	}

	move(x, y) {
		this.#x += x;
		this.#y += y;
		console.log(`move(${x},${y})`);
	}

	sprite() {
		console.log(`sprite(${this.#x},${this.#y})`);
	}
}