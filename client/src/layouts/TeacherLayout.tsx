import { Outlet } from "react-router-dom";
import HeaderStats from "../components/Headers/HeaderStats";
import FooterAdmin from "../components/Footers/FooterAdmin";
import TeacherNavbar from "../components/Navbars/TeacherNavbar";
import TeacherSidebar from "../components/Sidebar/TeacherSidebar";

type Props = {};

function TeacherLayout({}: Props) {
  return (
    <>
      <TeacherSidebar />
      <div className="relative md:ml-64 bg-neutral">
        <TeacherNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto bg-white w-full -m-24">
          <Outlet></Outlet>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

export default TeacherLayout;
