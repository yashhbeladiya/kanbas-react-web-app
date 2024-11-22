import AssignmentControl from "./AssignmentControl";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { BsGripVertical } from "react-icons/bs";
import AssignmentIcon from "./AssignmentIcon";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as courseClient from "../client";
import {
  setAssignments,
} from "./reducer";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await courseClient.fetchAssignment(cid as string);
    dispatch(setAssignments(assignments));
  }

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div id="wd-assignments">
      <AssignmentControl />
      <div>
        <div
          id="wd-assignments-title"
          className="wd-assignment-title p-0 me-3 fs-5 pt-3 pb-3 d-flex justify-content-between bg-secondary border border-1 border-dark"
        >
          <div className="d-flex float-left mt-1">
            <BsGripVertical className="me-2 fs-3" />
            <h4>ASSIGNMENTS</h4>
          </div>

          {currentUser?.role === "FACULTY" && (
          <div className="float-right me-2">
            <button className="btn wd-assignment-percent-button border border-black">
              40% of Total
            </button>
            <button className="btn">
              <GoPlus className="fs-5 mb-1" />
            </button>
            <IoEllipsisVertical className="fs-4" />
          </div>
          )}
        </div>

        <ul id="wd-assignment-list" className="list-group rounded-0">
          {assignments
            .map((assignment: any) => (
              <li className="d-flex wd-assignment-list-item list-group-item pt-3 pb-3 pe-0 me-3 fs-6 wd-lesson">
                <div className="d-flex align-items-center ps-0 ms-0 me-2 float-left">
                  <AssignmentIcon />
                </div>
                <div className="float-left">
                  {currentUser?.role === "FACULTY" ? (
                  <a
                    className="wd-assignment-link p-2 ps-0 fs-5 text-dark"
                    href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                  >
                    {assignment.title}
                  </a>
                  ) : (
                    <h5>{assignment.title}</h5>
                  )}
                </div>
                {currentUser?.role === "FACULTY" && (
                <div className="ms-auto me-2 d-flex">
                  <AssignmentControlButtons
                    assignmentId={assignment._id}
                  />
                </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
