import Swal from "sweetalert2";

type Props = {};

function UserDropdown({}: Props) {
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
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="w-12 h-12 text-sm text-white bg-gray-800 inline-flex items-center justify-center rounded-full"
        >
          <i className="far fa-user"></i>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="font-bold hover:text-red-700" onClick={logout}>
              LOGOUT
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserDropdown;
