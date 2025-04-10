import styles from './index.module.css';
import WeatherComp from './weather';

function Home() {
	// todays' weather infos & next 7 days weather

	return (
		<div className={styles.container}>
			<WeatherComp></WeatherComp>
		</div>
	);
}

export default Home;
