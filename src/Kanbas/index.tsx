import { Navigate, Route, Routes } from "react-router-dom";
import Session from "./Account/session";
import "./styles.css";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useSelector } from "react-redux";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCourses = async () => {
    if (!currentUser || !currentUser._id) {
      console.log("No user logged in, currentUser:", currentUser);
      return;
    }

    try {
      // const fetchedCourses = await userClient.findMyCourses(currentUser._id);
      const fetchedCourses = await courseClient.fetchAllCourses();
      console.log("Fetched courses:", fetchedCourses);
      setCourses(fetchedCourses);
    } catch (err: any) {
      console.error("Error fetching courses:", err);
      setError(err);
    }
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  const addNewCourse =  async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, { ...course, newCourse }]);
  };

  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    updateCourse={updateCourse}
                    deleteCourse={deleteCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />{" "}
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
