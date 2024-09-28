import Modules from "../Modules/index";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill me-5">
        <Modules />
      </div>
      <div className="d-none d-md-block me-4">
        <CourseStatus />
      </div>
    </div>
  );
}
