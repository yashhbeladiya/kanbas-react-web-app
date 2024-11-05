import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) {
      navigate("/Kanbas/Account/Signin");
    }
    setProfile(currentUser);
  };

  const signOut = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div id="wd-profile-screen" className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="card-title text-center mb-4">Profile</h3>
        {profile && (
          <div className="card-body">
            <input
              id="wd-username"
              defaultValue={profile.username}
              placeholder="Username"
              className="form-control mb-3"
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
            <input
              id="wd-password"
              defaultValue={profile.password}
              placeholder="Password"
              type="password"
              className="form-control mb-3"
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
            <input
              id="wd-firstname"
              defaultValue={profile.firstname}
              placeholder="First Name"
              className="form-control mb-3"
              onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
            />
            <input
              id="wd-lastname"
              defaultValue={profile.lastname}
              placeholder="Last Name"
              className="form-control mb-3"
              onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
            />
            <input
              id="wd-dob"
              defaultValue={profile.dob}
              type="date"
              className="form-control mb-3"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
            <input
              id="wd-email"
              defaultValue={profile.email}
              type="email"
              className="form-control mb-3"
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />

            <select
              id="wd-role"
              value={profile.role || "USER"}
              className="form-control mb-3"
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
            <button
              id="wd-signout-btn"
              className="btn btn-danger w-100 mb-2"
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
