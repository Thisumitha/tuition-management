import { useState } from "react";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    subject: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("🎉 Student Registered Successfully!");
    // Optional: send to backend
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="card-title text-center text-primary mb-4">
            Student Registration
          </h2>
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter full name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter email address"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter phone number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter subject name"
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
              >
                ✅ Register Student
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
