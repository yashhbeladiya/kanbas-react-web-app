import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";



export default function AssignmentControl() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
  }

  return (
    <div id="wd-search-assignment" className="d-flex align-items-center justify-content-between mb-3">
      <div className="wd-input-seach border p-2 rounded-3 d-flex align-items-center w-500">
        <CiSearch className="fs-5 me-2" />
        <input
          id="wd-search-assignment"
          placeholder="Search..."
          className="border-0"
        />
      </div>

      {currentUser?.role === "FACULTY" && (
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
          onClick={handleAddAssignment}
        >
          <GoPlus className="me-1 fs-5" />
          Assignment
        </button>
      </div>
      )}
    </div>
  );
}
