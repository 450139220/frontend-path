import styles from './index.module.css';
import TodayWeather from './components/today_weather';
import DaysWeather from './components/days_weather';

function Home() {
	// todays' weather infos & next 7 days weather

	// #1f3f1a && #beca4f
	return (
		<div className={styles.container}>
			<TodayWeather></TodayWeather>
			<DaysWeather width={500} height={300} color="#1f3f1a"></DaysWeather>
		</div>
	);
}

export default Home;
