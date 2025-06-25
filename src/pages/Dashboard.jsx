import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light px-4 py-8">
      <div className="max-w-5xl w-full bg-white shadow rounded-lg p-6">
        <h1 className="text-center text-3xl font-bold text-primary mb-4">Dashboard</h1>
        <p className="text-center text-muted mb-6">
          Welcome to the Tuition Management System Dashboard!
        </p>

        {/* Summary Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card text-white bg-primary h-100 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">Total Students</h5>
                <p className="card-text fs-3 fw-bold">150</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success h-100 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">Fees Collected</h5>
                <p className="card-text fs-3 fw-bold">$12,000</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-danger h-100 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">Pending Payments</h5>
                <p className="card-text fs-3 fw-bold">$3,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-grid gap-3">
          <Link to="/studentreg" className="btn btn-primary btn-lg">
            ➕ Add New Student
          </Link>
          <Link to="/students" className="btn btn-info btn-lg text-white">
            📋 List of Students
          </Link>
          <Link to="/payments" className="btn btn-warning btn-lg text-dark">
            💸 Pending Payments
          </Link>
          <Link to="/attendance" className="btn btn-secondary btn-lg">
            📊 Mark Attendance
          </Link>
           <Link to="/shedular" className="btn btn-success btn-lg">
            🗓️ Class Scheduler
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
