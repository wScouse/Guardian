import React, { useState, useEffect } from 'react';

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

import { BrowserRouter as useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "../components/Navbar.css"

function Guardian() {
  const [recentDetections, setRecentDetections] = useState([]);
  const [detectionCount, setDetectionCount] = useState(0);
  const navigate = useNavigate();

  // Check if user is authenticated
  if (localStorage.getItem('authenticated') === 'false') {
    console.log('Not authenticated');
    navigate('/login');
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/guardian')
      .then(response => {
        console.log(response.data);
        setRecentDetections(response.data.detections);
        console.log(setRecentDetections)
        setDetectionCount(response.data.count);
        console.log(setDetectionCount)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

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
          <Nav.Link as={Link} to="/guardian" className="active-link">Home</Nav.Link>
          <Nav.Link as={Link} to="/detections">Detections</Nav.Link>
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
        <Row>
          <Col>
            <Card className="p-3">
              <h4>Number of Detections</h4>
              <p>{detectionCount}</p>
            </Card>
          </Col>
          <Col>
            <Card className="p-3">
              <h4>Server Status</h4>
              <p>Online</p>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="mt-4">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Missing ID</th>
              <th>Date</th>
              <th>Threat</th>
            </tr>
          </thead>
          <tbody>
          {recentDetections && recentDetections.map((detection) => (
              <tr key={detection.id}>
                <td>{detection.missingID}</td>
                <td>{detection.detectionDATE}</td>
                <td>{detection.detectionTHREAT}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Guardian;
