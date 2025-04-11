import styles from './index.module.css';
import TodayWeather from './components/today_weather';
import DaysWeather from './components/days_weather';

function Home() {
	// todays' weather infos & next 7 days weather

	return (
		<div className={styles.container}>
			<TodayWeather></TodayWeather>
			<DaysWeather></DaysWeather>
		</div>
	);
}

export default Home;
