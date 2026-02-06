import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

function ApplyJob() {
   const { id } = useParams(); 
  const navigate = useNavigate();
  const[cookies,setCookie,removeCookie]=useCookies(['token']);
  const [resumeName, setResumeName] = useState("");

  function setResumeFile(e) {
    if(!e.target.value){
      alert("Please enter resume link");
      return;
    }
      setResumeName(e.target.value); 
  }

  function submitApplication() {
    const applicationData = {
       jobId: id,
      resumeUrl: resumeName
    };

    axios.post(
      "http://localhost:8000/applications",
      applicationData,
      { headers: {
      Authorization: `Bearer ${ cookies['seeker_token']}`,
      "Content-Type": "application/json"
    }
      }
    )
    .then(() => {
      alert("Application submitted");
      navigate("/seeker");
    })
    .catch((err) => {
      alert(err.response?.data?.message || "Failed to apply");
      navigate("/seeker");
    });
  }

  return (
    <div className="m-4 p-4">
      <h2>Apply Job</h2>
      <dl>
        <dt>Resume:</dt>
        <dd> <input type="text"  placeholder="Enter drive resume link" onChange={setResumeFile} /></dd>
      </dl>
 <button className="btn btn-primary"  onClick={submitApplication}>
    Submit Application
      </button>
    </div>
  );
}

export default ApplyJob;