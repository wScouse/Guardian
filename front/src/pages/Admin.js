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

  useEffect(() => {
    fetch("http://localhost:5000/api/requests")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleApprove = (id) => {
    console.log('Approve', id);
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

  
  return (
    
    <div className="bg-dark">
      <Navbar expand="lg" variant="dark" className="navbar-main">
        <Container fluid>
        <Navbar.Brand to="/">Guardian</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/admin" className="active-link">Admin</Nav.Link>
        </Nav>
        <Button variant="danger" className="ml-auto">
          Logout
        </Button>
        </Container>
      </Navbar>
      <Container className="mt-4">
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
    </div>
  );
}

export default Admin;
