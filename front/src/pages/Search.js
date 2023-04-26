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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', event.target.image.files[0]);

    console.log(formData);

    
      fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: {
          'enctype': 'multipart/form-data',
        },
        body: formData,
      })

      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setResults(data);
        setError(null);
      })
      .catch(error => {console.log(error);
        setError('An error occurred. Please try again later.');
      });
    }


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
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Details</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {data.map(row => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.threat}</td>
                      <td>{row.found}</td>
                      <td>
                        <Button variant="success" className="ml-auto" onClick={() => viewDetails(row.id)}>Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </Table>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Search;
