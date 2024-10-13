import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";

export default function KanbasNavigation() {
  const { pathname } = useLocation();

  const links = [
    { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard},
    { label: "Courses", path: "/Kanbas/Courses", icon: LiaBookSolid},
    { label: "Calendar", path: "/Kanbas/Calendar", icon: FaRegCalendarAlt},
    { label: "Inbox", path: "/Kanbas/Inbox", icon: HiOutlineInboxArrowDown},
    { label: "Labs", path: "/Labs", icon: LiaCogSolid},
  ]

  return (
    <div
      id="wd-kanbas-navigation"
      style={{ width: 110 }}
      className="list-group rounded-0 position-fixed 
      bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
        className="list-group-item bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" />
      </a>

      <Link
        to="/Kanbas/Account"
        id="wd-account-link"
        className={`list-group-item text-center border-0 
        ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}
      >
        <FaRegCircleUser className={`fs-1 
        ${pathname.includes("Account") ? "text-danger" : "text-white"}`}/> <br />
        Account
      </Link>

      {links.map((link) => (
        <Link key={link.path} to={link.path}
        className={`list-group-item text-center border-0
        ${pathname.includes(link.label) ? "bg-white text-danger" : "bg-black text-white"}`}>
          <link.icon className="fs-1 text-danger" /> <br />
          {link.label}
        </Link>
      ))}
    </div>
  );
}
