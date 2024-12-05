import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";
import toast from "react-hot-toast";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) {
      toast.error("Invalid credentials");
    }
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 mx-auto">
      <div
        id="wd-signin-screen"
        className="card p-4 shadow-sm "
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="card-title text-center mb-3">Sign in</h3>
        <div className="card-body">
          <input
            defaultValue={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            id="wd-username"
            placeholder="Username"
            className="form-control mb-3"
          />
          <input
            defaultValue={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            id="wd-password"
            placeholder="Password"
            type="password"
            className="form-control mb-3"
          />
          <button
            id="wd-signin-btn"
            type="button"
            className="btn btn-primary w-100 mb-3"
            onClick={signin}
          >
            Sign in
          </button>
          <div className="text-center mt-3">
            <Link
              id="wd-signup-link"
              to="/Kanbas/Account/Signup"
              className="text-decoration-none text-danger"
            >
              Don’t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
