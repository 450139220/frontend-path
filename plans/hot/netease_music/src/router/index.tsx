import { Routes, Route } from 'react-router';
import routes from './routes';

function Router() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element}></Route>
      ))}
    </Routes>
  );
}

export default Router;
