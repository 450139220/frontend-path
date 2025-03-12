export default class Store {
	private static instance: Store;
	private stores: Record<string, string>;

	private constructor(stores: Record<string, string>) {
		this.stores = stores;
	}

	init() {
		for (let store in this.stores) {
			const item = sessionStorage.getItem(store);
			if (!item) {
				sessionStorage.setItem(store, this.stores[store]);
			}
		}
	}

	static getInstance(stores: Record<string, string> | null): Store | undefined {
		if (!Store.instance && stores) {
			Store.instance = new Store(stores);
		} else if (!Store.instance && !stores) {
			return undefined;
		}
		return Store.instance;
	}

	getStore(store: string): string {
		const item = sessionStorage.getItem(store);
		return item ? item : 'not-exist';
	}

	setStore(store: string, value: string): boolean {
		const item = sessionStorage.getItem(store);
		if (item) {
			sessionStorage.setItem(store, value);
			return true;
		}
		return false;
	}
}
