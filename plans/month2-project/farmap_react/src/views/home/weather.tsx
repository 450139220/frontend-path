import { useEffect, useState } from 'react';

function WeatherComp() {
	const QWEATHER_API_KEY = '31b6db36c66f461e89c408c864b51da9';
	const KAIZHOU_LOCATION = '108.130217,31.170638';

	type WeatherToday = {
		icon: string;
		reporttime: string;
		text: string;
		temp: string;
		wind: string;
		feelsLike: string;
		humidity: string;
		precip: string;
		vis: string;
	};
	interface RawWeatherFutureDay {
		fxDate: Date;
		iconDay: string;
		tempMin: string;
		tempMax: string;
	}
	type WeatherFutureDay = Omit<RawWeatherFutureDay, 'fxDate'> & {
		weekday: string;
	};
	interface WeatherData {
		today: WeatherToday;
		future: {
			todayTemp: string;
			days: WeatherFutureDay[];
		};
	}

	const [weatherData, setWeatherData] = useState<WeatherData>(
		{} as WeatherData
	);
	useEffect(() => {
		const getWeatherNow = async (key: string, location: string) => {
			const urlNow = `https://devapi.qweather.com/v7/weather/now?key=${QWEATHER_API_KEY}&location=${KAIZHOU_LOCATION}`;

			const resNow = await fetch(urlNow).catch((err) => {
				console.log(`[ERROR]: request current weather: ${err}`);
			});
			const weatherNow = await resNow?.json();

			const weather: WeatherToday = {} as WeatherToday;
			weather.icon = weatherNow.now.icon;
			weather.reporttime = `更新时间：${weatherNow.now.obsTime.slice(0, 16)}`;
			weather.text = weatherNow.now.text;
			weather.temp = weatherNow.now.temp + '°';
			weather.wind = weatherNow.now.windDir + weatherNow.now.windScale + '级';
			weather.feelsLike = weatherNow.now.feelsLike + '°';
			weather.humidity = weatherNow.now.humidity + '%';
			weather.precip = weatherNow.now.precip + 'mm';
			weather.vis = weatherNow.now.vis + 'm';

			return weather;
		};

		const getWeatherFuture = async (key: string, location: string) => {
			const urlFuture = `https://devapi.qweather.com/v7/weather/3d?key=${QWEATHER_API_KEY}&location=${KAIZHOU_LOCATION}`;

			const resFuture = await fetch(urlFuture).catch((err) => {
				console.log(`[ERROR]: request future 3 days weather: ${err}`);
			});
			const weatherFuture = await resFuture?.json();

			const todayTemp = `${weatherFuture.daily[0].tempMin} ~ ${weatherFuture.daily[0].tempMax}℃`;

			const weatherDays: WeatherFutureDay[] = [];
			weatherFuture.daily.forEach((day: unknown) => {
				const d = day as RawWeatherFutureDay;
				const weatherDay: WeatherFutureDay = {} as WeatherFutureDay;
				weatherDay.iconDay = d.iconDay;
				weatherDay.tempMin = `${d.tempMin}°`;
				weatherDay.tempMax = `${d.tempMax}°`;

				const dayMap = new Map<number, string>();
				dayMap.set(0, 'Sun');
				dayMap.set(1, 'Mon');
				dayMap.set(2, 'Tue');
				dayMap.set(3, 'Wed');
				dayMap.set(4, 'Thu');
				dayMap.set(5, 'Mon');
				dayMap.set(6, 'Sat');

				weatherDay.weekday = dayMap.get(new Date(d.fxDate).getDay())!;
				weatherDays.push(weatherDay);
			});

			return { todayTemp, weatherDays };
		};

		Promise.all([
			getWeatherNow(QWEATHER_API_KEY, KAIZHOU_LOCATION),
			getWeatherFuture(QWEATHER_API_KEY, KAIZHOU_LOCATION),
		])
			.then((res) => {
				setWeatherData(() => ({
					today: res[0],
					future: {
						todayTemp: res[1].todayTemp,
						days: res[1].weatherDays,
					},
				}));
			})
			.catch((err) => {
				console.log(`[ERROR]: fetch weather in promise all: ${err}`);
			});
	}, []);

	return (
		<>
			{/* TODO: loading */}
			<div>{weatherData.future?.todayTemp}</div>
		</>
	);
}

export default WeatherComp;
