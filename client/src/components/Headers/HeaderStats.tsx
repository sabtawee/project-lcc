import { useEffect, useState } from "react";
import CardStats from "../Cards/CardStats";
import ApiUrl from "../../utils/ApiUrl";
import { AdminApiRouter } from "../../utils/admins/AdminApiRoute";
import { useLocation } from "react-router-dom";

type Props = {};

function HeaderStats({}: Props) {
  const location = useLocation();
  const [teacher, setTeacher] = useState(0);
  const [student, setStudent] = useState(0);
  const [course, setCourse] = useState(0);
  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await ApiUrl.get(AdminApiRouter.teacher);
      setTeacher(res.data.response.length);
      const res2 = await ApiUrl.get(AdminApiRouter.student);
      setStudent(res2.data.response.length);
      const res4 = await ApiUrl.get(AdminApiRouter.subject);
      setCourse(res4.data.response.length);
      const res3 = await ApiUrl.get(AdminApiRouter.users);
      setAdmin(res3.data.response.length);
    };
    fetchData();
  }, [location.pathname]);

  return (
    <>
      {/* Header */}
      <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ครูผู้สอน"
                  statTitle={teacher.toString()}
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="นักศึกษา"
                  statTitle={student.toString()}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="วิชา"
                  statTitle={course.toString()}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ผู้ดูแลระบบ"
                  statTitle={admin.toString()}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor=" bg-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderStats;
