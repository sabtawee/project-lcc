import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import IMGLOGO from "../../assets/images/lcc.png";
import Swal from "sweetalert2";

type Props = {};

function IndexSidebar({}: Props) {
  const [collapseShow, setCollapseShow] = useState<string>("hidden");
  const [activeMenu, setActiveMenu] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/grade")) {
      setActiveMenu("grade");
    } else {
      setActiveMenu("");
    }
  }, [location.pathname]);

  const logout = () => {
    Swal.fire({
      icon: "question",
      title: "ออกจากระบบ?",
      text: "ต้องการออกจากระบบหรือไม่",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "ออกจากระบบสำเร็จ",
          text: "กำลังออกจากระบบ",
          confirmButtonColor: "#546e7a",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("token");
            localStorage.removeItem("token_student");
            localStorage.removeItem("token_teacher");
            localStorage.removeItem("student_id");
            localStorage.removeItem("teacher_id");
            window.location.href = "/";
          }
        });
      }
    });
  };

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-blue-600 text-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
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
            className="md:block text-left md:pb-2 text-white hover:text-gray-600  mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            <img src={IMGLOGO} alt="logo" />
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
              "md:flex md:flex-col md:items-stretch md:opacity-100 text-gray-950 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-gray-900 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    <img src={IMGLOGO} alt="logo"/>
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
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Report
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (activeMenu === ""
                      ? "text-blue-400 hover:text-blue-100"
                      : "text-blue-100 hover:text-blue-400")
                  }
                  to="/"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (activeMenu === "" ? "opacity-75" : "text-blue-100")
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
              Information
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (activeMenu === "grade"
                      ? "text-blue-300 hover:text-gray-600"
                      : "text-blue-100 hover:text-blue-400")
                  }
                  to="/grade"
                >
                  <i
                    className={
                      "fas fa-book mr-2 text-sm " +
                      (activeMenu === "grade"
                        ? "opacity-75"
                        : "text-blue-100")
                    }
                  ></i>{" "}
                  ผลการเรียน
                </Link>
              </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Settings
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <a
                  className={
                    "text-xs uppercase py-3 font-bold block cursor-pointer " +
                    (activeMenu === "logout"
                      ? "text-blue-300 hover:text-gray-600"
                      : "text-blue-100 hover:text-blue-400")
                  }
                  onClick={logout}
                >
                  <i
                    className={
                      "fas fa-book mr-2 text-sm " +
                      (activeMenu === "logout"
                        ? "opacity-75"
                        : "text-blue-100")
                    }
                  ></i>{" "}
                  ออกจากระบบ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default IndexSidebar;
