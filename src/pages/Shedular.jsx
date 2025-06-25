import { useState } from "react";
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const defaultTimeSlots = ['08:00–09:00', '09:00–10:00', '10:00–11:00', '11:00–12:00', '13:00–14:00', '14:00–15:00', '15:00–16:00'];

const Scheduler = () => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    className: '',
    teacher: '',
    students: '',
    day: '',
    timeSlot: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddClass = () => {
    if (!form.className || !form.teacher || !form.day || !form.timeSlot) {
      alert('Please fill all fields.');
      return;
    }

    const newClass = {
      ...form,
      students: form.students.split(',').map((s) => s.trim()),
    };

    const isSlotTaken = classes.find(
      (cls) => cls.day === newClass.day && cls.timeSlot === newClass.timeSlot
    );

    if (isSlotTaken) {
      alert('This time slot is already taken.');
      return;
    }

    setClasses([...classes, newClass]);
    setForm({
      className: '',
      teacher: '',
      students: '',
      day: '',
      timeSlot: '',
    });
  };

  const getSlotContent = (day, slot) => {
    const cls = classes.find((c) => c.day === day && c.timeSlot === slot);
    return cls ? (
      <>
        <strong>{cls.className}</strong>
        <br />
        <span className="text-muted" style={{ fontSize: '0.85rem' }}>{cls.teacher}</span>
      </>
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
            <input
              name="className"
              placeholder="Class Name"
              value={form.className}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <input
              name="teacher"
              placeholder="Teacher Name"
              value={form.teacher}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-12">
            <input
              name="students"
              placeholder="Students (comma separated)"
              value={form.students}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <select name="day" value={form.day} onChange={handleChange} className="form-select">
              <option value="">Select Day</option>
              {weekDays.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <select name="timeSlot" value={form.timeSlot} onChange={handleChange} className="form-select">
              <option value="">Select Time Slot</option>
              {defaultTimeSlots.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 d-grid">
            <button onClick={handleAddClass} className="btn btn-primary">
              ➕ Add Class
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive shadow-sm">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Time</th>
              {weekDays.map((d) => (
                <th key={d}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {defaultTimeSlots.map((slot) => (
              <tr key={slot}>
                <td className="fw-semibold">{slot}</td>
                {weekDays.map((day) => (
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
