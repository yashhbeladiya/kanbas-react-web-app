import { Link, useNavigate } from "react-router-dom";
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
    <div id="wd-profile-screen" className="mt-4 ms-4">
      <h3>Profile</h3>
      {profile && (
        <div>
          <input
            id="wd-username"
            defaultValue={profile.username}
            placeholder="username"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <input
            id="wd-password"
            defaultValue={profile.password}
            placeholder="password"
            type="password"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />

          <input
            id="wd-firstname"
            defaultValue={profile.firstname}
            placeholder="First Name"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
          />
          <input
            id="wd-lastname"
            defaultValue={profile.lastname}
            placeholder="Last Name"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
          />
          <input
            id="wd-dob"
            defaultValue={profile.dob}
            type="date"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <input
            id="wd-email"
            defaultValue={profile.email}
            type="email"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />

          <select id="wd-role" value={profile.role || "USER"} className="form-control mb-2" 
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER" className="form-control">
              User
            </option>
            <option value="ADMIN" className="form-control">
              Admin
            </option>
            <option value="FACULTY" className="form-control">
              Faculty
            </option>
            <option value="STUDENT" className="form-control">
              Student
            </option>
          </select>
          <button
            id = "wd-signut-btn"
            className="btn btn-danger w-100 mb-2"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
