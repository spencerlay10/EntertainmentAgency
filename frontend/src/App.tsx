import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import EntertainerPage from './pages/EntertainerPage';
import DetailsPage from './pages/DetailsPage';
import AddEntertainerPage from './pages/AddEntertainerPage';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Entertainment Agency</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/entertainers">Entertainers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Entertainer</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/entertainers" element={<EntertainerPage />} />
        <Route path="/entertainers/:id" element={<DetailsPage />} />
        <Route path="/add" element={<AddEntertainerPage />} />
      </Routes>
    </Router>
  );
}

export default App;