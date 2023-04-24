import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav,
  Button,
  Container,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";

import { BrowserRouter as useLocation, Link } from 'react-router-dom';


import "../components/Navbar.css"

function Admin() {

  const [data, setData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();  // Requests
    fetchUserList(); // Users
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5000/api/requests")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  const fetchUserList = () => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((users) => {
        setUserList(users);
      });
  };

  const handleApprove = (id) => {
    console.log('Approve', id);
    const data = { id: id};
    fetch('http://localhost:5000/api/approve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (response.ok) {
          console.log('Success');
          // Refresh the data
          fetch("http://localhost:5000/api/requests")
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          });
        } else {
          console.log('Error');
        }
      })
      .catch(error => {console.log(error); 
      });
  };

  const handleReject = (id) => {
    console.log('Reject', id);
    const data = { id: id};
    fetch('http://localhost:5000/api/reject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (response.ok) {
          console.log('Success');
          // Refresh the data
          fetch("http://localhost:5000/api/requests")
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          });
        } else {
          console.log('Error');
        }
      })
      .catch(error => {console.log(error); 
      });
  };

  const resetUser = (email) => {
    console.log('Reset Password for User', email);
    const data = { email: email};
    fetch('http://localhost:5000/api/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        console.log(data); 
        setError('New Password for User ' + email + ': '+ data.password);
      })
      .catch(error => {console.log(error); 
      });
  };

  const removeUser = (email) => {
    console.log('Remove User', email);
    const data = { email: email};
    fetch('http://localhost:5000/api/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (response.ok) {
          console.log('Success');
          // Refresh the data
          fetch("http://localhost:5000/api/users")
          .then((response) => response.json())
          .then((users) => {
            setUserList(users);
          });
        } else {
          console.log('Error');
        }
      })
      .catch(error => {console.log(error); 
      });
  };

  const handleLogout = () => {
    fetch('http://localhost:5000/api/logout', {
      method: 'POST'})
      .then(response => {
        if (response.ok) {
          console.log('Success');
          // Refresh the data
          localStorage.setItem('authenticated', 'false');
          localStorage.setItem('admin', 'false');
          navigate('/');
        } else {
          console.log('Error');
        }
      })
      .catch(error => {console.log(error); 
      });
  }
  
  return (
    
    <div className="bg-dark">
      <Navbar expand="lg" variant="dark" className="navbar-main">
        <Container fluid>
        <Navbar.Brand to="/">Guardian</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/admin" className="active-link">Admin</Nav.Link>
        </Nav>
        <Button variant="danger" className="ml-auto" onClick={handleLogout}>
          Logout
        </Button>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <h1 className="text-center">Requests</h1>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Email</th>
              <th>Date / Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.email}</td>
                <td>{row.date}</td>
                <td>
                  <Button variant="success" className="ml-auto" onClick={() => handleApprove(row.id)}>Approve</Button>
                  <Button variant="danger" className="ml-auto" onClick={() => handleReject(row.id)}>Reject</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Container className="mt-4">
        <h1 className="text-center">Users</h1>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(row => (
              <tr key={row.id}>
                <td>{row.email}</td>
                <td>
                  <Button variant="info" className="ml-auto" onClick={() => resetUser(row.email)}>Reset Password</Button>
                  <Button variant="danger" className="ml-auto" onClick={() => removeUser(row.email)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Admin;
