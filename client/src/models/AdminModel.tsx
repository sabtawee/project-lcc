import AdminHome from "../pages/admin/AdminHome";
import StudentCreate from "../pages/admin/students/StudentCreate";
import StudentIndex from "../pages/admin/students/StudentIndex";
import SubjectCreate from "../pages/admin/subjects/SubjectCreate";
import SubjectIndex from "../pages/admin/subjects/SubjectIndex";
import TeacherCreate from "../pages/admin/teachers/TeacherCreate";
import TeacherIndex from "../pages/admin/teachers/TeacherIndex";

export const AdminModel = [
    {
        id: 1,
        routerName: 'AdminHome',
        routerPath: '/',
        routerComponent: <AdminHome />
    },
    {
        id: 2,
        routerName: 'TeacherHome',
        routerPath: '/teacher',
        routerComponent: <TeacherIndex />
    },
    {
        id: 3,
        routerName: 'StudentHome',
        routerPath: '/student',
        routerComponent: <StudentIndex />
    },
    {
        id: 4,
        routerName: 'SubjectHome',
        routerPath: '/subject',
        routerComponent: <SubjectIndex />
    },
    {
        id: 5,
        routerName: 'TeacherCreate',
        routerPath: '/teacher/create',
        routerComponent: <TeacherCreate />
    },
    {
        id: 6,
        routerName: 'TeacherCreate',
        routerPath: '/student/create',
        routerComponent: <StudentCreate />
    },
    {
        id: 7,
        routerName: 'TeacherCreate',
        routerPath: '/subject/create',
        routerComponent: <SubjectCreate />
    }

]