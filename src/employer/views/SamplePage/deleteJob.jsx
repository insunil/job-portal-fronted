import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function DeleteJob() {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["employer_token"]);

  // 🔹 Fetch job details
  useEffect(() => {
    axios
      .get(`http://localhost:8000/jobs/${id}`)
      .then((res) => {
        setJob(res.data.job); 
      })
      .catch(() => {
        alert("Failed to load job");
      });
  }, [id]);

 
  function remove() {
    axios
      .delete(`http://localhost:8000/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.employer_token}`,
        },
      })
      .then(() => {
        alert("Job deleted successfully");
        navigate("/employer/jobs");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Delete failed");
      });
  }

  if (!job) {
    return <h4 className="p-4">Loading...</h4>;
  }

  return (
    <div className="p-4">
      <h2>Delete Job</h2>
      <h5>Are you sure you want to delete this job?</h5>

      <h5 className="text-danger">{job.name}</h5>

      <button onClick={remove} className="btn btn-danger me-2">
        Yes, Delete
      </button>

      <Link to="/employer/jobs" className="btn btn-warning">
        Cancel
      </Link>
    </div>
  );
}

export default DeleteJob;