import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
// customized libs
import store from '@/store/index.ts';
import Router from '@/router/index.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Router></Router>
			</BrowserRouter>
		</Provider>
	</StrictMode>
);
