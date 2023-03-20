import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from'react-router-dom';

const Login = () => {
  console.log('Login component rendered');
  return (
    <div className="bg-dark d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="mt-5 pt-5">
        <Link to="/" className="text-decoration-none">
          <h1 className="mb-0 text-white px-3 py-2 mt-5" style={{fontSize: '4rem'}}>Guardian</h1>
        </Link>
        <h2 className="text-white mb-4">Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="emailInput" className="text-white">Email address</label>
            <input type="email" className="form-control" id="emailInput" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput" className="text-white">Password</label>
            <input type="password" className="form-control" id="passwordInput" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;