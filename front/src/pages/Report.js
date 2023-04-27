import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from'react-router-dom';

const Report = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submit report')
    const form = event.target;
    const data = new FormData();
    data.append('firstname', form.firstname.value);
    data.append('lastname', form.lastname.value);
    data.append('age', form.age.value);
    data.append('gender', form.gender.value);
    data.append('additionalInfo', form.additionalInfo.value);
    data.append('contactName', form.kname.value);
    data.append('mobileNumber', form.kmobile.value);
    data.append('email', form.kemail.value);
    data.append('image', form.image.files[0]);
    console.log(data);
    fetch('http://localhost:5000/api/missing_add', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
      }
      })

    .then(response => response.json())
    .then(data => {console.log(data); 
      if (data.success) {
        navigate('/');
      } 
    })
    .catch(error => {console.log(error);
      setError('An error occurred. Please try again later.');
    });
  }


  return (
    <div className="bg-dark vh-100">
      <div className="container my-5 text-white">
        <div className="row">
          
          <div className="col-md-6 mb-5 mb-md-0">
            {/* Image Upload */}
            {/* <div className="col-md-6">
              <h2 className="mb-4">Image</h2>
              <div className="mb-3">
                <img src="" alt="Preview" className="img-fluid rounded" />
              </div>
              <div className="mb-3">
                <input className="form-control" type="file" id="formFile" />
              </div>
            </div> */}
            {/* Personal Details */}
            <h2 className="mb-4">Personal Details</h2>
            <form onSubmit={handleSubmit}> 
              <div className="mb-3">
                <label htmlFor="image">Image
                  <input type="file" className="form-control-file" id="image" name="image" accept="image/" required/>
                </label>
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <input type="text" className="form-control" id="firstname" />
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input type="text" className="form-control" id="lastname" />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input type="number" className="form-control" id="age" />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <input type="text" className="form-control" id="gender" />
              </div>
              <div className="mb-3">
                <textarea className="form-control" id="additionalInfo" rows="5" placeholder="Enter additional information here..."></textarea>
              </div>
              <h2 className="mb-4">Contact Details</h2>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Contact Name
                </label>
                <input type="text" className="form-control" id="kname" />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <input type="number" className="form-control" id="kmobile" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="kemail" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
