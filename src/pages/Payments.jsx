import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported for modals

const Payment = () => {
    const [selected, setSelected] = useState(null);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [currentStudentId, setCurrentStudentId] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [studentWalletBalance, setStudentWalletBalance] = useState(0); // To display current wallet balance

    const fetchStudents = () => {
        axios.get("http://localhost:8080/api/students/unpaid")
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    };

    const fetchTeachers = () => {
        // Assuming this endpoint is correct for teachers, otherwise it also needs adjustment.
        axios.get("http://localhost:8080/api/payment/teachers/earnings")
            .then(res => setTeachers(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        if (selected === "student") fetchStudents();
        if (selected === "teacher") fetchTeachers();
    }, [selected]);

    const openPaymentModal = (studentId, walletBalance) => {
        setCurrentStudentId(studentId);
        setStudentWalletBalance(walletBalance);
        setPaymentAmount(walletBalance.toFixed(2)); // Pre-fill with the full due amount
        setShowPaymentModal(true);
    };

    const closePaymentModal = () => {
        setShowPaymentModal(false);
        setCurrentStudentId(null);
        setPaymentAmount('');
        setStudentWalletBalance(0);
    };

    const handleProcessPayment = () => {
        if (!paymentAmount || isNaN(paymentAmount) || parseFloat(paymentAmount) <= 0) {
            alert("Please enter a valid payment amount.");
            return;
        }

        const amountToPay = parseFloat(paymentAmount);

        axios.post(`http://localhost:8080/api/students/pay/${currentStudentId}`, null, {
            params: { amount: amountToPay } // Send amount as a query parameter
        })
        .then(() => {
            alert(`✅ Payment of $${amountToPay.toFixed(2)} marked as completed.`);
            fetchStudents(); // refresh the table
            closePaymentModal();
        })
        .catch(err => {
            console.error(err);
            alert("❌ Failed to process payment.");
        });
    };

    return (
        <div className="container p-5">
            <h2 className="text-center text-primary mb-4">💰 Payment Management</h2>

            <div className="d-flex justify-content-center mb-4 gap-3">
                <button className="btn btn-primary" onClick={() => setSelected("student")}>
                    Student Payments
                </button>
                <button className="btn btn-success" onClick={() => setSelected("teacher")}>
                    Teacher Earnings
                </button>
            </div>

            {selected === "student" && (
                <div>
                    <h4 className="mb-3">🧑‍🎓 Students With Due Payments</h4>
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Student</th>
                                <th>Due Wallet Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? students.map((s, i) => (
                                <tr key={s.id}>
                                    <td>{i + 1}</td>
                                    <td>{s.fullName}</td>
                                    <td>${s.wallet.toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => openPaymentModal(s.id, s.wallet)}
                                        >
                                            Pay Now
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4">No students with pending dues.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {selected === "teacher" && (
                <div>
                    <h4 className="mb-3">👨‍🏫 Teachers Wallets</h4>
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Teacher</th>
                                <th>Wallet Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.length > 0 ? teachers.map((t, i) => (
                                <tr key={t.id}>
                                    <td>{i + 1}</td>
                                    <td>{t.name}</td>
                                    <td>${t.wallet.toFixed(2)}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="3">No teacher data.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter Payment Amount</h5>
                                <button type="button" className="btn-close" onClick={closePaymentModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Current Due Amount: <strong>${studentWalletBalance.toFixed(2)}</strong></p>
                                <div className="mb-3">
                                    <label htmlFor="paymentInput" className="form-label">Amount to Pay:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="paymentInput"
                                        value={paymentAmount}
                                        onChange={(e) => setPaymentAmount(e.target.value)}
                                        min="0.01"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closePaymentModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleProcessPayment}>Process Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;