async function getWithError<T>(url: string, errLog: string): Promise<T> {
	const res = await fetch(url)
		.then((res) => {
			if (!res.ok) {
				throw new Error('Respose not ok');
			} else {
				return res.json();
			}
		})
		.catch((err) => {
			console.log(`[ERROR]: ${errLog}: ${err}`);
		});
	return res;
}

export { getWithError };
