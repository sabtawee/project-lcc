import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiUrl from "../../../utils/ApiUrl";
import { AdminApiRouter } from "../../../utils/admins/AdminApiRoute";
import Swal from "sweetalert2";


type Props = {};

function TeacherCreate({}: Props) {
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState({
    teacher_id: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setTeacherData({
      ...teacherData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(teacherData);
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ที่จะเพิ่มข้อมูลนี้?",
      text: "คุณจะไม่สามารถเปลี่ยนแปลงข้อมูลนี้ได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, เพิ่มข้อมูล!",
      cancelButtonText: "ไม่, ยกเลิก!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await ApiUrl.post(AdminApiRouter.teacher, teacherData);
        if (res.data.statusCode === 200) {
          Swal.fire("เพิ่มข้อมูลสำเร็จ", "", "success").then(() => {
            setTeacherData({
              teacher_id: "",
              firstname: "",
              lastname: "",
              password: "",
            });
            navigate("/admin/teacher");
          });
        } else {
          Swal.fire("เกิดข้อผิดพลาด", "เพิ่มข้อมูลไม่สำเร็จ", "error");
        }
      }
    });
    
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded mt-10">
            <form onSubmit={handleSubmit} className="p-6">
              {/* รหัสครูผู้สอน */}
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  รหัสครูผู้สอน
                </label>
                <input
                  type="text"
                  name="teacher_id"
                  value={teacherData.teacher_id}
                  onChange={handleChange}
                  placeholder="รหัสครูผู้สอน"
                  className="input input-bordered w-full max-w-lx"
                />
              </div>
              {/* ชื่อ */}
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ชื่อ
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={teacherData.firstname}
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
                  value={teacherData.lastname}
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
                  value={teacherData.password}
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

export default TeacherCreate;
