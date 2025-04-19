import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to the Entertainment Agency</h1>
      <p>Click below to see our entertainers</p>
      <Link to="/entertainers" className="btn btn-primary">See Entertainers</Link>
    </div>
  );
}

export default WelcomePage;