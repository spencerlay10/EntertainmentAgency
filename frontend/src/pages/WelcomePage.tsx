import React from 'react';

function WelcomePage() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to the Entertainment Agency</h1>
      <p className="text-center">Click below to see our entertainers</p>
      <a href="/entertainers" className="btn btn-primary">See Entertainers</a>
    </div>
  );
}

export default WelcomePage;
