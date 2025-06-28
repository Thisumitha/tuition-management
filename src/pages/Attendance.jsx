import { useEffect, useState } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

const Attendance = () => {
  const [selectedClassId, setSelectedClassId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [attendanceList, setAttendanceList] = useState([]); // This will now hold records for a specific date
  const [allClasses, setAllClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Initialize with today's date

  const hallsAPI = "http://localhost:8080/api/halls";
  const attendanceAPI = "http://localhost:8080/api/attendance";

  // 1. Fetch class list
  useEffect(() => {
    axios
      .get(hallsAPI)
      .then((res) => setAllClasses(res.data))
      .catch((err) => console.error("Error loading classes", err));
  }, []);

  // 2. Setup QR scanner on class select
  useEffect(() => {
    if (!selectedClassId) return;

    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        handleMarkAttendance(decodedText);
      },
      (error) => {
        // Optional: console.error("QR Scan Error", error);
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [selectedClassId]);

  // 3. Handle Marking Attendance (QR Scan or Manual Input)
const handleMarkAttendance = (scannedId) => {
  if (!selectedClassId || !scannedId) {
    alert("Please select a class and enter a valid student ID.");
    return;
  }

  const dto = {
    studentId: Number(scannedId),
    classId: Number(selectedClassId),
  };

  axios.post(attendanceAPI, dto)
    .then((res) => {
      alert("✅ Attendance marked!");
      setAttendanceList(prev => [
        {
          studentId: dto.studentId,
          classId: dto.classId,
          className: res.data.className,
          timestamp: new Date().toLocaleString()
        },
        ...prev
      ]);
      setStudentId(""); // Clear input
    })
    .catch(err => {
      let msg = "❌ Failed to mark attendance.";

      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          msg = err.response.data;
        } else if (typeof err.response.data.message === "string") {
          msg = err.response.data.message;
        }
      }

      alert(msg);
    });
};


  // 4. Fetch Attendance for a specific class and date
  const fetchAttendanceByClassAndDate = () => {
    if (!selectedClassId || !selectedDate) {
      alert("Please select both a class and a date to view attendance.");
      return;
    }

    axios
      .get(`${attendanceAPI}/by-date`, {
        params: {
          classId: selectedClassId,
          date: selectedDate,
        },
      })
      .then((res) => {
        setAttendanceList(res.data);
        if (res.data.length === 0) {
          alert("No attendance records found for this class on the selected date.");
        }
      })
      .catch((err) => {
        console.error("Error fetching attendance by date:", err);
        alert("Failed to fetch attendance records.");
        setAttendanceList([]); // Clear list on error
      });
  };

  return (
    <div className="container py-5">
      <h2 className="text-primary text-center mb-4">📋 Mark & View Attendance</h2>

      {/* Mark Attendance Section */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="text-secondary mb-3">Mark Attendance</h5>
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Select Class</label>
            <select
              className="form-select"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
            >
              <option value="">-- Select Class --</option>
              {allClasses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.className}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Student ID</label>
            <input
              type="text"
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

      {selectedClassId && (
        <div className="card p-3 mb-4 shadow-sm">
          <h5 className="text-secondary mb-2">📷 Scan QR Code</h5>
          <div id="qr-reader" style={{ width: "100%" }}></div>
        </div>
      )}

      {/* View Attendance Section */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="text-secondary mb-3">View Attendance by Date</h5>
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Select Class</label>
            <select
              className="form-select"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
            >
              <option value="">-- Select Class --</option>
              {allClasses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.className}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary w-100"
              onClick={fetchAttendanceByClassAndDate}
            >
              🔎 Search Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Records Display */}
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
                <tr key={s.id || i}>
                  {" "}
                  {/* Assuming attendanceDto has an 'id' field */}
                  <td>{i + 1}</td>
                  <td>{s.studentId}</td>
                  <td>{s.className || s.classId}</td>{" "}
                  {/* Display className if available, else classId */}
                  <td>{s.timestamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  {selectedClassId && selectedDate
                    ? "No attendance records found for the selected class and date."
                    : "Select a class and date, then click 'Search Attendance'."}
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