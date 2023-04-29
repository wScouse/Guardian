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

import { BrowserRouter as useLocation, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import "../components/Navbar.css";

function Guide() {

  const navigate = useNavigate();

  // Check if user is authenticated
  if (localStorage.getItem('authenticated') === 'false') {
    console.log('Not authenticated');
    navigate('/login');
  }

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
            <Nav.Link as={Link} to="/guardian">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/detections">
              Detections
            </Nav.Link>
            <Nav.Link as={Link} to="/search">
              Search
            </Nav.Link>
            <Nav.Link as={Link} to="/reports">
              Reports
            </Nav.Link>
            <Nav.Link as={Link} to="/guide" className="active-link">
              Guide
            </Nav.Link>
          </Nav>
          <Button variant="danger" className="ml-auto" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <div className="row">
          <div className="col-md-6 mb-5 mb-md-0">
            <Card className="my-3">
              <Card.Header>Home</Card.Header>
              <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>
                  <p>
                    This page provides an overview of the Guardian system
                    activity.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6 mb-5 mb-md-0">
            <Card className="my-3">
              <Card.Header>Detections</Card.Header>
              <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>
                  <p>
                    This page displays a table containing all the detections of
                    the Guardian System.
                  </p>
                </Card.Text>
                <Card.Title>Use</Card.Title>
                <Card.Text>
                  <p>
                    To display more details of a detection press the details
                    button.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-5 mb-md-0">
            <Card className="my-3">
              <Card.Header>Search</Card.Header>
              <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>
                  <p>
                    On this page the user can upload an image so that face
                    recognition can be used in an attempt to identify missing
                    people.
                  </p>
                </Card.Text>
                <Card.Title>Use</Card.Title>
                <Card.Text>
                  <p>
                    Select your photo and press Submit. Wait for the image to be
                    processed. Once the face recognition is complete, the
                    results will be displayed in a table. If there is an
                    accurate match the user can press the approve button to log
                    the detection. A full detection report can be found on the
                    detections page.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6 mb-5 mb-md-0">
            <Card className="my-3">
              <Card.Header>Reports</Card.Header>
              <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>
                  <p>
                    This page displays a table containing all the reports made
                    be the public.
                  </p>
                </Card.Text>
                <Card.Title>Use</Card.Title>
                <Card.Text>
                  <p>
                    To display more details of a report press the details
                    button.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Guide;
