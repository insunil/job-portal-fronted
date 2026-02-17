import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function JobDetails() {
  const params = useParams();

  const [job, setJob] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://api.insunil.ind.in/jobs/${params.id}`)
      .then((res) => {
        setJob(res.data.job);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load job details");
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return <h4 className="text-center mt-5">Loading job details...</h4>;
  }

  if (error) {
    return <h4 className="text-danger text-center mt-5">{error}</h4>;
  }

  return (
    <div className="m-4 p-4">
      <div className="card shadow p-4">
        <h2 className="mb-2">{job.name}</h2>

        <p className="text-muted mb-1">
          <b>
            <span className="bi bi-building"></span> {job.companyId.name}
          </b>{" "}
          ({job.companyId.location})
        </p>

        <p className="text-muted">
          <i className="bi bi-geo-alt"></i> {job.location} |{" "}
          <i className="bi bi-box-fill"></i> {job.experience} yrs |{" "}
          <i className="bi bi-currency-rupee"></i> {job.salary}
        </p>

        <hr />

        <h5>Job Description</h5>
        <p>{job.description}</p>

        <h5>Required Skills</h5>
        <div className="mb-3">
          {job.skills.map((skill, index) => (
            <span key={index} className="badge bg-primary me-2 mb-2">
              {skill}
            </span>
          ))}
        </div>

        <h5>Job Address</h5>
        <p>{job.address}</p>

        <p className="text-muted">
          <i className="bi bi-calendar-date"></i> Posted on: {job.date}
        </p>

        <p>
          Status:{" "}
          {job.isActive ? (
            <span className="badge bg-success">Active</span>
          ) : (
            <span className="badge bg-danger">Closed</span>
          )}
        </p>

        <Link to={`/seeker/apply-job/${job._id}`} className="btn btn-success mt-3">
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export default JobDetails;
