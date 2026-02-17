import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

 function Job() {
  const [jobs, setJobs] = useState([]);
  const[cookies,setCookie,removeCookie]=useCookies(['employer_token']);

  
  function loadJobs() {
    axios.get("http://api.insunil.ind.in/jobs/employer", {
        headers: {
          Authorization: `Bearer ${cookies['employer_token']}`,
        },
      }).then(res=>{
        setJobs(res.data.jobs);
      }).catch(err=>{
        alert('Login failed: ' + err.response.data.message);
      })
    }

  useEffect(() => {
    loadJobs();
  }, []);

  

  return (
    <div className="container mt-4">
      <h3>My Jobs</h3>
       <Link to={'/employer/add-job'} className="bi bi-person-workspace  px-4 btn btn-success">Add Job</Link>

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Location</th>
            <th>Experience</th>
            <th>Status</th>
            <th style={{ width: "160px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No jobs found
              </td>
            </tr>
          ) : (
            jobs.map((job, index) => (
              <tr key={job._id}>
                <td>{index + 1}</td>
                <td>{job.name}</td>
                <td>{job.location}</td>
                <td>{job.experience} yrs</td>
                <td>
                  <span className="badge bg-success">
                    {job.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                 <Link to={`/employer/edit-job/${job._id}`} className="btn btn-sm btn-primary me-2" > Edit </Link>
                 <Link  to={`/employer/delete-job/${job._id}`} className="btn btn-sm btn-danger">Delete</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Job;