export default function AssignmentDelete({
  dialogTitle,
  assignmentId,
  deleteAssignment,
}: {
  dialogTitle: string;
  assignmentId: string;
  deleteAssignment: () => void;
}) {
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
              onClick={deleteAssignment}
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
