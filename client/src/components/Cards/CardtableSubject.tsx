import { Link } from "react-router-dom";

import ApiUrl from "../../utils/ApiUrl";
import { AdminApiRouter } from "../../utils/admins/AdminApiRoute";
import Swal from "sweetalert2";

type Props = {
  data: any;
};

function CardtableSubject({ data }: Props) {
  const handleDelete = (id: number) => {
    try {
      Swal.fire({
        title: "คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?",
        text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่, ลบข้อมูล!",
        cancelButtonText: "ไม่, ยกเลิก!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await ApiUrl.delete(AdminApiRouter.subject + "/" + id);
          if (res.data.statusCode === 200) {
            Swal.fire(
              "ลบข้อมูลเรียบร้อย!",
              "ข้อมูลของคุณได้ถูกลบเรียบร้อย",
              "success"
            ).then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire("เกิดข้อผิดพลาด!", "ข้อมูลของคุณไม่ได้ถูกลบ", "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("ยกเลิก", "ข้อมูลของคุณปลอดภัย :)", "error");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg ">รายชื่อวิชา</h3>
            </div>
            <button className="btn btn-primary">
              <Link to="/admin/subject/create">เพิ่มวิชา</Link>
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse table">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  รหัสวิชา
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  ชื่อวิชา
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, i: number) => (
                <tr key={i} className="hover">
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.subject_id}
                  </td>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {item.subject_name}
                  </th>

                  <td className="border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                    <button className=" btn btn-primary btn-sm mr-3">
                      <i className="fas fa-link mr-1"></i> Edit
                    </button>
                    <button className=" btn btn-error btn-sm" onClick={()=>handleDelete(item.id)}>
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

export default CardtableSubject;
