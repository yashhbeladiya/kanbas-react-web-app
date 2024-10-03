import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="mt-4 ms-4">
      <h3>Profile</h3>
      <input
        id="wd-username"
        value="alice"
        placeholder="username"
        className="form-control mb-2"
      />
      <input
        id="wd-password"
        value="123"
        placeholder="password"
        type="password"
        className="form-control mb-2"
      />

      <input
        id="wd-firstname"
        value="Alice"
        placeholder="First Name"
        className="form-control mb-2"
      />
      <input
        id="wd-lastname"
        value="Wonderland"
        placeholder="Last Name"
        className="form-control mb-2"
      />
      <input
        id="wd-dob"
        value="mm/dd/yyyy"
        type="date"
        className="form-control mb-2"
      />
      <input
        id="wd-email"
        value="alice@wonderland"
        type="email"
        className="form-control mb-2"
      />
      <select id="wd-role" className="form-control mb-2">
        <option value="USER" className="form-control">User</option>
        <option value="ADMIN" className="form-control">Admin</option>
        <option value="FACULTY" className="form-control">Faculty</option>
        <option value="STUDENT" className="form-control">Student</option>
      </select>
      <Link to="/Kanbas/Account/Signin" className="btn btn-danger w-100">Sign out</Link>
    </div>
  );
}
