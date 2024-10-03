export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-5">
      <div className="mb-4">
        <h4>
          <label htmlFor="wd-name" className="form-label">
            Assignment Name
          </label>
        </h4>
        <div className="me-5 md-5">
          <input id="wd-name" value="A1" className="form-control" />
        </div>
      </div>
      
      <div className="mb-4 me-5">
        <textarea
          id="wd-description"
          rows={10}
          className="form-control"
        >
          The assignment is available online Submit a link to the landing page
          of
        </textarea>
      </div>

      <div className="row g-3 mb-4 me-5">
        <div className="col-md-2">
          <label htmlFor="wd-points" className="col-form-label float-right me-5">
            Points
          </label>
        </div>
        <div className="col-md-10">
          <input id="wd-points" value={100} className="form-control" />
        </div>
      </div>

      <div className="row g-3 mb-4 me-5">
        <div className="col-md-2">
          <label htmlFor="wd-group" className="col-form-label">
            Assignment Group
          </label>
        </div>
        <div className="col-md-10">
          <select id="wd-group" className="form-select">
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="LABS">Labs</option>
          </select>
        </div>
      </div>

      <div className="row g-3 mb-4 me-5">
        <div className="col-md-2">
          <label htmlFor="wd-display-grade-as" className="col-form-label">
            Display Grade as
          </label>
        </div>
        <div className="col-md-10">
          <select id="wd-display-grade-as" className="form-select">
            <option value="PERCENTAGE">PERCENTAGE</option>
            <option value="POINTS">POINTS</option>
          </select>
        </div>
      </div>

      <div className="row g-3 mb-4 me-5">
        <div className="col-md-2">
          <label htmlFor="wd-submission-type" className="col-form-label">
            Submission Type
          </label>
        </div>
        <div className="col-md-10 border p-3">
          <div className="mb-2" >
            <select id="wd-submission-type" className="form-select">
              <option value="ONLINE">ONLINE</option>
              <option value="OFFLINE">OFFLINE</option>
            </select>
          </div>
          <div>
            <label htmlFor="wd-online-entry" className="col-form-label">
              Online Entry Options
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-text-entry"
              name="wd-online-entry"
            />
            <label className="form-check-label" htmlFor="wd-text-entry">
              Text Entry
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-website-url"
              name="wd-online-entry"
            />
            <label className="form-check-label" htmlFor="wd-website-url">
              Website URL
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-media-recordings"
              name="wd-online-entry"
            />
            <label className="form-check-label" htmlFor="wd-media-recordings">
              Media Recording
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-student-annotation"
              name="wd-online-entry"
            />
            <label className="form-check-label" htmlFor="wd-student-annotation">
              Student Annotation
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-file-upload"
              name="wd-online-entry"
            />
            <label className="form-check-label" htmlFor="wd-file-upload">
              File Upload
            </label>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4 me-5">
        <div className="col-md-2">
          <label htmlFor="wd-assign-to" className="col-form-label">
            Assign
          </label>
        </div>
        <div className="col-md-10 border p-3">
          <div className="col-md-6">
            <label htmlFor="wd-assign-to" className="col-form-label">
              Assign to
            </label>
          </div>
          <div className="col-md-6">
            <input
              id="wd-assign-to"
              value="Everyone"
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="wd-due-date" className="col-form-label">
              Due
            </label>
          </div>
          <div className="col-md-6">
            <input
              type="date"
              id="wd-due-date"
              value="2024-05-13"
              className="form-control"
            />
          </div>
          <div className="d-flex col-md-6">
            <div className="me-2">
              <div>
                <label htmlFor="wd-available-from" className="col-form-label">
                  Available from
                </label>
              </div>
              <div>
                <input
                  type="date"
                  id="wd-available-from"
                  value="2024-05-06"
                  className="form-control"
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="wd-available-until" className="col-form-label">
                  Until
                </label>
              </div>
              <div>
                <input
                  type="date"
                  id="wd-available-until"
                  value="2024-05-20"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="d-flex justify-content-end mt-5 pt-3 me-5 mb-5 border-top">
          <button type="button" id="wd-buttons" className="btn btn-secondary me-2 border rounded-0">
            Cancel
          </button>
          <button type="button" id="wd-buttons" className="btn btn-danger border rounded-0">
            Save
          </button>
        </div>
    </div>
  );
}
