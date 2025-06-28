import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    // Fetch student count from backend
    axios.get("http://localhost:8080/api/students/count")
      .then(res => setStudentCount(res.data))
      .catch(err => console.error("Failed to fetch student count:", err));
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light px-4 py-5">
      <div className="w-100" style={{ maxWidth: "1500px" }}>
        <div className="bg-white shadow rounded-lg p-4 p-md-5">
          <h1 className="text-center text-primary mb-4">📊 Dashboard</h1>
          <p className="text-center text-muted mb-5">
            Welcome to the Tuition Management System Dashboard!
          </p>

          {/* Summary Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card text-white bg-primary h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Students</h5>
                  <p className="card-text fs-3 fw-bold">{studentCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">Fees Collected</h5>
                  <p className="card-text fs-3 fw-bold">$12,000</p> {/* You can make this dynamic too */}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-danger h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">Pending Payments</h5>
                  <p className="card-text fs-3 fw-bold">$3,000</p> {/* You can fetch from backend later */}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-grid gap-3">
            <Link to="/register" className="btn btn-primary btn-lg">
              ➕ Add New Student/Teacher
            </Link>
            <Link to="/students" className="btn btn-info btn-lg text-white">
              📋 List of Students
            </Link>
            <Link to="/payments" className="btn btn-warning btn-lg text-dark">
              💸 Pending Payments
            </Link>
            <Link to="/attendance" className="btn btn-secondary btn-lg">
              📝 Mark Attendance
            </Link>
            <Link to="/shedular" className="btn btn-success btn-lg">
              🗓️ Class Scheduler
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
