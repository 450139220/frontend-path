import React, { JSX, useState } from 'react';

interface ReceivedMessage {
	message: {
		type: string;
		data: number[];
		user: number;
	};
}

function App() {
	class ChatApp {
		private socket: WebSocket;

		constructor(url: string) {
			this.socket = new WebSocket(url);

			this.socket.onopen = () => {
				console.log('connected to websocket');
			};

			this.socket.onmessage = (event: MessageEvent) => {
				const received: ReceivedMessage = JSON.parse(event.data);
				const ascii = received.message.data;
				const res = new TextDecoder().decode(new Uint8Array(ascii));
				console.log(res);

				const element = <div>{res}</div>;
				setChatbox((chatbox) => [...chatbox, element]);
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
	const [chatbox, setChatbox] = useState<JSX.Element[]>([]);

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
			<div className="chatbox">
				{chatbox.map((chat, idx) => (
					<div key={idx}>{chat}</div>
				))}
			</div>
		</>
	);
}

export default App;
