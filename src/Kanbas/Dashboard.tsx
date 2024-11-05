import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { enrolledCourse, unenrolledCourse } from "./reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Check if the user is enrolled in a course
  const isEnrolled = (courseId : string) => {
    const enrolled = enrollments.some(
      (enrollment: any) =>
        enrollment.course === courseId && enrollment.user === currentUser._id
    );
    console.log("Enrollment status for course", course._id, ":", enrolled);
    return enrolled;
  };

  const handleEnrollment = (courseId: any, event: any) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (isEnrolled(courseId)) {
      // find enrollment id
      const enrollment = enrollments.find(
        (enrollment: any) =>
          enrollment.course === courseId && enrollment.user === currentUser._id
      );
      dispatch(unenrolledCourse(enrollment._id));
      console.log("Unenrolled from course");
    } else {
      // enroll in course
      dispatch(
        enrolledCourse({
          _id: new Date().getTime().toString(),
          course: courseId,
          user: currentUser._id,
        })
      );
      console.log("Enrolled in course", courseId);
      
      console.log(enrollments);

    }
  };

  const handleCourseClick = (courseId: any, event: any) => {
    if (currentUser?.role === "STUDENT" && !isEnrolled(courseId)) {
      event.preventDefault();
      alert("You must enroll in the course to view it.");
      return;
    }
  };

  const getDisplayCourses = () => {
    if (currentUser?.role === "FACULTY" || showAllCourses) {
      return courses;
    }
    return courses.filter((course) => isEnrolled(course._id));
  };

  return (
    <div id="wd-dashboard" className="mt-2">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser?.role === "FACULTY" && (
        <div className="wd-edit-courses me-2">
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </div>
      )}
      {currentUser?.role === "STUDENT" && (
        <button
          className="btn btn-primary float-end me-3"
          id="wd-enrollment"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show Enrolled" : "Enrollment"}
        </button>
      )}
      <h2 id="wd-dashboard-published">
        {currentUser?.role === "FACULTY"
          ? `Published Courses (${courses.length})`
          : `${showAllCourses ? "All" : "Enrolled"} Courses (${
              getDisplayCourses().length
            })`}
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {getDisplayCourses().map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  onClick={(event) => handleCourseClick(course._id, event)}
                >
                  <img src="/images/reactjs.jpg" width="100%" height={160} alt="" />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <button className="btn btn-primary"> Go </button>

                    {currentUser?.role === "FACULTY" && (
                      <>
                        <button // Delete button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>

                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}

                    {currentUser?.role === "STUDENT" && (
                      <button
                        onClick={(e) => handleEnrollment(course._id, e)}
                        className={`btn float-end ${
                          isEnrolled(course._id) ? "btn-danger" : "btn-success"
                        }`}
                      >
                        {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
