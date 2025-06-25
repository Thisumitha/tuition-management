import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    if (!selectedClass) return;

    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        setIndexNumber(decodedText);
        handleMarkAttendance(decodedText); // Auto mark attendance on scan
      },
      (error) => {
        // ignore scan errors
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [selectedClass]); // only re-initialize when class is selected

  const handleMarkAttendance = (index) => {
    if (!selectedClass || !index) {
      alert("Select a class and enter index number");
      return;
    }

    const alreadyMarked = attendanceList.find(
      (entry) => entry.index === index && entry.class === selectedClass
    );

    if (alreadyMarked) {
      alert("Already marked");
      return;
    }

    const entry = {
      index,
      class: selectedClass,
      time: new Date().toLocaleTimeString(),
    };

    setAttendanceList((prev) => [entry, ...prev]);
    setIndexNumber("");
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
              required
            >
              <option value="">-- Select Class --</option>
              <option value="Maths">Maths</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Enter Index Number</label>
            <input
              type="text"
              className="form-control"
              value={indexNumber}
              onChange={(e) => setIndexNumber(e.target.value)}
              placeholder="E.g., ST123"
            />
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-success w-100"
              onClick={() => handleMarkAttendance(indexNumber)}
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
              <th>Index No</th>
              <th>Class</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.length > 0 ? (
              attendanceList.map((s, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{s.index}</td>
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
