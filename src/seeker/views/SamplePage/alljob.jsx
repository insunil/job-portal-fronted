import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

 function AllJob() {
  const [jobs, setJobs] = useState([]);
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);


  const fetchJobs = (pageNumber = 1) => {
    console.log(`experience =${experience} page=${page} location =${location} limit=${limit}`)
    axios
      .get("http://localhost:8000/jobs/me", {
        headers: {
          Authorization: `Bearer ${cookies['seeker_token']}`
        },
        params: {
          experience,
          location,
          page: pageNumber,
          limit
        }
      })
      .then((res) => {
        setJobs(res.data.jobs);
        setTotal(res.data.total);
        setPage(pageNumber);
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Failed to fetch jobs");
        setJobs([]);
      });
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);

  // ---------------- HANDLERS ----------------
  const handleSearch = () => {
    fetchJobs(1); // reset to first page
  };

  const totalPages = Math.ceil(total / limit);
  //const totalPages=2;

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-2"></div>
        <div className="col-3">
          <label>Filter by Experience</label>
          <select className="form-select" onChange={(e) => setExperience(e.target.value)} >
            <option value="">All Experience</option>
            <option value="0">Fresher</option>
            <option value="1">Upto 1 Year</option>
            <option value="2"> Upto 2 Years</option>
            <option value="3"> Upto 3 Years</option>
            <option value="4"> Upto 4 Years</option>
            <option value="5"> Upto 5 Years</option>
          </select>
        </div>

        <div className="col-3">
          <label>Filter by Location</label>
          <select className="form-select" onChange={(e) => setLocation(e.target.value)} >
            <option value="">All Locations</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
          </select>
        </div>
        <div className="col-2">
          <button className="btn btn-primary  w-100 mt-4" onClick={fetchJobs}  >
            Search
          </button>
        </div>
      </div>


      <div className="d-flex flex-wrap justify-content-between">
        {jobs.length === 0 && (
          <div className="w-100 text-center mt-5">
            <h4 className="text-danger">Job not available</h4>
            <p className="text-muted">
              Try changing experience or location filter
            </p>
          </div>
        )}


        {jobs.map(job => (
          <div key={job._id} className="m-4 p-4 " >
            <div className="card shadow">
              <div className="card-header">
                <h5>{job.name}</h5>
              </div>
              <div className="card-body">
                <p><i className="bi bi-bag"></i> {job.experience} years</p>
                <p><i className="bi bi-currency-rupee"></i> {job.salary}</p>
                <p><i className="bi bi-geo-alt-fill"></i> {job.location}</p>
              </div>
              <div className="card-header d-flex justify-content-between">
                <div className="p-1">
                  Apply before {job.date}
                </div>
                {job.isApplied ? (
                  <button
                    className="btn btn-secondary ms-2"
                    disabled
                    style={{ cursor: "not-allowed" }}
                  >
                    Applied
                  </button>

                ) : (
                  <Link
                    to={`/seeker/job-details/${job._id}`}
                    className="btn btn-success ms-2"
                  >
                    Apply
                  </Link>
                )}              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            className="btn btn-secondary me-2"
            disabled={page === 1}
            onClick={() => fetchJobs(page - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-secondary ms-2"
            disabled={page === totalPages}
            onClick={() => fetchJobs(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AllJob;