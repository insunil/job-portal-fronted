import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Application() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [apps, setApps] = useState([]);
  const[cookies,setCookie,removeCookie]=useCookies([]);

  
  function loadJobs() {
    axios.get("http://api.insunil.ind.in/jobs")
      .then(res => {
        setJobs(res.data.jobs);
      });
  }

  function loadApplicationwithoutId() {
  axios.get(`http://api.insunil.ind.in/applications/employer`,{
        headers: {
       Authorization: `Bearer ${cookies['employer_token']}`
  },
  })
      .then(res => {
        setApps(res.data.applications);
        console.log(apps);
      }).catch((err)=>{
          alert('Error fetching applications: ' + err.response?.data?.message || err.message);
      });
  }

  
  function loadApplications(jobId) {
    setSelectedJobId(jobId);

    axios.get(`http://api.insunil.ind.in/applications/job/${jobId}`)
      .then(res => {
        setApps(res.data.applications);
        console.log(apps);
      }).catch((err)=>{
          alert('Error fetching applications: ' + err.response?.data?.message || err.message);
      });
  }

  useEffect(() => {
    loadJobs();
    loadApplicationwithoutId()
  }, []);

  return (
    <div className="p-4 m-4">
      <h2>Job Component</h2>

      <div className="row mt-4">

      
        <div className="col-2">
          <ol className="list-group">
            {jobs.map(job => (
              <li key={job._id} className="btn btn-outline-primary w-100 mb-2" style={{ cursor: "pointer" }}
                onClick={() => loadApplications(job._id)}
              >
                {job.name}
              </li>
            ))}
          </ol>
        </div>

       
        <div className="col-10">
          <h3>Applications</h3>

          {!selectedJobId && (
            <p className="text-muted">
              Select a job to view applications
            </p>
          )}

          {selectedJobId && apps.length === 0 && (
            <p className="text-muted">
              No applications found
            </p>
          )}

          {apps.length > 0 && (
            <table className="table table-bordered table-striped mt-3">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Candidate Name</th>
                  <th>Email</th>
                  <th>Resume</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app, index) => (
                  <tr key={app._id}>
                    <td>{index + 1}</td>
                    <td>{app.seekerId?.name}</td>
                    <td>{app.seekerId?.email}</td>
                    <td>
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Resume
                      </a>
                    </td>
                    <td>
                      <span className="badge bg-info">
                        {app.status || "Applied"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}
export default Application;