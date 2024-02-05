import { useState } from "react";
import Swal from "sweetalert2";

import ApiUrl from "../../../utils/ApiUrl";
import { AdminApiRouter } from "../../../utils/admins/AdminApiRoute";
import { useNavigate } from "react-router-dom";

type Props = {};

function SubjectCreate({}: Props) {
  const navigate = useNavigate();
  const [subjectData, setSubjectData] = useState({
    subject_id: "",
    subject_name: "",
  });

  const handleChange = (e: any) => {
    setSubjectData({
      ...subjectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await ApiUrl.post(AdminApiRouter.subject, subjectData);
    if(res.data.statusCode === 200){
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        text: "บันทึกข้อมูลวิชาเรียนสำเร็จ",
      }).then(() => {
        navigate("/admin/subject");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "บันทึกข้อมูลไม่สำเร็จ",
        text: "บันทึกข้อมูลวิชาเรียนไม่สำเร็จ",
      });
    }
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <form onSubmit={handleSubmit} className="p-6">
              {/* รหัสครูผู้สอน */}
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  รหัสวิชา
                </label>
                <input
                  type="text"
                  name="subject_id"
                  value={subjectData.subject_id}
                  onChange={handleChange}
                  placeholder="รหัสวิชา"
                  className="input input-bordered w-full max-w-lx"
                />
              </div>
              {/* ชื่อ */}
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ชื่อวิชา
                </label>
                <input
                  type="text"
                  name="subject_name"
                  value={subjectData.subject_name}
                  onChange={handleChange}
                  placeholder="ชื่อวิชา"
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

export default SubjectCreate;
