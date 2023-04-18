import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from'react-router-dom';
import axios from 'axios';


function Request(){
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const data = { email: email};
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }

  return (
    <div className="bg-dark d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="mt-5 pt-5">
        <Link to="/" className="text-decoration-none">
          <h1 className="mb-0 text-white px-3 py-2 mt-5" style={{fontSize: '4rem'}}>Guardian</h1>
        </Link>
        <h2 className="text-white mb-4">Request Access</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailInput" className="text-white">Email address</label>
            <input type="email" className="form-control" id="emailInput" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}


export default Request;
