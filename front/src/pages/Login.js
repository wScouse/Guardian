import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from'react-router-dom';


function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const data = { email: email, password: password};
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

    .then(response => response.json())
    .then(data => {console.log(data); 
      if (data.success) {
        localStorage.setItem('authenticated', 'true');
        navigate('/guardian');
      } else {
        setError('Invalid email or password.');
      }
    })
    .catch(error => {console.log(error);
      setError('An error occurred. Please try again later.');
    });
  }

  return (
    <div className="bg-dark d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="mt-5 pt-5">
        <Link to="/" className="text-decoration-none">
          <h1 className="mb-0 text-white px-3 py-2 mt-5" style={{fontSize: '4rem'}}>Guardian</h1>
        </Link>
        <h2 className="text-white mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <div className="form-group">
            <label htmlFor="emailInput" className="text-white">Email address</label>
            <input type="email" className="form-control" id="emailInput" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput" className="text-white">Password</label>
            <input type="password" className="form-control" id="passwordInput" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link className="btn btn-primary" to="/request">Request Access</Link>
      </div>
    </div>
  );
}

export default Login;
