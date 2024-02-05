import { useState } from "react";
import ApiUrl from "../../../utils/ApiUrl";
import { AdminApiRouter } from "../../../utils/admins/AdminApiRoute";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type Props = {};
function StudentCreate({}: Props) {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    student_id: "",
    firstname: "",
    lastname: "",
    password: "",
    branch: "",
  });

  const handleChange = (e: any) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ที่จะบันทึกข้อมูลนี้?",
      text: "คุณจะไม่สามารถเปลี่ยนแปลงข้อมูลนี้ได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, บันทึกข้อมูล!",
      cancelButtonText: "ไม่, ยกเลิก!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await ApiUrl.post(AdminApiRouter.student, studentData);
        if (res.data.statusCode === 200) {
          Swal.fire("บันทึกข้อมูลสำเร็จ", "", "success").then(() => {
            setStudentData({
              student_id: "",
              firstname: "",
              lastname: "",
              password: "",
              branch: "",
            });
            navigate("/admin/student");
          });

        } else {
          Swal.fire("เกิดข้อผิดพลาด", "บันทึกข้อมูลไม่สำเร็จ", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
            <form onSubmit={handleSubmit} className="p-6">
              {/* ชื่อ */}
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  รหัสนักศึกษา
                </label>
                <input
                  type="text"
                  name="student_id"
                  value={studentData.student_id}
                  onChange={handleChange}
                  placeholder="รหัสนักศึกษา"
                  className="input input-bordered w-full max-w-lx"
                />
              </div>

              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ชื่อ
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={studentData.firstname}
                  onChange={handleChange}
                  placeholder="ชื่อ"
                  className="input input-bordered w-full max-w-lx"
                />
              </div>

              {/* นามสกุล */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  นามสกุล
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={studentData.lastname}
                  onChange={handleChange}
                  placeholder="นามสกุล"
                  className="input input-bordered w-full max-w-lx"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  สาขาวิชา
                </label>
                <input
                  type="text"
                  name="branch"
                  value={studentData.branch}
                  onChange={handleChange}
                  placeholder="นามสกุล"
                  className="input input-bordered w-full max-w-lx"
                />
              </div>

              {/* รหัสผ่าน */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  name="password"
                  value={studentData.password}
                  onChange={handleChange}
                  placeholder="รหัสผ่าน"
                  className="input input-bordered w-full max-w-lx"
                />
              </div>
              {/* เพิ่ม properties ของฟอร์มตามต้องการ */}
              {/* ปุ่ม Submit */}
              <div className="mb-4">
                <button className="btn btn-primary">บันทึกข้อมูล</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentCreate;
