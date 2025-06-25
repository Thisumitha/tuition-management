import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
    };

    // ✅ Listen to login/logout changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    window.dispatchEvent(new Event("storage")); // 🔄 notify state change
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Tuition System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/students">Students</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/studentreg">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/attendance">Attendance</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/payments">Payments</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
                    🔓 Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-light ms-3" to="/login">
                  🔐 Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
