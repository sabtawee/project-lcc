import Layout from "../layouts/Layout";
import { IndexModel } from "../models/IndexModel";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

import { useEffect } from "react";
import ApiUrl from "../utils/ApiUrl";
import { UserApiRouter } from "../utils/user/UserApiRoute";

type Props = {};


function IndexRoute({}: Props) {
  const token_student : string | null = localStorage.getItem("token_student");

  if (token_student === null) {
    return <LoginPage />;
  }

  useEffect(() => {
    const verifyToken = async () => {
      const res = await ApiUrl.get(UserApiRouter.auth, {
        headers: {
          Authorization: `Bearer ${token_student}`,
        },
      });
      if (res.data.statusCode === 200) {
        localStorage.setItem("student_id", res.data.response.student_id);
      } else {
        localStorage.removeItem("token_student");
        window.location.href = "/login";
      }
    }
    verifyToken();
  }, []);
  
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {IndexModel.length > 0 ? (
            <>
              {IndexModel.map((item, i) => (
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

export default IndexRoute;
