import CardTeacherTable from "../../components/Cards/CardTeacherTable";
import { useState, useEffect } from "react";

import ApiUrl from "../../utils/ApiUrl";
import { TeacherApiRouter } from "../../utils/teachers/TeacherApiRoute";

type Props = {};

function TeacherTable({}: Props) {
  const teacher_id = localStorage.getItem("teacher_id");
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const getTeacher = async () => {
      const res = await ApiUrl.post(TeacherApiRouter.getinsertgrade, {
        teacher_id: teacher_id,
      });
      setGrades(res.data.response);
      console.log(res.data.response);
    };
    getTeacher();
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          {grades.map((grade: any, i: number) => (
            <CardTeacherTable title={grade.block_id} detail={grade.block_detail} key={i}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default TeacherTable;
