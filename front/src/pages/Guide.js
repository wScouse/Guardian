import React from "react";
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

function Guide() {
  
  return (
    
    <div className="bg-dark">
      <Navbar expand="lg" variant="dark" className="navbar-main">
        <Container fluid>
        <Navbar.Brand href="#">Guardian</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/guardian">Home</Nav.Link>
          <Nav.Link as={Link} to="/detections">Detections</Nav.Link>
          <Nav.Link as={Link} to="/configure">Configure</Nav.Link>
          <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
          <Nav.Link as={Link} to="/requests">Requests</Nav.Link>
          <Nav.Link as={Link} to="/guide" className="active-link">Guide</Nav.Link>
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
              <th>Topic</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Home</td>
              <td>
                <a href="#">View</a>
              </td>
            </tr>
            <tr>
              <td>Detections</td>
              <td>
                <a href="#">View</a>
              </td>
            </tr>
            <tr>
              <td>Configure</td>
              <td>
                <a href="#">View</a>
              </td>
            </tr>
            <tr>
              <td>Reports</td>
              <td>
                <a href="#">View</a>
              </td>
            </tr>
            <tr>
              <td>Requests</td>
              <td>
                <a href="#">View</a>
              </td>
            </tr>
            <tr>
              <td>Other</td>
              <td>
                <a href="#">View</a>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Guide;
