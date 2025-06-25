import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Students from "./pages/Students";
import Payments from "./pages/Payments";
import Attendance from "./pages/Attendance";
import Report from "./pages/Report";
import StudentRegistration from "./pages/StudentRegistration";
import Shedular from "./pages/Shedular";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/studentreg" element={<StudentRegistration />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/report" element={<Report />} />
        <Route path="/shedular" element={<Shedular />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
