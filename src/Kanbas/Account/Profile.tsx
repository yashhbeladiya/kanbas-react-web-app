import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
import toast from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
    toast.success("Profile updated successfully");
  };

  const fetchProfile = async () => {
    const currentUser1 = await client.profile();
    if (!currentUser1) {
      dispatch(setCurrentUser(null));
      navigate("/Kanbas/Account/Signin");
    }
    setProfile(currentUser1);
  };

  const signOut = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return ""; // Return an empty string if dateString is undefined or null
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Return an empty string if the date is invalid
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div
        id="wd-profile-screen"
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="card-title text-center mb-4">Profile</h3>
        {profile && (
          <div className="card-body">
            <input
              id="wd-username"
              defaultValue={profile.username}
              placeholder="Username"
              className="form-control mb-3"
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
            <input
              id="wd-password"
              defaultValue={profile.password}
              placeholder="Password"
              type="password"
              className="form-control mb-3"
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
            <input
              id="wd-firstname"
              defaultValue={profile.firstName}
              placeholder="First Name"
              className="form-control mb-3"
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
            <input
              id="wd-lastname"
              defaultValue={profile.lastName}
              placeholder="Last Name"
              className="form-control mb-3"
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
            <input
              id="wd-dob"
              defaultValue={formatDate(profile.dob)}
              type="date"
              placeholder="Date of Birth"
              className="form-control mb-3"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
            <input
              id="wd-email"
              defaultValue={profile.email}
              type="email"
              placeholder="Email"
              className="form-control mb-3"
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
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
              onClick={updateProfile}
              className="btn btn-primary w-100 mb-2"
            >
              {" "}
              Update{" "}
            </button>
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
