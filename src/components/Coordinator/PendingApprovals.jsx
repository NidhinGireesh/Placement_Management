import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Check, X, FileText, UserPlus } from 'lucide-react';

const PendingApprovals = () => {
    const [requests, setRequests] = useState([
        { id: 1, student: 'Alice Smith', type: 'Registration', details: 'Computer Science, 4th Year', date: '2023-11-20' },
        { id: 2, student: 'Bob Johnson', type: 'Resume Update', details: 'New certification added', date: '2023-11-21' },
        { id: 3, student: 'Charlie Brown', type: 'Job Application', details: 'Applying to TechCorp (GPA Waiver)', date: '2023-11-22' },
    ]);

    const handleApprove = (id) => {
        setRequests(requests.filter(req => req.id !== id));
        alert('Request Approved! (Mock Action)');
    };

    const handleReject = (id) => {
        setRequests(requests.filter(req => req.id !== id));
        alert('Request Rejected! (Mock Action)');
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Pending Approvals</h1>
                <p>Review and manage student requests.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Request Type</th>
                                <th>Details</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td style={{ fontWeight: '500' }}>{req.student}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {req.type === 'Registration' ? <UserPlus size={16} color="#2563EB" /> : <FileText size={16} color="#7C3AED" />}
                                            {req.type}
                                        </div>
                                    </td>
                                    <td>{req.details}</td>
                                    <td>{req.date}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleApprove(req.id)}
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    backgroundColor: '#DCFCE7',
                                                    color: '#166534',
                                                    borderRadius: '0.25rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                <Check size={14} /> Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(req.id)}
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    backgroundColor: '#FEE2E2',
                                                    color: '#991B1B',
                                                    borderRadius: '0.25rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                <X size={14} /> Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {requests.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>
                            No pending approvals.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingApprovals;

