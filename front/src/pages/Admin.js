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

function Admin() {
  
  return (
    
    <div className="bg-dark">
      <Navbar expand="lg" variant="dark" className="navbar-main">
        <Container fluid>
        <Navbar.Brand href="#">Guardian</Navbar.Brand>
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
              <th>Approve</th>
              <th>Reject</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>someone@somewhere.com</td>
              <td>2022-03-01 12:34:56</td>
              <td><Button variant="success" className="ml-auto">
                Approve
              </Button>
              </td>
              <td><Button variant="danger" className="ml-auto">
                Reject
              </Button>
              </td>
              <td><Button variant="info" className="ml-auto">
                Contact
              </Button>
              </td>
            </tr>
            <tr>
              <td>someone@somewhere.com</td>
              <td>2022-02-28 23:45:01</td>
              <td><Button variant="success" className="ml-auto">
                Approve
              </Button>
              </td>
              <td><Button variant="danger" className="ml-auto">
                Reject
              </Button>
              </td>
              <td><Button variant="info" className="ml-auto">
                Contact
              </Button>
              </td>
            </tr>
            <tr>
              <td>someone@somewhere.com</td>
              <td>2022-02-27 09:12:34</td>
              <td><Button variant="success" className="ml-auto">
                Approve
              </Button>
              </td>
              <td><Button variant="danger" className="ml-auto">
                Reject
              </Button>
              </td>
              <td><Button variant="info" className="ml-auto">
                Contact
              </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Admin;
