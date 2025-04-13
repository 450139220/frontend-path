import styles from '../index.module.css';
import { useEffect, useRef, useState } from 'react';
import { getWithError } from '@/utils/helpers';

interface RawDaysWeather {
	daily: {
		fxDate: Date;
		iconDay: string;
		tempMax: string;
		tempMin: string;
		weekday: string;
	}[];
}
interface DaysWeatherProps {
	days: RawDaysWeather['daily'];
	tempMax: number;
	tempMin: number;
}
interface DaysWeather {
	width: number;
	height: number;
}

function DaysWeather({ width, height }: DaysWeather) {
	const [daysWeatherProps, setDaysWeatherProps] = useState<DaysWeatherProps>({
		days: [],
		tempMax: 0,
		tempMin: 0,
	});
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;
		// #beca4f
		const weatherGraph = new WeatherGraph(ctx, width, height, 5, '#1f3f1a');

		if (daysWeatherProps.days.length === 0) {
			fetchDaysWeather('31b6db36c66f461e89c408c864b51da9', '108.130217,31.170638').then((res) => {
				weatherGraph.setY(Number(res.tempMax), Number(res.tempMin));

				const rawDataHigh: number[] = [];
				const rawDataLow: number[] = [];
				const labels: string[] = [];
				res.days.forEach((day) => {
					rawDataHigh.push(Number(day.tempMax));
					rawDataLow.push(Number(day.tempMin));
					labels.push(day.weekday);
				});
				weatherGraph.animation(rawDataHigh, rawDataLow, labels);

				setDaysWeatherProps(res);
			});
		}
	}, [daysWeatherProps, width, height]);

	return (
		<canvas
			className={styles['weather-graph']}
			ref={canvasRef}
			width={width}
			height={height}></canvas>
	);
}

// TODO: line & point & bezire & text & event
// TODO: gradient: end at lower place
class WeatherGraph {
	// graph informations
	private padding: number = 0;
	private labels: string[] = ['Xxx', 'Xxx', 'Xxx', 'Xxx', 'Xxx'];
	private maxY: number = 0;
	private minY: number = 0;
	// point informations
	private displayDataHigh: number[] = new Array(this.step).fill(10);
	private displayDataLow: number[] = new Array(this.step).fill(0);
	private pointRadius: number = 5;

	constructor(
		private ctx: CanvasRenderingContext2D,
		private width: number,
		private height: number,
		private step: number,
		private color: string
	) {
		this.padding = width * 0.1;
	}

	public setY(maxY: number, minY: number) {
		this.maxY = maxY;
		this.minY = minY;
		// this is for changing the original place of animation
		for (let i = 0; i < this.displayDataHigh.length; i++) {
			this.displayDataHigh[i] = minY;
		}
		for (let i = 0; i < this.displayDataLow.length; i++) {
			this.displayDataLow[i] = minY;
		}
	}

	public animation(rawDataHigh: number[], rawDataLow: number[], labels: string[]) {
		if (this.labels[0] === 'Xxx') {
			this.labels = labels;
		}
		const steps = 60;
		let frame = 0;
		const step = () => {
			if (frame >= steps) return;
			this.displayDataHigh = this.displayDataHigh.map(
				(v, i) => v + (rawDataHigh[i] - v) / (steps - frame)
			);

			this.displayDataLow = this.displayDataLow.map(
				(v, i) => v + (rawDataLow[i] - v) / (steps - frame)
			);
			this.draw();
			frame++;
			requestAnimationFrame(step);
		};
		step();
	}

	private getXY(value: number, index: number): { x: number; y: number } {
		const step = (this.width - this.padding * 2) / (this.step - 1);
		const x = this.padding + index * step;
		const y =
			this.height -
			this.padding -
			((value - this.minY) / (this.maxY - this.minY)) * (this.height - this.padding * 2);
		return { x, y };
	}

