import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderStats from "../components/Headers/HeaderStats";
import FooterAdmin from "../components/Footers/FooterAdmin";

type Props = {};

function AdminLayout({}: Props) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-neutral">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto bg-white w-full -m-24">
          <Outlet></Outlet>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
