// src/routes/Unauthorized.jsx
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>403 - Unauthorized</h1>
      <p>You don’t have permission to access this page.</p>

      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}
