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

function Detections() {
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
        <Button variant="danger" className="ml-auto">
          Logout
        </Button>
      </Navbar>
      <Container className="mt-4">
        <Row>
          <Col>
           
          </Col>
          <Col>
            <Card className="p-3">
              <h4>Video Feed</h4>
              <p>Online</p>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="mt-4">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Threat level</th>
              <th>Date / Time</th>
              <th>Name</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>High</td>
              <td>2022-03-01 12:34:56</td>
              <td>Malware attack</td>
              <td>
                <a href="#">View</a>
              </td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>2022-02-28 23:45:01</td>
              <td>Phishing email</td>
              <td>
                <a href="#">View</a>
              </td>
            </tr>
            <tr>
              <td>Low</td>
              <td>2022-02-27 09:12:34</td>
              <td>Suspicious activity</td>
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

export default Detections;
