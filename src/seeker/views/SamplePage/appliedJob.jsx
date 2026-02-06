import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

 function AppliedJob() {
  const [apps, setApps] = useState([]);
  const [cookies] = useCookies(["seeker_token"]);

  function loadApplications() {
    axios.get("http://localhost:8000/applications/me", {
      headers: {
        Authorization: `Bearer ${cookies['seeker_token']}`
      }
    })
    .then(res => {
      setApps(res.data.applications);
    })
    .catch(err => {
      alert(err.response?.data?.message || "Something went wrong");
    });
  }

  
  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <div className="p-4">
      <div className="d-flex flex-wrap justify-content-between">
        {
          apps.map(app => (
            <div key={app._id} className="p-4 " style={{width:'350px'}}>
              <div
                className="card shadow"
                style={{ cursor: "not-allowed"}}
              >
                <div className="card-header">
                  <h5 >{app.jobId?.name}</h5>
                </div>

                <div className="card-body">
                  <p><i className="bi bi-bag"></i> {app.jobId?.experience} years</p>
                  <p><i className="bi bi-currency-rupee"></i> {app.jobId?.salary}</p>
                  <p><i className="bi bi-geo-alt-fill"></i> {app.jobId?.location}</p>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center">
                  <span>
                    Status: <b>{app.status}</b>
                  </span>

                  <button className="btn btn-success btn-sm" disabled>
                    Applied
                  </button>
                </div>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  );
}
export default AppliedJob;
