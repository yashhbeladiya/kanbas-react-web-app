import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";

export default function AssignmentControl() {
  return (
    <div id="wd-search-assignment" className="d-flex align-items-center justify-content-between mb-3">
      <div className="wd-input-seach form-control d-flex align-items-center">
        <CiSearch className="fs-5 me-2" />
        <input
          id="wd-search-assignment"
          placeholder="Search..."
          className="border-0 flex-grow-1"
        />
      </div>
      <div className="d-flex float-right me-3">
        <button
          id="wd-add-assignment-group"
          className="btn btn-outline-secondary mx-2 d-flex align-items-center"
        >
          <GoPlus className="me-1 fs-5" />
          Group
        </button>
        <button
          id="wd-add-assignment"
          className="btn btn-danger d-flex align-items-center"
        >
          <GoPlus className="me-1 fs-5" />
          Assignment
        </button>
      </div>
    </div>
  );
}
