import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiUrl from "../../utils/ApiUrl";
import { AdminApiRouter } from "../../utils/admins/AdminApiRoute";
import Swal from "sweetalert2";



type Props = {};

function CardtableTeacher({}: Props) {
  const [datas, setDatas] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await ApiUrl.get(AdminApiRouter.teacher);
      if (res.data.statusCode === 200) {
        setDatas(res.data.response);
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "โหลดข้อมูลไม่สำเร็จ",
        });
      }
    };
    fetchData();
    setIsSubmit(false);
  }, [isSubmit]);

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?",
      text: "คุณจะไม่สามารถเปลี่ยนแปลงข้อมูลนี้ได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ลบข้อมูล!",
      cancelButtonText: "ไม่, ยกเลิก!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await ApiUrl.delete(AdminApiRouter.teacher + '/' + id);
        if (res.data.statusCode === 200) {
          Swal.fire("ลบข้อมูลสำเร็จ", "", "success");
          setIsSubmit(true);
        } else {
          Swal.fire("เกิดข้อผิดพลาด", "ลบข้อมูลไม่สำเร็จ", "error");
        }
      }
    });
  };
  
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg ">รายชื่อครูผู้สอน</h3>
            </div>
            <button className="btn btn-primary">
              <Link to="/admin/teacher/create">เพิ่มครูผู้สอน</Link>
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  รหัสครูผู้สอน
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  ชื่อ - นามสกุล
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data: any, i : number) => (
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {data.teacher_id}
                </td>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {data.firsname} {data.lastname}
                </th>
                <td className="border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                  <button className=" btn btn-error btn-sm">
                    <i className="fas fa-trash mr-1"></i>
                    Delete
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CardtableTeacher;
