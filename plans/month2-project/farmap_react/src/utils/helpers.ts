async function getWithError(url: string, errLog: string): Promise<unknown> {
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
