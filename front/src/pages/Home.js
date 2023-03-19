import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
  return (
    <div className="bg-dark">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">My App</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Detections</Nav.Link>
          <Nav.Link href="#">Config</Nav.Link>
          <Nav.Link href="#">Reports</Nav.Link>
          <Nav.Link href="#">Requests</Nav.Link>
          <Nav.Link href="#">Guide</Nav.Link>
        </Nav>
        <Button variant="danger" className="ml-auto">Logout</Button>
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
          </Col>
        </Row>
      </Container>
      <Container className="mt-4">
        <Row>
          <Col>
            <Card className="p-3">
              <h4>Threat Level</h4>
              <p>High</p>
            </Card>
          </Col>
          <Col>
            <Card className="p-3">
              <h4>Date / Time</h4>
              <p>2023-02-27 14:30:00</p>
            </Card>
          </Col>
          <Col>
            <Card className="p-3">
              <h4>Name</h4>
              <p>Some File</p>
            </Card>
          </Col>
          <Col>
            <Card className="p-3">
              <h4>Link</h4>
              <a href="#">View</a>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="p-3">
              <h4>Threat Level</h4>
              <p>Medium</p>
            </Card>
          </Col>
          <Col>
            <Card className="p-3">
              <h4>Date / Time</h4>
              <p>2023-02-26 09:15:00</p>
            </Card>
          </Col>
          <Col>
            <Card className="p-3">
              <h4>Name</h4>
              <p>Another File</p>
            </Card>
          </Col>
          <Col>
            <Card className="p-3">
              <h4>Link</h4>
              <a href="#">View</a>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
