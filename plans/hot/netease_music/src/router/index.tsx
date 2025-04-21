import { Routes, Route } from 'react-router';
import routes from './routes';

function Router() {
  return (
    <Routes>
      <Route path={routes[0].path} element={routes[0].element} />
    </Routes>
  );
}

export default Router;
