import AssignmentControl from "./AssignmentControl";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { BsGripVertical } from "react-icons/bs";
import AssignmentIcon from "./AssignmentIcon";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControl />
      <div>
        <div
          id="wd-assignments-title"
          className="wd-assignment-title p-0 me-3 fs-5 pt-3 pb-3 d-flex justify-content-between bg-secondary"
        >
          <div className="d-flex float-left mt-1">
            <BsGripVertical className="me-2 fs-3" />
            <h4>ASSIGNMENTS</h4>
          </div>

          <div className="float-right me-2">
            <button className="btn wd-assignment-percent-button border border-black">
              40% of Total
            </button>
            <button className="btn">
              <GoPlus className="fs-5 mb-1" />
            </button>
            <IoEllipsisVertical className="fs-4" />
          </div>
        </div>

        <ul id="wd-assignment-list" className="list-group rounded-0">
          <li className="d-flex wd-assignment-list-item list-group-item pt-3 pb-3 pe-0 me-3 fs-6 wd-lesson">
            <div className="col-md-1 col-xl-1 col-sm-1 d-flex align-items-center ps-0 ms-0 me-2 float-left">
              <AssignmentIcon />
            </div>
            <div className="col-md-10 col-xl-10 col-sm-10">
              <a
                className="wd-assignment-link p-2 ps-0 fs-5 text-dark"
                href="#/Kanbas/Courses/1234/Assignments/123"
              >
                A1
              </a>
              <br />
              <span className="text-danger">Multiple Modules </span>{" "}
              <b>| Not available until</b> May 6 at 12:00 am |<b> Due</b> May 13
              at 11:59 pm | 100 pts
            </div>
            <div className="col-md-1 col-xl-1 col-sm-1 d-flex align-items-center float-right me-0 ms-2">
              <LessonControlButtons />
            </div>
          </li>
          <li className="d-flex wd-assignment-list-item list-group-item pt-3 pb-3 pe-0 me-3 fs-6 wd-lesson">
            <div className="col-md-1 col-xl-1 col-sm-1 d-flex align-items-center ps-0 ms-0 me-2 float-left">
              <AssignmentIcon />
            </div>
            <div className="col-md-10 col-xl-10 col-sm-10">
              <a
                className="wd-assignment-link p-2 ps-0 fs-5 text-dark"
                href="#/Kanbas/Courses/1234/Assignments/123"
              >
                A2
              </a>
              <br />
              <span className="text-danger">Multiple Modules </span>{" "}
              <b>| Not available until</b> May 13 at 12:00 am |<b> Due</b> May 20 at 11:59 pm | 100 pts
            </div>
            <div className="col-md-1 col-xl-1 col-sm-1 d-flex align-items-center float-right me-0 ms-2">
              <LessonControlButtons />
            </div>
          </li>
          <li className="d-flex wd-assignment-list-item list-group-item pt-3 pb-3 pe-0 me-3 fs-6 wd-lesson">
          <div className="col-md-1 col-xl-1 col-sm-1 d-flex align-items-center ps-0 ms-0 me-2 float-left">
            <AssignmentIcon />
          </div>
          <div className="col-md-10 col-xl-10 col-sm-10">
            <a
              className="wd-assignment-link p-2 ps-0 fs-5 text-dark"
              href="#/Kanbas/Courses/1234/Assignments/123"
            >
              A3
            </a>
            <br />
            <span className="text-danger">Multiple Modules </span>{" "}
            <b>| Not available until</b> May 20 at 12:00 am |<b> Due</b> May 27 at 11:59 pm | 100 pts
          </div>
          <div className="col-md-1 col-xl-1 col-sm-1 d-flex align-items-center float-right me-0 ms-2">
            <LessonControlButtons />
          </div>
        </li>
        </ul>
      </div>
    </div>
  );
}
