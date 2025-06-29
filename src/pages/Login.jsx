import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/admins/login", formData);
      const admin = res.data;

      // ✅ Save login info
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("adminName", admin.username);
      localStorage.setItem("adminEmail", admin.email);

      window.dispatchEvent(new Event("storage"));
      alert("✅ Login success!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center text-primary mb-4">👨‍🎓 Tuition System Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary btn-lg">
              🔐 Login
            </button>
          </div>

          <p className="text-center text-muted small">
            Don't have an account? <a href="#">Contact admin</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
