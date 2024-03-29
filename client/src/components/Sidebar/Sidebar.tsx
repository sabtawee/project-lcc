import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
type Props = {};

function Sidebar({}: Props) {
  const [collapseShow, setCollapseShow] = useState<string>("hidden");
  const [activeMenu, setActiveMenu] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    // เมื่อ path ปัจจุบันเปลี่ยน
    // ให้ตรวจสอบ path และกำหนด activeMenu ตามเงื่อนไข
    if (location.pathname.startsWith("/admin/teacher")) {
      setActiveMenu("teacher");
    } else if (location.pathname.startsWith("/admin/student")) {
      setActiveMenu("student");
    } else if (location.pathname.startsWith("/admin/subject")) {
      setActiveMenu("subject");
    }  else if (location.pathname.startsWith("/admin/setclass")) {
      setActiveMenu("setclass");
    } else {
      setActiveMenu("");
    }
  }, [location.pathname]);

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blue-600 hover:text-red-600  mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/admin"
          >
            LCC Control (ADMIN)
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">{/* <UserDropdown /> */}</li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    ADMIN
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Report
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (activeMenu === ""
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-700 hover:text-blue-400")
                  }
                  to="/admin"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (activeMenu === "" ? "opacity-75" : "text-gray-600")
                    }
                  ></i>
                  Dashboard
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Management
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (activeMenu === "teacher"
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-700 hover:text-blue-400")
                  }
                  to="/admin/teacher"
                >
                  <i
                    className={
                      "fas fa-book mr-2 text-sm " +
                      (activeMenu === "teacher"
                        ? "opacity-75"
                        : "text-gray-600")
                    }
                  ></i>{" "}
                  ครูผู้สอน
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (activeMenu === "student"
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-700 hover:text-blue-400")
                  }
                  to="/admin/student"
                >
                  <i
                    className={
                      "fas fa-user-graduate mr-2 text-sm " +
                      (activeMenu === "student"
                        ? "opacity-75"
                        : "text-gray-600")
                    }
                  ></i>{" "}
                  นักศึกษา
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (activeMenu === "subject"
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-700 hover:text-blue-400")
                  }
                  to="/admin/subject"
                >
                  <i
                    className={
                      "fas fa-clipboard-list mr-2 text-sm " +
                      (activeMenu === "subject"
                        ? "opacity-75"
                        : "text-gray-600")
                    }
                  ></i>{" "}
                  วิชาเรียน
                </Link>
              </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              จัดการเรียน
            </h6>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (activeMenu === "setclass"
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-700 hover:text-blue-400")
                  }
                  to="/admin/setclass"
                >
                  <i
                    className={
                      "fas fa-book mr-2 text-sm " +
                      (activeMenu === "setclass"
                        ? "opacity-75"
                        : "text-gray-600")
                    }
                  ></i>{" "}
                  จัดตารางเรียน
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
