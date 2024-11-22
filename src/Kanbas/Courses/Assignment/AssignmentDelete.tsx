import { deleteAssignment } from "./reducer";
import * as assignmentClient from "./client";
import { useDispatch } from "react-redux";

export default function AssignmentDelete({
  dialogTitle,
  assignmentId,
}: {
  dialogTitle: string;
  assignmentId: string;
}) {

  const dispatch = useDispatch();

  const removeAssignment = async (assignmentId: string) => {
    await assignmentClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  }

  const modalId = `wd-delete-assignment-dialog-${assignmentId}`;
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      role="dialog"
      aria-labelledby={`${modalId}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
          <h1 className="modal-title fs-5" id={`${modalId}-label`}>
              {dialogTitle}
            </h1>
          </div>
          <div className="modal-body">
          <p>Are you sure you want to delete this assignment?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={() => removeAssignment(assignmentId)}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
