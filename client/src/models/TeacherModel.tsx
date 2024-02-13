import TeacherGrade from "../pages/teachers/TeacherGrade";
import TeacherHome from "../pages/teachers/TeacherHome";

export const TeacherModel = [
  {
    id: 1,
    routerName: "TeacherHome",
    routerPath: "/",
    routerComponent: <TeacherHome />,
  },
  {
    id: 2,
    routerName: "TeacherGrade",
    routerPath: "/grade",
    routerComponent: <TeacherGrade />,
  },
  {
    id: 3,
    routerName: "TeacherUpdate",
    routerPath: "/create/grade/:modelId/:brand",
    routerComponent: <TeacherGrade />,
  }
];
