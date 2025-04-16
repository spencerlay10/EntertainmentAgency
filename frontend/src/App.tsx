import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import EntertainerPage from './pages/EntertainerPage';
import DetailsPage from './pages/DetailsPage';
import AddEntertainerPage from './pages/AddEntertainerPage';

function App() {
  return (
    <Router>
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
