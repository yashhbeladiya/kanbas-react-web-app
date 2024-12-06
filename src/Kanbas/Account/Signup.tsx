import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    const newUser = await client.signup(user);
    if (!newUser) return;

    // Automatically sign in the user after signup
    const signedInUser = await client.signin({ username: user.username, password: user.password });
    if (!signedInUser) return;
    
    dispatch(setCurrentUser(newUser));
    navigate("/Kanbas/Account/Profile");
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div
        id="wd-signup-screen"
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="card-title text-center mb-3">Sign up</h3>
        <div className="card-body">
          <input
            placeholder="Username"
            className="form-control mb-3"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            type="password"
            className="form-control mb-3"
          />
          {/* <input
            placeholder="Verify Password"
            type="password"
            className="form-control mb-3"
          /> */}
          <button
            onClick={signup}
            className="wd-signup-btn btn btn-primary mb-2 w-100"
          >
            {" "}
            Sign up{" "}
          </button>
          <br />
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
