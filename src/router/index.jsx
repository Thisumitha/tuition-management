import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Students from "../pages/Students";
import Payments from "../pages/Payments";
import Attendance from "../pages/Attendance";
import StudentRegistration from "../pages/StudentRegistration.jsx";
import Shedular from "../pages/Shedular.jsx"; // Assuming Shedular is a page component
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/studentreg" element={<StudentRegistration />} />
        <Route path="/shedular" element={<Shedular />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
