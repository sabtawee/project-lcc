import Layout from "../layouts/Layout";
import { IndexModel } from "../models/IndexModel";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

type Props = {};


function IndexRoute({}: Props) {
  // const token_student : string | null = localStorage.getItem("token_student");

  // if (token_student === null) {
  //   return <LoginPage />;
  // }
  
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
