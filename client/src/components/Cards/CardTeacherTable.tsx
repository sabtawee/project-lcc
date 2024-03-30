import { useState } from "react";
import ApiUrl from "../../utils/ApiUrl";
import { TeacherApiRouter } from "../../utils/teachers/TeacherApiRoute";
import Swal from "sweetalert2";

type Props = {
  title: string;
  detail: any;
};

function CardTeacherTable({ title, detail }: Props) {
  const [idStudent, setIdStudent] = useState<number>(0);
  const [score, setScore] = useState(0);

  

  const handleOpenModal = (id: number) => {
    setIdStudent(id);
    const my_modal_3 = document.getElementById("my_modal_3");
    my_modal_3?.setAttribute("open", "true");
  };

  const handleCloseModal = () => {
    setScore(0);
    setIdStudent(0);
    const my_modal_3 = document.getElementById("my_modal_3");
    my_modal_3?.removeAttribute("open");
  }

  const handleChange = (e: any) => {
    setScore(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const body = {
      id: idStudent,
      score: score,
    };
    const res = await ApiUrl.post(TeacherApiRouter.updategrade, body);
    if (res.data.statusCode === 200) {
      Swal.fire({
        icon: "success",
        title: "ลงคะแนนสำเร็จ",
        text: "คะแนนของนักศึกษาถูกบันทึกแล้ว",
      }).then(() => {
        const my_modal_3 = document.getElementById("my_modal_3");
        my_modal_3?.removeAttribute("open");
        setScore(0);
        window.location.reload();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "ลงคะแนนไม่สำเร็จ",
        text: "กรุณาลองใหม่อีกครั้ง",
      }).then(() => {
        const my_modal_3 = document.getElementById("my_modal_3");
        my_modal_3?.removeAttribute("open");
        setScore(0);
      });
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg ">
                รายชื่อวิชาที่สอนและนักศึกษา block {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  รหัสวิชา
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  วิชา
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  รหัสนักศึกษา
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  นักศึกษา ชื่อ-นามสกุล
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  สาขา
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  ชั้นปี
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  เกรด
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  ลงคะแนน
                </th>
              </tr>
            </thead>
            <tbody>
              {detail.map((grade: any, i: number) => (
                <tr key={i}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {grade.subject_id}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {grade.subject_name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {grade.student_id}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {grade.student_name + " " + grade.student_lastname}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {grade.student_branch}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {grade.student_model}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {grade.grade}
                  </td>
                  {/* button ลงคะแนน */}
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => handleOpenModal(grade.id)}
                    >
                      ลงคะแนน
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal}>
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">ลงคะแนน</h3>
          <form className="mt-5" onSubmit={handleSubmit}>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 mb-4"
              placeholder="คะแนน"
              name="score"
              value={score}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ยืนยัน
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default CardTeacherTable;
