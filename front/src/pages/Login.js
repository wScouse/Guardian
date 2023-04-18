import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from'react-router-dom';
import axios from 'axios';

const Login = () => {
  console.log('Login component rendered');

  // Login Function
  state = {
    username: '',
    password: '',
    error: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        username: this.state.username,
        password: this.state.password
      });
      console.log(response);

      // If login is successful, redirect to the dashboard
      window.location.href = '/Guardian';
    } catch (error) {
      // Authentication failed
      this.setState({ error: 'Authentication failed' });
  }
};



  return (
    <div className="bg-dark d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="mt-5 pt-5">
        <Link to="/" className="text-decoration-none">
          <h1 className="mb-0 text-white px-3 py-2 mt-5" style={{fontSize: '4rem'}}>Guardian</h1>
        </Link>
        <h2 className="text-white mb-4">Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailInput" className="text-white">Email address</label>
            <input type="email" className="form-control" id="emailInput" placeholder="Enter email" value={this.state.username} onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput" className="text-white">Password</label>
            <input type="password" className="form-control" id="passwordInput" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          {this.state.error && <div className="text-danger">{this.state.error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
