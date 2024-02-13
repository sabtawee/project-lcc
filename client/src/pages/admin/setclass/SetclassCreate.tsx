import { useState, useEffect } from "react";
import ApiUrl from "../../../utils/ApiUrl";
import { AdminApiRouter } from "../../../utils/admins/AdminApiRoute";
import Swal from "sweetalert2";

type Props = {};

function SetclassCreate({}: Props) {
  const [branch, setBranch] = useState([]);
  const [modelId, setModelId] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [setclass, setSetclass] = useState({
    block_id: "",
    subject_id: "",
    teacher_id: "",
    model_id: "",
    branch: "",
  });
  const fetchSubjects = async () => {
    const res = await ApiUrl.get(AdminApiRouter.subject);
    setSubjects(res.data.response);
  };
  const fetchTeachers = async () => {
    const res = await ApiUrl.get(AdminApiRouter.teacher);
    setTeachers(res.data.response);
  };
  const fetchStudents = async () => {
    const res = await ApiUrl.get(AdminApiRouter.student);
    let data = res.data.response;
    // remove duplicate model_id
    let unique = data.filter(
      (item: any, index: any, self: any) =>
        index === self.findIndex((t: any) => t.model_id === item.model_id)
    );
    setModelId(unique);
    // remove duplicate branch and set to state one key
    let uniqueBranch = data.filter(
      (item: any, index: any, self: any) =>
        index === self.findIndex((t: any) => t.branch === item.branch)
    );
    setBranch(uniqueBranch);
  };
  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
    fetchStudents();
  }, []);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSetclass({ ...setclass, [name]: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // check if all fields are filled
    if (
      setclass.block_id === "" ||
      setclass.subject_id === "" ||
      setclass.teacher_id === "" ||
      setclass.model_id === "" ||
      setclass.branch === ""
    ) {
      Swal.fire("กรุณากรอกข้อมูลให้ครบ", "", "warning");
      return;
    }
    // post data to server
    const postData = async () => {
      const res = await ApiUrl.post(AdminApiRouter.setclass, setclass);
      if (res.data.statusCode === 201) {
        Swal.fire("บันทึกข้อมูลสำเร็จ", "", "success");
        setSetclass({
          block_id: "",
          subject_id: "",
          teacher_id: "",
          model_id: "",
          branch: "",
        });
        setTimeout(() => {
          window.location.href = "/admin/setclass";
        }, 1000);
      } else {
        Swal.fire("เกิดข้อผิดพลาด", "บันทึกข้อมูลไม่สำเร็จ", "error");
      }
    };
    postData();
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  บล็อกเรียน
                </label>
                <select
                  name="block_id"
                  value={setclass.block_id}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-lx"
                >
                  <option value="">เลือกบล็อกเรียน</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  วิชา
                </label>
                <select
                  name="subject_id"
                  value={setclass.subject_id}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-lx"
                >
                  <option value="">เลือกวิชา</option>
                  {subjects.map((item: any, i: number) => (
                    <option key={i} value={item.subject_id}>
                      {item.subject_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  อาจารย์
                </label>
                <select
                  name="teacher_id"
                  value={setclass.teacher_id}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-lx"
                >
                  <option value="">เลือกอาจารย์</option>
                  {teachers.map((item: any, i: number) => (
                    <option key={i} value={item.teacher_id}>
                      {item.firstname} {item.lastname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  รุ่น
                </label>
                <select
                  name="model_id"
                  value={setclass.model_id}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-lx"
                >
                  <option value="">เลือกรุ่น</option>
                  {modelId.map((item: any, i: number) => (
                    <option key={i} value={item.model_id}>
                      {item.model_id}
                    </option>
                  ))}
                </select>
              </div>

              {/* เลือกสาขา */}
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  สาขา
                </label>
                <select
                  name="branch"
                  value={setclass.branch}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-lx"
                >
                  <option value="">เลือกสาขา</option>
                  {branch.map((item: any, i: number) => (
                    <option key={i} value={item.branch}>
                      {item.branch}
                    </option>
                  ))}
                </select>
              </div>

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

export default SetclassCreate;
