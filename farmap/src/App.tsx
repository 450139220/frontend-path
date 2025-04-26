import { Provider } from 'react-redux';
import store from '@/store';
import { BrowserRouter } from 'react-router';
import CustomRoutes from '@/router';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
