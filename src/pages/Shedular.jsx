import { useEffect, useState } from "react";
import axios from "axios";

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const defaultTimeSlots = [
  '08:00–09:00',
  '09:00–10:00',
  '10:00–11:00',
  '11:00–12:00',
  '13:00–14:00',
  '14:00–15:00',
  '15:00–16:00'
];

const Scheduler = () => {
  const [classes, setClasses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [form, setForm] = useState({
    className: '',
    teacher: '',
    students: [],
    day: '',
    timeSlot: '',
    classFee: '',
    hallFeePercentage: '',
  });

  const api = "http://localhost:8080/api/halls";

  useEffect(() => {
    fetchClasses();
    fetchStudents();
    fetchTeachers();
  }, []);

  useEffect(() => {
    const lower = searchQuery.toLowerCase();
    const selectedIds = new Set(form.students);
    const results = allStudents.filter(s =>
      !selectedIds.has(String(s.id)) &&
      (s.fullName?.toLowerCase().includes(lower) || s.id.toString().includes(lower))
    );
    setFilteredStudents(results);
  }, [searchQuery, allStudents, form.students]);

  const fetchClasses = () => {
    axios.get(api)
      .then(res => setClasses(res.data))
      .catch(err => console.error("Class load error:", err));
  };

  const fetchStudents = () => {
    axios.get("http://localhost:8080/api/students")
      .then(res => setAllStudents(res.data))
      .catch(err => console.error("Student load error:", err));
  };

  const fetchTeachers = () => {
    axios.get("http://localhost:8080/api/teachers")
      .then(res => setTeachers(res.data))
      .catch(err => console.error("Teacher load error:", err));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddStudent = (id) => {
    setForm(prev => ({
      ...prev,
      students: [...prev.students, String(id)]
    }));
    setSearchQuery('');
  };

  const handleRemoveStudent = (id) => {
    setForm(prev => ({
      ...prev,
      students: prev.students.filter(sid => sid !== String(id))
    }));
  };

  const handleAddClass = () => {
    const { className, teacher, students, day, timeSlot, classFee, hallFeePercentage } = form;

    if (!className || !teacher || !day || !timeSlot || students.length === 0 || !classFee || !hallFeePercentage) {
      alert('❗ Please fill all fields.');
      return;
    }

    const newClass = {
      className,
      teacherId: Number(teacher),
      studentIds: students.map(Number),
      day,
      timeSlot,
      classFee: parseFloat(classFee),
      hallFeePercentage: parseFloat(hallFeePercentage)
    };

    const isSlotTaken = classes.some(c => c.day === day && c.timeSlot === timeSlot);
    if (isSlotTaken) {
      alert("⚠️ Slot already taken.");
      return;
    }

    axios.post(api, newClass)
      .then(() => {
        alert("✅ Class added");
        fetchClasses();
        setForm({
          className: '',
          teacher: '',
          students: [],
          day: '',
          timeSlot: '',
          classFee: '',
          hallFeePercentage: ''
        });
      })
      .catch(err => {
        console.error("Class save error:", err);
        alert("❌ Failed to add class.");
      });
  };

  const handleDeleteClass = (id) => {
    if (!window.confirm("Delete this class?")) return;
    axios.delete(`${api}/${id}`)
      .then(() => {
        alert("🗑️ Class deleted");
        fetchClasses();
      })
      .catch(err => {
        console.error("Delete error:", err);
        alert("❌ Delete failed");
      });
  };

  const getPersonDisplayName = (person, type) => {
    return person?.fullName || person?.name || `${type} ${person?.id}`;
  };

  const getTeacherNameById = (id) => {
    const t = teachers.find(t => String(t.id) === String(id));
    return t ? getPersonDisplayName(t, 'Teacher') : 'Unknown';
  };

  const getStudentById = (id) => allStudents.find(s => String(s.id) === String(id));

  const getSlotContent = (day, slot) => {
    const cls = classes.find(c => c.day === day && c.timeSlot === slot);
    return cls ? (
      <div>
        <strong>{cls.className}</strong><br />
        <small className="text-muted">{getTeacherNameById(cls.teacherId)}</small><br />
        <small>💵 {cls.classFee} / 🏛️ {cls.hallFeePercentage}%</small><br />
        <button className="btn btn-sm btn-danger mt-1" onClick={() => handleDeleteClass(cls.id)}>Delete</button>
      </div>
    ) : (
      <span className="text-muted">Free</span>
    );
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">📆 Class Scheduler</h2>

      <div className="card shadow-sm p-4 mb-5">
        <div className="row g-3">
          <div className="col-md-6">
            <input name="className" placeholder="Class Name" value={form.className} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6">
            <select name="teacher" value={form.teacher} onChange={handleChange} className="form-select">
              <option value="">Select Teacher</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{getPersonDisplayName(t, 'Teacher')}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <input type="number" name="classFee" placeholder="Class Fee (LKR)" value={form.classFee} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6">
            <input type="number" name="hallFeePercentage" placeholder="Hall Fee %" value={form.hallFeePercentage} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-12">
            <label className="form-label">Add Students</label>
            <input type="text" className="form-control mb-2" placeholder="Search students..." value={searchQuery} onChange={handleStudentSearchChange} />
            {searchQuery && filteredStudents.length > 0 && (
              <ul className="list-group mb-2" style={{ maxHeight: 150, overflowY: 'auto' }}>
                {filteredStudents.map(s => (
                  <li key={s.id} className="list-group-item list-group-item-action" onClick={() => handleAddStudent(s.id)} style={{ cursor: 'pointer' }}>
                    {getPersonDisplayName(s, 'Student')} (ID: {s.id})
                  </li>
                ))}
              </ul>
            )}
            <div className="d-flex flex-wrap gap-2 mt-2 border p-2 rounded">
              {form.students.length > 0 ? (
                form.students.map(id => {
                  const s = getStudentById(id);
                  return s ? (
                    <span key={s.id} className="badge bg-primary d-flex align-items-center">
                      {getPersonDisplayName(s, 'Student')}
                      <button type="button" className="btn-close btn-close-white ms-2" onClick={() => handleRemoveStudent(s.id)}></button>
                    </span>
                  ) : null;
                })
              ) : (
                <span className="text-muted">No students selected.</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <select name="day" value={form.day} onChange={handleChange} className="form-select">
              <option value="">Select Day</option>
              {weekDays.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="col-md-6">
            <select name="timeSlot" value={form.timeSlot} onChange={handleChange} className="form-select">
              <option value="">Select Time Slot</option>
              {defaultTimeSlots.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="col-12 d-grid">
            <button className="btn btn-primary" onClick={handleAddClass}>➕ Add Class</button>
          </div>
        </div>
      </div>

      <div className="table-responsive shadow-sm">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Time</th>
              {weekDays.map(d => <th key={d}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {defaultTimeSlots.map(slot => (
              <tr key={slot}>
                <td className="fw-semibold">{slot}</td>
                {weekDays.map(day => (
                  <td key={day + slot}>{getSlotContent(day, slot)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scheduler;
