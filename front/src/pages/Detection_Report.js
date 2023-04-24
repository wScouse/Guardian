import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams, useLocation } from "react-router-dom";
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
import { useNavigate } from 'react-router-dom';

const Missing_Report = () => {
  console.log("Missing Report component rendered")
  const { id } = useParams();
  // console.log(id);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Check if user is authenticated
  if (localStorage.getItem('authenticated') === 'false') {
    console.log('Not authenticated');
    navigate('/login');
  }

  useEffect(() => {
    fetchData();  // Data for the report
  }, []);

  const fetchData = () => {
    const data = { id: id};
    fetch('http://localhost:5000/api/missing_report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then(data => {
        setData(data);
        console.log("Success"); 
        console.log(data);
      })
      .catch(error => {console.log(error); 
        console.log(error);
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

  // console.log("Test")
  // console.log(data)
  // console.log(data.length)

  return (
    <div className="bg-dark">
      <Navbar expand="lg" variant="dark" className="navbar-main">
        <Container fluid>
        <Navbar.Brand to="/">Guardian</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/detections" className="link">Back</Nav.Link>
        </Nav>
        <Button variant="danger" className="ml-auto" onClick={handleLogout}>
          Logout
        </Button>
        </Container>
      </Navbar>
      {data.length > 1 ? (
      <div className="container my-5 text-white">
        {/* {data.map((item) => ( */}
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              {/* Missing Information Start */}
              <h1 className="mb-4">Initial Report</h1>
              <Card className="my-3">
                <Card.Header>{data[1]}</Card.Header> {/* Missing ID */}
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={`http://localhost/Guardian/GuardianDB/${data[12]}.jpg`}
                    alt="Missing Report Image"
                  />
                  <Card.Title>{data[5]}</Card.Title> {/* Missing Name */}
                  <Card.Text>
                    <p>{data[8]}</p> {/* Missing Age */}
                    <p>{data[9]}</p> {/* Missing Gender */}
                    <p>{data[6]}</p> {/* Missing Since */}
                    <p>{data[7]}</p> {/* Missing From */}
                    <p>{data[14]}</p> {/* Estimated Threat */}
                    <p>{data[10]}</p> {/* Extra Info */}
                    <p>{data[11]}</p> {/* Kin ID*/}
                  </Card.Text>
                </Card.Body>
              </Card>
              {/* Missing Information End */}
            </div>
            <div className="col-md-6 mb-5 mb-md-0">
              {/* Detection Data Start */}
              <h1 className="mb-4">Detection Details</h1>
              <Card className="my-3">
              <Card.Header>{data[0]}</Card.Header>  {/* Detection ID */}
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={`http://localhost/Guardian/GuardianCaptures/${data[4]}.jpg`}
                    alt="Detection Capture"
                  />
                  <Card.Text>
                  <p>{data[2]}</p>  {/* Detection Date */}
                    <p>{data[3]}</p> {/* Detection Location */}
                    <p>{data[13]}</p> {/* Detection Threat */}
                  </Card.Text>
                </Card.Body>
              </Card>
              {/* Detection Data End */}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              {/* Kin Information Start */}
              <h1 className="mb-4">Kin Contact Details</h1>
              <Card className="my-3">
                <Card.Header>{data[11]}</Card.Header> {/* Kin ID */}
                <Card.Body>
                  <Card.Title>{data[15]}</Card.Title> {/* Kin Name */}
                  <Card.Text>
                    <p>{data[16]}</p> {/* Kin Mobile */}
                    <p>{data[17]}</p> {/* Kin Email */}
                  </Card.Text>
                </Card.Body>
              </Card>
              {/* Kin Information End */}
            </div>
          </div>
        {/* ))} */}
      </div>
      ) : (
        <div className="container my-5 text-white">
          <h1 className="mb-4">Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Missing_Report;
