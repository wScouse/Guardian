import React, { useState } from "react";
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
  Modal,
  Form,
} from "react-bootstrap";

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "../components/Navbar.css"


function Search() {
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);



    function handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const data = new FormData();
      data.append('image', form.image.files[0]);
      console.log(data);
      fetch('http://localhost:5000/api/search', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json',
        }
        })
  
      .then(response => response.json())
      .then(data => {console.log(data); 
        setData(data);
        console.log(data);
        console.log(data.length);
        if (data.length > 0) {
          setResults(data);
        } else {
          setError('No Matches Found.');
        }
      })
      .catch(error => {console.log(error);
        setError('An error occurred. Please try again later.');
      });
    }

    const handleReject = (id) => {
      console.log('Reject', id);
    };

    const handleApprove = (id, name, capture) => {
      console.log('Approve', id);
      setSelectedItem({ id, name, capture})
      setShowModal(true);

      // const data = { id: id, name: name, capture: capture };
      // console.log(data);
      
    };

    const handleLocationSubmit = (e) => {
      e.preventDefault();
      console.log(location);
      const { id, name, capture } = selectedItem;
      const data = { id, name, capture, location };
      console.log(data);
      fetch('http://localhost:5000/api/search_add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (response.ok) {
          console.log('Approved');
          // window.location.reload();
        }
      })
      .catch(error => {console.log(error); 
      });
      setShowModal(false);
    };


  return (
    <div className="bg-dark">
      <Navbar expand="lg" variant="dark" className="navbar-main">
        <Container fluid>
        <Navbar.Brand href="#">Guardian</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/guardian">Home</Nav.Link>
          <Nav.Link as={Link} to="/detections">Detections</Nav.Link>
          <Nav.Link as={Link} to="/search" className="active-link">Search</Nav.Link>
          <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
          <Nav.Link as={Link} to="/guide">Guide</Nav.Link>
        </Nav>
        <Button variant="danger" className="ml-auto">
          Logout
        </Button>
        </Container>
      </Navbar>
      <div className="container my-5 text-white">
        {/* {data.map((item) => ( */}
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              {/* Image Upload */}
              <h1 className="mb-4">Upload Image</h1>
              <p className="mb-4">Upload an image of the missing person to search for.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="image">Image
                    <input type="file" className="form-control-file" id="image" name="image" accept="image/" required/>
                  </label>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
              
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="col-md-6 mb-5 mb-md-0">
              {/* Captured Image*/}
              {data.length > 0 && results && (
                <div className="d-flex justify-content-centre">
                  <img src={results[0].Capture} alt="Captured Image" />
                </div>
              )}
              
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              {/* Kin Information Start */}
              <h1 className="mb-4">Detections</h1>
              {data.length > 0 && (
                <Table striped bordered hover variant="dark" className="mx-auto">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Report Photo</th>
                      <th>Approve / Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(row => (
                      <tr key={row.ID}>
                        <td>{row.Name}</td>
                        <td><img src={row.Photo} alt="Missing Report Image" /></td>
                        <td>
                          <Button variant="success" className="ml-auto" onClick={() => handleApprove(row.ID, row.Name, row.Capture)}>Approve</Button>
                          {/* <Button variant="danger" className="ml-auto" onClick={() => handleReject(row.ID)}>Reject</Button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                )}
            </div>
          </div>

      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLocationSubmit}>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>


    </div>

    


  


  );


}

export default Search;
