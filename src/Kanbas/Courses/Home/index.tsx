import Modules from "../Modules/index";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-grow-1 ms-md-5 ms-lg-0">
        <Modules />
      </div>
    
      <div className="ms-auto me-4">
        <CourseStatus />
      </div>
      
    </div>
  );
}
