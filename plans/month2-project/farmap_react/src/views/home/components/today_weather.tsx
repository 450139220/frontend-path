import styles from '../index.module.css';
import { useEffect, useState } from 'react';
import { getWithError } from '@/utils/helpers';

interface TodayWeatherPredict {
	daily: {
		tempMax: string;
		tempMin: string;
	}[];
}
interface TodayWeatherCurrent {
	now: {
		icon: string;
		obsTime: string;
		text: string;
		temp: string;
		windDir: string;
		windScale: string;
		feelsLike: string;
		humidity: string;
		precip: string;
		vis: string;
	};
}
interface TodayWeatherProps {
	predict: TodayWeatherPredict['daily'][number];
	current: TodayWeatherCurrent['now'];
}

function TodayWeather() {
	const [todayWeatherProps, setTodayWeatherProps] = useState<TodayWeatherProps>(
		{} as TodayWeatherProps
	);

	useEffect(() => {
		fetchTodayWeather(
			'31b6db36c66f461e89c408c864b51da9',
			'108.130217,31.170638'
		).then((res) => {
			setTodayWeatherProps(res);
		});
	}, []);

	return (
		<>
			{todayWeatherProps?.predict ? null : <div>weather data not found</div>}
			<div>{todayWeatherProps?.predict?.tempMin}</div>
			<div>{todayWeatherProps?.predict?.tempMax}</div>
		</>
	);
}

async function fetchTodayWeather(
	key: string,
	location: string
): Promise<TodayWeatherProps> {
	const urlPredict = `https://devapi.qweather.com/v7/weather/3d?key=${key}&location=${location}`;
	const urlCurrent = `https://devapi.qweather.com/v7/weather/now?key=${key}&location=${location}`;

	return Promise.all([
		getWithError<TodayWeatherPredict>(
			urlPredict,
			'fetch today weather interval'
		),
		getWithError<TodayWeatherCurrent>(
			urlCurrent,
			'fetch today concrete weather'
		),
	]).then((res) => {
		const resPredict = res[0];
		const resCurrent = res[1];
		const todayWeatherProps: TodayWeatherProps = {
			predict: { tempMax: '', tempMin: '' },
			current: {
				icon: '',
				obsTime: '',
				text: '',
				temp: '',
				windDir: '',
				windScale: '',
				feelsLike: '',
				humidity: '',
				precip: '',
				vis: '',
			},
		};

		// get todays' interval of temperature
		const { tempMax, tempMin } = resPredict.daily[0];
		todayWeatherProps.predict = { tempMax, tempMin };

		// get todays' specific weather informations
		const currentProps = [
			'icon',
			'obsTime',
			'text',
			'temp',
			'windDir',
			'windScale',
			'feelsLike',
			'humidity',
			'precip',
			'vis',
		] as const;
		currentProps.forEach((prop) => {
			todayWeatherProps.current[prop] = resCurrent.now[prop];
		});

		return todayWeatherProps;
	});
}

export default TodayWeather;
