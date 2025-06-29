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
import PrivateRoute from "./components/PrivateRoute"; 
function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/students" element={<PrivateRoute><Students /></PrivateRoute>} />
        <Route path="/register" element={<PrivateRoute><Registration /></PrivateRoute>} />
        <Route path="/payments" element={<PrivateRoute><Payments /></PrivateRoute>} />
        <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
        <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
        <Route path="/shedular" element={<PrivateRoute><Shedular /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
