import styles from '../index.module.css';
import { useEffect, useState } from 'react';
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

function DaysWeather() {
	const [daysWeatherProps, setDaysWeatherProps] = useState<DaysWeatherProps>({
		days: [],
		tempMax: 0,
		tempMin: 0,
	});

	useEffect(() => {
		fetchDaysWeather(
			'31b6db36c66f461e89c408c864b51da9',
			'108.130217,31.170638'
		).then((res) => {
			setDaysWeatherProps(res);
		});
	}, []);

	return (
		<>
			{daysWeatherProps.days.map((day) => (
				<div>{day.fxDate.toString()}</div>
			))}
		</>
	);
}

async function fetchDaysWeather(
	key: string,
	location: string
): Promise<DaysWeatherProps> {
	const url = `https://devapi.qweather.com/v7/weather/10d?key=${key}&location=${location}`;
	const res = (await getWithError(
		url,
		'fetch future 10d weather'
	)) as RawDaysWeather;
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
