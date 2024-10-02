import { BsGripVertical } from 'react-icons/bs';
import { MdOutlineAssignment } from "react-icons/md";

export default function AssignmentIcon() {
    return (
        <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <MdOutlineAssignment className="me-2 fs-3 text-success" />
        </div>
    );
}