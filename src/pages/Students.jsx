import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Students = () => {
  const [students, setStudents] = useState([
    { id: 1, fullName: "Nimal Perera", email: "nimal@email.com", phone: "0771234567", subject: "Math" },
    { id: 2, fullName: "Kamal Silva", email: "kamal@email.com", phone: "0717654321", subject: "Science" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setStudents((prev) =>
      prev.map((s) => (s.id === currentStudent.id ? currentStudent : s))
    );
    setShowModal(false);
  };

  return (
    <div className="container py-5">
      <h2 className="text-primary mb-4">Student Management</h2>
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.fullName}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.subject}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={currentStudent?.fullName || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentStudent?.email || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={currentStudent?.phone || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={currentStudent?.subject || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Students;
