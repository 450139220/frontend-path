const form = document.querySelector('form');
const btn = document.querySelector('form>button');

form?.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData: FormData = new FormData(form);

	// send to server and check for login
	let username: string = 'undefined';
	let password: string = 'undefined';
	for (let pair of formData) {
		if (pair[0] === 'username') {
			username = pair[1] as string;
		} else if (pair[0] === 'password') {
			password = pair[1] as string;
		}
	}
	try {
		if (username === 'admin' && password !== '123') {
			throw new Error('password incorrect');
		}

		console.log(`hello, ${username}`);
	} catch (err) {
		console.log(err);
	}
});

export default 1;
