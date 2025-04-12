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
		const weatherGraph = new WeatherGraph(ctx, width, height, 5);
		// weatherGraph.draw();

		if (daysWeatherProps.days.length === 0) {
			fetchDaysWeather('31b6db36c66f461e89c408c864b51da9', '108.130217,31.170638').then((res) => {
				console.log(res);
				weatherGraph.draw([10, 15, 9, 10, 18], [7, 15, 2, 1, 7]);
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
	private maxY: number = 20;
	private minY: number = 0;
	// point informations
	private displayDataHigh: number[] = new Array(this.step).fill(10);
	private displayDataLow: number[] = new Array(this.step).fill(0);
	private pointRadius: number = 5;

	constructor(
		private ctx: CanvasRenderingContext2D,
		private width: number,
		private height: number,
		private step: number
	) {
		this.padding = width * 0.1;
	}

	private getXY(value: number, index: number): { x: number; y: number } {
		const step = (this.width - this.padding * 2) / (this.step - 1);
		const x = this.padding + index * step;
		const y =
			this.height -
			this.padding -
			(value / (this.maxY - this.minY)) * (this.height - this.padding * 2);
		return { x, y };
	}

	public draw(a?: number[], b?: number[]) {
		this.ctx.clearRect(0, 0, this.width, this.height);

		// create gradient district
		const gradient = this.ctx.createLinearGradient(0, this.padding, 0, this.height - this.padding);
		gradient.addColorStop(0, '#beca4f60');
		gradient.addColorStop(1, '#beca4f00');

		if (a && b) {
			this.displayDataHigh = a;
			this.displayDataLow = b;
		}

		this.ctx.beginPath();
		for (let i = 0; i < this.displayDataHigh.length; i++) {
			const { x, y } = this.getXY(this.displayDataHigh[i], i);
			if (i === 0) {
				this.ctx.moveTo(x, y);
			} else {
				this.ctx.lineTo(x, y);
			}
		}
		for (let i = this.displayDataLow.length - 1; i >= 0; i--) {
			// FIXME: it would exist a bug here
			const { x, y } = this.getXY(this.displayDataLow[i], i);
			this.ctx.lineTo(x, y);
		}
		this.ctx.closePath();
		this.ctx.fillStyle = gradient;
		this.ctx.fill();
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
