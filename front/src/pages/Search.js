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
} from "react-bootstrap";

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "../components/Navbar.css"


function Search() {
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])


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
        setResults(data);
        setData(data);
      })
      .catch(error => {console.log(error);
        setError('An error occurred. Please try again later.');
      });
    }

    const handleReject = (id) => {
      console.log('Reject', id);
    };

    const handleApprove = (id) => {
      console.log('Reject', id);
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
            <div className="col-md-6 mb-5 mb-md-0">
              {/* Kin Information Start */}
              <h1 className="mb-4">Kin Contact Details</h1>
              {data.length > 0 && (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Report Photo</th>
                    <th>Capture</th>
                    <th>Approve / Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(row => (
                    <tr key={row.ID}>
                      <td>{row.Name}</td>
                      <td><img src={row.Photo} alt="Missing Report Image" /></td>
                      <td><img src={row.Capture} alt="Captured Image" /></td>
                      <td>
                        <Button variant="success" className="ml-auto" onClick={() => handleApprove(row.id)}>Approve</Button>
                        <Button variant="danger" className="ml-auto" onClick={() => handleReject(row.id)}>Reject</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}

export default Search;
