import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { TeacherModel } from "../models/TeacherModel";
import TeacherLayout from "../layouts/TeacherLayout";
import TeacherLogin from "../pages/teachers/TeacherLogin";

import ApiUrl from "../utils/ApiUrl";
import { TeacherApiRouter } from "../utils/teachers/TeacherApiRoute";

type Props = {};

const TeacherRoute = ({}: Props) => {
  const token_teacher = localStorage.getItem("token_teacher");

  if (!token_teacher) {
    return <TeacherLogin />;
  }

  useEffect(() => {
    const fetchTeacher = async () => {
      const res = await ApiUrl.get(TeacherApiRouter.auth, {
        headers: {
          Authorization: `Bearer ${token_teacher}`,
        },
      });
      if (res.data.statusCode === 200) {
        localStorage.setItem("teacher_id", res.data.response.teacher_id);
      } else {
        localStorage.removeItem("token_teacher");
        window.location.href = "/teacher";
      }
    };
    fetchTeacher();
  }, []);

  return (
    <>
      <Routes>
        <Route element={<TeacherLayout />}>
          {TeacherModel.length > 0 ? (
            <>
              {TeacherModel.map((item, i) => (
                <Route
                  key={i}
                  path={item.routerPath}
                  element={item.routerComponent}
                />
              ))}
            </>
          ) : (
            <></>
          )}
        </Route>
      </Routes>
    </>
  );
};

export default TeacherRoute;
