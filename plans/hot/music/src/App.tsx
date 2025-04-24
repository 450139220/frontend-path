import '@/App.css';
import { useEffect, useState } from 'react';

interface Song {
	id: number;
	filename: string;
	url: string;
	title: string;
	artist: string;
	cover: string;
}

function App() {
	const [lib, setLib] = useState<Song[]>([]);
	const handlePlay = () => {};
	const handleAddPlaylist = () => {};

	useEffect(() => {
		fetch('http://cham.archivemodel.cn/netease_music/lib')
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				console.log(res);
				setLib(res);
			});
	}, []);

	return (
		<div className="container">
			<h1>MUSIC PLAYER</h1>
			{lib.length === 0 ? <div className="loading">loading songs...</div> : null}
			<div className="lib">
				<h2 className="lib-title">LIB: </h2>
				<div className="lib-content">
					{lib.map((song) => (
						<div className="song" key={song.id} onClick={handlePlay}>
							<img src={song.cover} alt="cover" />
							<div className="song-bottom">
								<div>{song.title}</div>
								<div>{song.artist}</div>
								<div className="song-bottom__add" onClick={handleAddPlaylist}>
									<i className="ri-add-fill"></i>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
