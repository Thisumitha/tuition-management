import { useState } from "react";
import axios from "axios";


// Reuse the student and teacher form code
const StudentForm = ({ onBack }) => {
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

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:8080/api/students", formData);
    console.log("Student Registered:", res.data);
    alert("🎉 Student Registered Successfully!");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      subject: ""
    });
  } catch (err) {
    console.error("Registration Failed:", err);
    alert("❌ Student registration failed!");
  }
};


  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="text-center text-primary mb-4">Student Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input name="fullName" className="form-control" required value={formData.fullName} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" type="email" className="form-control" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input name="phone" className="form-control" required value={formData.phone} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input name="dob" type="date" className="form-control" required value={formData.dob} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select name="gender" className="form-select" required value={formData.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label">Subject</label>
              <input name="subject" className="form-control" required value={formData.subject} onChange={handleChange} />
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="submit">✅ Register Student</button>
              <button className="btn btn-outline-secondary" type="button" onClick={onBack}>⬅️ Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const TeacherForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:8080/api/teachers", formData);
    console.log("Teacher Registered:", res.data);
    alert("🎉 Teacher Registered Successfully!");
    setFormData({
      name: "",
      subject: "",
      email: "",
      phone: ""
    });
  } catch (err) {
    console.error("Registration Failed:", err);
    alert("❌ Teacher registration failed!");
  }
};


  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="text-center text-success mb-4">Teacher Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input name="name" className="form-control" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input name="subject" className="form-control" required value={formData.subject} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" type="email" className="form-control" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="form-label">Phone</label>
              <input name="phone" className="form-control" required value={formData.phone} onChange={handleChange} />
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-success" type="submit">✅ Register Teacher</button>
              <button className="btn btn-outline-secondary" type="button" onClick={onBack}>⬅️ Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Registration = () => {
  const [formType, setFormType] = useState(null);

  return (
    <div className="container py-5 text-center">
      {!formType && (
        <>
          <h2 className="mb-4">Select Registration Type</h2>
          <div className="d-flex justify-content-center gap-4">
            <button className="btn btn-primary btn-lg" onClick={() => setFormType("student")}>
              🧑‍🎓 Register Student
            </button>
            <button className="btn btn-success btn-lg" onClick={() => setFormType("teacher")}>
              👨‍🏫 Register Teacher
            </button>
          </div>
        </>
      )}

      {formType === "student" && <StudentForm onBack={() => setFormType(null)} />}
      {formType === "teacher" && <TeacherForm onBack={() => setFormType(null)} />}
    </div>
  );
};

export default Registration;
