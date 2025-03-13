import { view } from '../views/view';
import { router } from '../router';
import { store } from '../store';

function createApp() {
	// avoid of tree shaking, because there is no need to create a explict call method to these instances
	view;
	router;
	store;
}

export { createApp };
