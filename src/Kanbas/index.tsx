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
import toast from "react-hot-toast";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({});
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  console.log("Server is running on:", process.env.REACT_APP_REMOTE_SERVER);

  const removeNullCourses = (courses: any) => {
    return courses.filter((course: any)=> course !== null);
  };

  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser?._id);
      setCourses(removeNullCourses(courses))
    } catch (error) {
      console.log(currentUser);
      console.error(error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };
 
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c?._id === course?._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(removeNullCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
 

  const updateCourse = async () => {
    console.log("Course ID", course._id);
    console.log("Updating course", course);
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

  const validateCourse = () => {
    if (!course.name || !course.description) {
      toast.error("Please enter a name and description for the course.");
      return true;
    }
    return false;
  }
  const addNewCourse =  async () => {
    if(validateCourse()) { return; }

    setCourse({ ...course });
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, { ...course, ...newCourse }]);
    setCourse({});
    console.log("New course", newCourse);
  };

  const deleteCourse = async (courseId: string) => {
    console.log(courseId);
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    // await fetchCourses();
  };

  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

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
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
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