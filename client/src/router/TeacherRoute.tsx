import { Routes, Route } from "react-router-dom";
import { TeacherModel } from "../models/TeacherModel";
import TeacherLayout from "../layouts/TeacherLayout";
type Props = {};

const TeacherRoute = ({}: Props) => {
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
