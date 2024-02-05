import { Outlet } from "react-router-dom";

type Props = {};

function TeacherLayout({}: Props) {
  return (
    <>
      <p>Teacher Header</p>
      <Outlet></Outlet>
      <p>Teacher Footer</p>
    </>
  );
}

export default TeacherLayout;
