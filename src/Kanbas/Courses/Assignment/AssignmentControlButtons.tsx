import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import AssignmentDelete from "./AssignmentDelete";

export default function AssignmentControlButtons({
    assignmentId,
}: {
    assignmentId: string;
}) {


  return (
    <div className="float-end d-flex">
      <button
        id="wd-delete-assignment-btn"
        className="border-0 bg-transparent"
        data-bs-toggle="modal"
        data-bs-target={`#wd-delete-assignment-dialog-${assignmentId}`}
      >
        <FaTrash className="fs-4 me-3 text-danger" />
      </button>
      <AssignmentDelete
        dialogTitle="Delete Assignment"
        assignmentId={assignmentId}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
