import { useEffect, useState } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [studentId, setStudentId] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [allClasses, setAllClasses] = useState([]);

  const hallsAPI = "http://localhost:8080/api/halls";

  // Load all classes from backend
  useEffect(() => {
    axios.get(hallsAPI)
      .then((res) => setAllClasses(res.data))
      .catch((err) => console.error("Error fetching classes", err));
  }, []);

  // Setup QR scanner when a class is selected
  useEffect(() => {
    if (!selectedClass) return;

    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText) => {
        handleMarkAttendance(decodedText); // decodedText is student ID
      },
      (error) => {
        // Ignore errors
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [selectedClass]);

  const handleMarkAttendance = (scannedId) => {
    const cls = allClasses.find(c => c.className === selectedClass);
    if (!cls) {
      alert("Invalid class selected.");
      return;
    }

    const studentIds = cls.students || []; // students: array of Long (IDs)

    if (!studentIds.includes(Number(scannedId))) {
      alert("❌ Student not found in this class.");
      return;
    }

    const alreadyMarked = attendanceList.find(
      (entry) => entry.studentId === scannedId && entry.class === selectedClass
    );

    if (alreadyMarked) {
      alert("⚠️ Attendance already marked.");
      return;
    }

    const newEntry = {
      studentId: scannedId,
      class: selectedClass,
      time: new Date().toLocaleTimeString(),
    };

    setAttendanceList((prev) => [newEntry, ...prev]);
    setStudentId("");
  };

  return (
    <div className="container py-5">
      <h2 className="text-primary mb-4 text-center">📋 Mark Attendance</h2>

      <div className="card p-4 mb-4 shadow-sm">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Select Class</label>
            <select
              className="form-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">-- Select Class --</option>
              {allClasses.map((c) => (
                <option key={c.id} value={c.className}>{c.className}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Enter Student ID</label>
            <input
              type="number"
              className="form-control"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. 1001"
            />
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-success w-100"
              onClick={() => handleMarkAttendance(studentId)}
            >
              ✅ Mark Attendance
            </button>
          </div>
        </div>
      </div>

      {selectedClass && (
        <div className="card p-3 mb-4 shadow-sm">
          <h5 className="text-secondary mb-2">📷 Scan QR Code</h5>
          <div id="qr-reader" style={{ width: "100%" }}></div>
        </div>
      )}

      <div className="card p-3 shadow-sm">
        <h5 className="text-secondary mb-3">🧾 Attendance Records</h5>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Class</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.length > 0 ? (
              attendanceList.map((s, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{s.studentId}</td>
                  <td>{s.class}</td>
                  <td>{s.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No attendance marked yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
