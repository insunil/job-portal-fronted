import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-4">
      <h1>Welcome to My App</h1>
      <div className="d-flex justify-content-end">
        <button className="m-2" onClick={() => navigate("/seeker-register")}>
        Seeker Register
      </button>
     

      <button className="m-2" onClick={() => navigate("/seeker-login")}>
        User Login
      </button>

    

      <button className="m-2" onClick={() => navigate("/employer-login")}>
        Employer Login
      </button>
      </div>
    </div>
  );
}
