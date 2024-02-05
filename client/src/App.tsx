import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AdminIndex from "./pages/admin/AdminIndex";
import IndexPage from "./pages/IndexPage";
import TeacherIndex from "./pages/teachers/TeacherIndex";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Default Layout */}
        <Route path="/*" element={<IndexPage />} />

        {/* Admin Layout */}
        <Route path="/admin/*" element={<AdminIndex />} />

        {/* Teacher Layout */}
        <Route path="/teacher/*" element={<TeacherIndex />} />
      </Routes>
    </Suspense>
  );
}

export default App;
