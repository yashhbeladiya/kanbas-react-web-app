import React from "react";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div
        id="wd-signup-screen"
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="card-title text-center mb-3">Sign up</h3>
        <div className="card-body">
          <input placeholder="Username" className="form-control mb-3" />
          <input
            placeholder="Password"
            type="password"
            className="form-control mb-3"
          />
          <input
            placeholder="Verify Password"
            type="password"
            className="form-control mb-3"
          />
          <Link
            to="/Kanbas/Account/Profile"
            className="btn btn-primary w-100 mb-2"
          >
            Sign up
          </Link>
          <div className="text-center">
            <Link to="/Kanbas/Account/Signin" className="text-decoration-none">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
