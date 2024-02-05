import { Routes, Route } from "react-router-dom";
import { AdminModel } from "../models/AdminModel";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
type Props = {};

function AdminRoute({}: Props) {
  // const token : string | null  = localStorage.getItem("token");

  // if (!token) {
  //   return <AdminLogin />;
  // }

  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          {AdminModel.length > 0 ? (
            <>
              {AdminModel.map((item, i) => (
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
}

export default AdminRoute;
