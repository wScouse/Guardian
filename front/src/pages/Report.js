import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Report = () => {
  return (
    <div className="bg-dark vh-100">
      <div className="container my-5 text-white">
        <div className="row">
          
          <div className="col-md-6 mb-5 mb-md-0">
            {/* Form 1 Start */}
            <div className="col-md-6">
              <h2 className="mb-4">Image</h2>
              <div className="mb-3">
                <img src="" alt="Preview" className="img-fluid rounded" />
              </div>
              <div className="mb-3">
                <input className="form-control" type="file" id="formFile" />
              </div>
            </div>
            {/* Form 1 End */}
            {/* Form 2 Start */}
            <h2 className="mb-4">Personal Details</h2>
            <form>
              <div className="mb-3">
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
            </form>
            {/* Form 2 End */}
          </div>
          <div className="col-md-6 mb-5 mb-md-0">
            {/* Form 3 Start */}
            <h2 className="mb-4">Next of Kin</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
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
            </form>
            {/* Form 3 End */}
            {/* Form 4 Start */}
            <h2 className="mb-4">Additional Information</h2>
            <form>
              <div className="mb-3">
                <textarea className="form-control" id="additionalInfo" rows="5" placeholder="Enter additional information here..."></textarea>
              </div>
            </form>
            {/* Form 4 End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
