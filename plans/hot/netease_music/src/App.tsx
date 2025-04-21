import './App.css';
import { HashRouter, Link } from 'react-router';
import Router from '@/router';
import { Suspense } from 'react';

function App() {
  return (
    <HashRouter>
      <nav>
        <Link to="/discover">Home</Link>
        <Link to="/my">My</Link>
        <Link to="/follow">Follow</Link>
        <Link to="/download">Download</Link>
      </nav>
      <Suspense fallback="loading...">
        <Router />
      </Suspense>
    </HashRouter>
  );
}

export default App;