	public draw() {
		this.ctx.clearRect(0, 0, this.width, this.height);

		// draw border
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.moveTo(this.padding, this.padding);
		this.ctx.lineTo(this.padding, this.height - this.padding);
		this.ctx.lineTo(this.width - this.padding, this.height - this.padding);
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = this.color;
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
		this.ctx.setLineDash([5, 3]);
		this.ctx.stroke();
		this.ctx.restore();

		// create gradient district
		// const gradient = this.ctx.createLinearGradient(0, this.padding, 0, this.height - this.padding);
		const gradient = this.ctx.createLinearGradient(
			0,
			this.padding +
				(this.height - this.padding * 2) *
					(1 - (Math.max(...this.displayDataHigh) - this.minY) / (this.maxY - this.minY)),
			0,
			this.padding +
				(this.height - this.padding * 2) *
					(1 - (Math.min(...this.displayDataLow) - this.minY) / (this.maxY - this.minY))
		);
		gradient.addColorStop(0, `${this.color}40`);
		gradient.addColorStop(1, `${this.color}00`);

		// draw gradient district
		this.ctx.beginPath();
		this.findPoints(true);
		this.ctx.closePath();
		this.ctx.fillStyle = gradient;
		this.ctx.fill();

		// draw line
		this.ctx.beginPath();
		this.ctx.lineWidth = 3;
		this.ctx.strokeStyle = this.color;
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
		this.findPoints(false);
		this.ctx.stroke();

		// draw point
		this.findPoints(false, true);

		// draw axis
		this.ctx.fillStyle = this.color;
		this.ctx.font = '600 14px Ubuntu Mono';
		this.labels.forEach((label, i) => {
			const { x } = this.getXY(0, i);
			this.ctx.fillText(label, x - 10, this.height - this.padding + 20);
		});
		this.ctx.font = '600 16px Ubuntu Mono';
		[this.maxY, this.minY].forEach((value) => {
			const { y } = this.getXY(value, 0);
			this.ctx.fillText(value.toString(), this.padding - 25, y);
		});
	}

	private findPoints(isRound: boolean, isPoint: boolean = false) {
		for (let i = 0; i < this.displayDataHigh.length; i++) {
			const { x, y } = this.getXY(this.displayDataHigh[i], i);
			if (!isPoint) {
				if (i === 0) {
					this.ctx.moveTo(x, y);
				} else {
					this.ctx.lineTo(x, y);
				}
			} else {
				this.ctx.beginPath();
				this.ctx.arc(x, y, this.pointRadius, 0, Math.PI * 2);
				this.ctx.fillStyle = this.color;
				this.ctx.fill();
			}
		}

		for (let i = this.displayDataLow.length - 1; i >= 0; i--) {
			const { x, y } = this.getXY(this.displayDataLow[i], i);
			if (!isPoint) {
				if (i === this.step - 1 && !isRound) {
					this.ctx.moveTo(x, y);
				} else {
					this.ctx.lineTo(x, y);
				}
			} else {
				this.ctx.beginPath();
				this.ctx.arc(x, y, this.pointRadius, 0, Math.PI * 2);
				this.ctx.fillStyle = this.color;
				this.ctx.fill();
			}
		}
	}
}

async function fetchDaysWeather(key: string, location: string): Promise<DaysWeatherProps> {
	const url = `https://devapi.qweather.com/v7/weather/10d?key=${key}&location=${location}`;
	const res = (await getWithError(url, 'fetch future 10d weather')) as RawDaysWeather;
	const daysWeatherProps: DaysWeatherProps = {
		days: [],
		tempMax: 0,
		tempMin: 0,
	};

	// get max and min temperature of future 10 days
	const tempMaxes: number[] = [];
	const tempMins: number[] = [];

	// get relative weekday
	const weekdays = new Map<number, string>();
	weekdays.set(0, 'Sun');
	weekdays.set(1, 'Mon');
	weekdays.set(2, 'Tue');
	weekdays.set(3, 'Wed');
	weekdays.set(4, 'Thu');
	weekdays.set(5, 'Fri');
	weekdays.set(6, 'Sat');

	res.daily.forEach((day) => {
		tempMaxes.push(Number(day.tempMax));
		tempMins.push(Number(day.tempMin));
	});

	for (let i = 0; i < 5; i++) {
		const { fxDate, iconDay, tempMax, tempMin } = res.daily[i];
		daysWeatherProps.days.push({
			fxDate,
			iconDay,
			tempMax,
			tempMin,
			weekday: weekdays.get(new Date(fxDate).getDay())!,
		});
	}

	daysWeatherProps.tempMax = Math.max(...tempMaxes);
	daysWeatherProps.tempMin = Math.min(...tempMins);

	return daysWeatherProps;
}

export default DaysWeather;
