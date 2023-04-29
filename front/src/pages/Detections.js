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
import { useNavigate } from 'react-router-dom';

import "../components/Navbar.css"


function Detections() {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  if (localStorage.getItem('authenticated') === 'false') {
    console.log('Not authenticated');
    navigate('/login');
  }

  useEffect(() => {
    fetchData();  // Detections
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5000/api/detections")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  const viewDetails = (id) => {
    console.log(id);
    const data = { id: id};
    navigate(`/detection_report/${data.id}`)
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
        <Navbar.Brand href="#">Guardian</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/guardian">Home</Nav.Link>
          <Nav.Link as={Link} to="/detections" className="active-link">Detections</Nav.Link>
          <Nav.Link as={Link} to="/search">Search</Nav.Link>
          <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
          <Nav.Link as={Link} to="/guide">Guide</Nav.Link>
        </Nav>
        <Button variant="danger" className="ml-auto" onClick={handleLogout}>
          Logout
        </Button>
        </Container>
      </Navbar>
      
      <Container className="mt-4">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Threat level</th>
              <th>Name</th>
              <th>Date / Time</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.threat}</td>
                <td>{row.name}</td>
                <td>{row.date}</td>
                <td>
                  <Button variant="success" className="ml-auto" onClick={() => viewDetails(row.id)}>Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Detections;
