import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignment from "./Assignment";
import AssignmentEditor from "./Assignment/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import * as courseClient from "./client";
import { useEffect, useState } from "react";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === cid);
  const [users, setUsers] = useState<any[]>([]);

  const fetchCourseUsers = async () => {
    if (cid) {
      const users = await courseClient.findUsersForCourse(cid);
      setUsers(users);
      console.log(users);
    } else {
      console.error("Course ID is undefined");
    }
  }

  useEffect(() => {
    fetchCourseUsers();
  }, [cid]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger mt-3">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignment />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable users={users} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
