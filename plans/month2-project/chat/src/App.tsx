import React from 'react';

function App() {
	class ChatApp {
		private socket: WebSocket;

		constructor(url: string) {
			this.socket = new WebSocket(url);

			this.socket.onopen = () => {
				console.log('connected to websocket');
			};

			this.socket.onmessage = (event: MessageEvent) => {
				console.log(`received: ${event.data}`);
			};

			this.socket.onclose = () => {
				console.log('disconnected websocket');
			};

			this.socket.onerror = (err: Event) => {
				console.error(`websocket error: ${err}`);
			};
		}

		sendMessage(message: string) {
			if (this.socket.readyState === WebSocket.OPEN) {
				this.socket.send(message);
			}
			console.log('sent');
		}
	}

	const chatApp = new ChatApp('ws://cham.archivemodel.cn:5173');
	// useEffect(() => {
	// 	console.log('useEffect');
	// });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const message = formData.get('message') as string;

		chatApp.sendMessage(message);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="message">message: </label>
				<input type="text" name="message" id="messaeg" />
				<button type="submit">submit</button>
			</form>
		</>
	);
}

export default App;
