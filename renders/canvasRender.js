export class IRender {
	clear(x, y, wi, he) { throw ('clear not defined') }
	rect(x, y, wi, he, color, fill) { throw ('rect not defined') }
	circle(x, y, radius, color, fill) { throw ('circle not defined') }
	text(text, x, y, color, font, fill) { throw ('text not defined') }
	sprite(image, x, y, wi, he) { throw ('sprite not defined') }
	tile(image, x, y, wi, he, tiX, tiY, tiWi, tiHe) { throw ('tile not defined') }
}

export class CanvasRender extends IRender {
	#width = 200;
	#height = 200;
	get width() { return this.#width }
	get height() { return this.#height }

	#scale = 1;
	#bkColor = 0;
	#ctx = null;

	constructor(wi, he, bkColor, scale = 1) {
		super();
		this.updateContext(wi, he, bkColor, scale);
	}

	updateContext(wi, he, bkColor, scale) {
		this.#width = wi;
		this.#height = he;
		this.#scale = scale;
		this.#bkColor = bkColor;

		var cnv = null;
		var cnvs = document.getElementsByTagName('canvas');
		if (cnvs == undefined || cnvs.length < 1) cnv = document.createElement('canvas');
		else cnv = cnvs[0];

		cnv.width = this.#width;
		cnv.height = this.#height;
		cnv.style.position = 'fixed';
		cnv.style.left = 0;
		cnv.style.top = 0;
		cnv.style.width = this.#width * this.#scale + 'px';
		cnv.style.height = this.#height * this.#scale + 'px';
		cnv.style.backgroundColor = this.#bkColor;
		document.body.appendChild(cnv);

		this.#ctx = cnv.getContext('2d');
	}


	clear(x, y, wi, he) {
		if (x && y && wi && he)
			this.#ctx.clearRect(x, y, wi, he)
		else
			this.#ctx.clearRect(0, 0, this.#width, this.#height);
	}

	rect(x, y, wi, he, color, fill) {
		if (fill) {
			this.#ctx.fillStyle = color;
			this.#ctx.fillRect(x, y, wi, he, color);
		} else {
			this.#ctx.strokeStyle = color;
			this.#ctx.rect(x, y, wi, he, color);
		}
	}

	circle(x, y, radius, color, fill) {
		this.#ctx.beginPath();
		if (fill) {
			this.#ctx.fillStyle = color;
		} else {
			this.#ctx.strokeStyle = color;
		}
		this.#ctx.arc(x, y, radius, 0, Math.PI * 2);
		if (fill)
			this.#ctx.fill();
		else this.#ctx.stroke();


		// this.#ctx.beginPath();
		// this.#ctx.arc(100,75,50,0,2*Math.PI);
		// this.#ctx.stroke();
	}

	#currentColor = '#FF0000'
	_getColor(color) { return color ? color : this.#currentColor }

	_getX(x) { return x ? x : 0 }
	_getY(y) { return y ? y : 0 }
	_getFont(font) { return font ? font : '50px serif' }

	text(text, x, y, color, font, fill) {

		const _x = this._getX(x);
		const _y = this._getX(y);
		const _font = this._getFont(font);
		const _color = this._getColor(color);

		if (font) this.#ctx.font = _font;
		this.#ctx.beginPath();
		if (fill == false) {
			this.#ctx.strokeStyle = _color
			this.#ctx.strokeText(text, _x, _y)
		}
		else if (fill == true || fill == undefined) {
			this.#ctx.fillStyle = _color
			this.#ctx.fillText(text, _x, _y)
		}
	}

	sprite(image, x, y, wi, he) {
		this.#ctx.drawImage(image, x, y, wi, he);
	}

	tile(image, x, y, wi, he, tiX, tiY, tiWi, tiHe) {
		this.#ctx.drawImage(
			image,
			tiX, tiY, tiWi, tiHe,
			x, y, wi, he
		);
	}

	//#endregion
}

