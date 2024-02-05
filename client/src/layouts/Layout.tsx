import { Outlet } from "react-router-dom";
import FooterAdmin from "../components/Footers/FooterAdmin";
import IndexSidebar from "../components/Sidebar/IndexSidebar";
import IndexNavber from "../components/Navbars/IndexNavber";
import IndexHeader from "../components/Headers/IndexHeader";

type Props = {};

function Layout({}: Props) {
  return (
    <>
    <IndexSidebar />
    <div className="relative md:ml-64 bg-neutral">
      <IndexNavber />
      <IndexHeader />
      <div className="px-4 md:px-10 mx-auto bg-white w-full -m-24">
        <Outlet></Outlet>
        <FooterAdmin />
      </div>
    </div>
  </>
  );
}

export default Layout;
