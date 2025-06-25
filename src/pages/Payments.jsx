import { useState } from "react";

const Payment = () => {
  const [selected, setSelected] = useState(null);

  const students = [
    { id: 1, name: "Alice", due: 1200 },
    { id: 2, name: "Bob", due: 800 },
    { id: 3, name: "Charlie", due: 1500 },
  ];

  const teachers = [
    { id: 1, name: "Mr. Smith", salary: 5000 },
    { id: 2, name: "Ms. Johnson", salary: 4500 },
    { id: 3, name: "Mrs. Lee", salary: 4800 },
  ];

  const hallFee = 1000;

  const handleReportClick = (type, person) => {
    alert(`Generate report for ${type}: ${person.name}`);
    // Implement report logic here
  };

  return (
    <div className="container p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Payment Management</h1>
      <p className="text-center text-gray-600 mb-10">
        Manage payments for Students and Teachers here.
      </p>

      <div className="d-flex justify-content-center gap-3">
        <button
          className={`btn p-6 btn-lg btn-primary px-8 py-4 text-xl rounded ${
            selected === "student" ? "active" : ""
          }`}
          onClick={() => setSelected("student")}
        >
          Student Payment
        </button>
          
        <button
          className={`btn btn-lg btn-success px-8 py-4 text-xl rounded p-6 ${
            selected === "teacher" ? "active" : ""
          }`}
          onClick={() => setSelected("teacher")}
        >
          Teacher Payment
        </button>
      </div>

      {selected === "student" && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Students Payment Due
          </h2>
          <table className="table table-striped table-bordered w-full text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Amount Due ($)</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={student.id}>
                  <td>{i + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.due}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleReportClick("Student", student)}
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 font-bold text-right">
            Total Due: ${students.reduce((acc, s) => acc + s.due, 0)}
          </p>
        </div>
      )}

      {selected === "teacher" && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">Teacher Payments</h2>
          <table className="table table-striped table-bordered w-full text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Teacher Name</th>
                <th>Salary ($)</th>
                <th>Hall Fee Deduction ($)</th>
                <th>Net Pay ($)</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, i) => (
                <tr key={teacher.id}>
                  <td>{i + 1}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.salary}</td>
                  <td>{hallFee}</td>
                  <td>{teacher.salary - hallFee}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleReportClick("Teacher", teacher)}
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 font-bold text-right">
            Total Net Pay: ${teachers.reduce((acc, t) => acc + (t.salary - hallFee), 0)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Payment;
