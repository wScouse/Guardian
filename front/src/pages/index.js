import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const Home = () => {
  console.log('Home component rendered');
  return (
    <div className="bg-dark d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="bg-black-50 text-white w-100 position-fixed d-flex justify-content-center align-items-center">
        <h1 className="mb-0 text-white px-3 py-2" style={{fontSize: '4rem'}}>Guardian</h1>
      </div>
      <div className="mt-5 pt-5">
        <Link to="/report" className="btn btn-primary mx-3">Report</Link>
        <Link to="/login" className="btn btn-secondary mx-3">Login</Link>
      </div>
    </div>
  );
};

export default Home;