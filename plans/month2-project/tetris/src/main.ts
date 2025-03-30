import { RoundedRect, drawRoundedRect } from './utils/canvas';

const app = document.getElementById('app') as HTMLDivElement;

const canvasWidth = 400;
const canvasHeight = 900;
const ctx = initCvs(app, {
	width: canvasWidth,
	height: canvasHeight,
	border: '5px dashed green',
	borderRadius: '15px',
});
createScreen(canvasWidth, ctx);

/* ---------------------------------------- */
// change block size as the parameter of init canvas
interface CanvasOptions {
	width: number;
	height: number;
	border: string;
	borderRadius: string;
}

function initCvs(
	app: HTMLDivElement,
	{
		width,
		height,
		border = '5px dashed green',
		borderRadius = '15px',
	}: CanvasOptions
): CanvasRenderingContext2D {
	const canvas = document.createElement('canvas');
	app.appendChild(canvas);

	canvas.width = width;
	canvas.height = height;
	canvas.style.border = border;
	canvas.style.borderRadius = borderRadius;

	return canvas.getContext('2d') as CanvasRenderingContext2D;
}

function createScreen(canvasWidth: number, ctx: CanvasRenderingContext2D) {
	const outerPad = 20;
	const innerPad = 5;

	const width = canvasWidth - 2 * outerPad;
	const x = outerPad;
	const y = outerPad;

	const blockSize = (width - 9 * innerPad) / 10;

	const color = '#ddd';
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 20; j++) {
			ctx.fillStyle = color;
			const options: RoundedRect = {
				x: x + i * (innerPad + blockSize),
				y: y + j * (innerPad + blockSize),
				width: blockSize,
				height: blockSize,
				radius: 10,
			};
			drawRoundedRect(ctx, options);
			ctx.fill();
		}
	}
}
