import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams, useLocation } from "react-router-dom";

const Missing_Report = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();  // Data for the report
  }, []);

  const fetchData = () => {
    console.log(id);
    const data = { id: id};
    fetch('http://localhost:5000/api/missing_report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        setData(data);
        console.log("Success"); 
        console.log(data);
      })
      .catch(error => {console.log(error); 
      });
  };


  return (
    <div className="bg-dark vh-100">
      <div className="container my-5 text-white">
        <div className="row">
          
          <div className="col-md-6 mb-5 mb-md-0">
            {/* Missing Information Start */}
            <h1 className="mb-4">Initial Report</h1>
            <ul>
                {data.map((item) => (
                    <p key={item.id}>{item.Name}</p>
                    
                ))}
            </ul>
            {/* Missing Information End */}
          </div>
          <div className="col-md-6 mb-5 mb-md-0">
            {/* Detection Data Start */}
            <h1 className="mb-4">Detection Details</h1>
            
            {/* Detection Data End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missing_Report;
