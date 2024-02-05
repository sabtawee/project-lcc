import { Routes, Route } from "react-router-dom";
import { TeacherModel } from "../models/TeacherModel";
type Props = {};

const TeacherRoute = ({}: Props) => {
  return (
    <>
      <Routes>
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
      </Routes>
    </>
  );
};

export default TeacherRoute;
