
import { CanvasRender } from "./canvasRender.js";

function load(src) {
	return new Promise((resolve, reject) => {

		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = reject(error);
		image.src = src;

	})
}



load('tiles.png')
	.catch(console.log)
	.then(
		image => {
			console.log(image.width);
			(new CanvasRender(image.width, image.height, '#F0E0A0'))
				.sprite(0, 0, image.width, image.height, image);
		}
	)


console.log('asyncTests');