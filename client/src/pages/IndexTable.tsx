import CardTable from "../components/Cards/CardTable";
import { useState, useEffect } from "react";
import ApiUrl from "../utils/ApiUrl";
import { UserApiRouter } from "../utils/user/UserApiRoute";

type Props = {};

function IndexTable({}: Props) {
  const student_id = localStorage.getItem("student_id");
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const getGrade = async () => {
      const res = await ApiUrl.get(UserApiRouter.getGrade + student_id);
      setGrades(res.data.response);
    };
    getGrade();
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          {grades.map((grade: any, i: number) => (
            <CardTable grades={grade.block_detail} block_ids={grade.block_id} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default IndexTable;
