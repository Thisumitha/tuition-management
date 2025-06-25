import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Payments from "./pages/Payments";
import Attendance from "./pages/Attendance";
import Report from "./pages/Report";
import Registration from "./pages/Registration";
import Shedular from "./pages/Shedular";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
function App() {
  return (
    <BrowserRouter>
    <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/report" element={<Report />} />
        <Route path="/shedular" element={<Shedular />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
