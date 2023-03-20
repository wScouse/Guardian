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

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import "../components/Navbar.css"


function Configure() {
  return (
    <div className="bg-dark">
      <Navbar expand="lg" variant="dark" className="navbar-main">
        <Container fluid>
        <Navbar.Brand href="#">Guardian</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/guardian">Home</Nav.Link>
          <Nav.Link as={Link} to="/detections">Detections</Nav.Link>
          <Nav.Link as={Link} to="/configure" className="active-link">Configure</Nav.Link>
          <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
          <Nav.Link href="#">Requests</Nav.Link>
          <Nav.Link href="#">Guide</Nav.Link>
        </Nav>
        <Button variant="danger" className="ml-auto">
          Logout
        </Button>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Row>
          <Col>
            <Card className="p-3">
              <h4>Number of Detections</h4>
              <p>25</p>
            </Card>
          </Col>
          <Col>
            <Card className="p-3">
              <h4>Server Status</h4>
              <p>Online</p>
            </Card>
            <Button variant="success" className="ml-auto">
            Configure
          </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Configure;
