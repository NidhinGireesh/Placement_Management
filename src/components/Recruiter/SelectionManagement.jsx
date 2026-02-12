import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { UserCheck, XCircle, Mail } from 'lucide-react';

const SelectionManagement = () => {
    const [candidates, setCandidates] = useState([
        { id: 1, name: 'Alice Smith', job: 'Software Engineer', interviewScore: '8/10', status: 'Interviewed' },
        { id: 2, name: 'David Lee', job: 'Data Analyst', interviewScore: '9/10', status: 'Selected' },
    ]);

    const updateStatus = (id, newStatus) => {
        setCandidates(candidates.map(c => c.id === id ? { ...c, status: newStatus } : c));
        if (newStatus === 'Selected') alert('Candidate Selected! Offer sent.');
        if (newStatus === 'Rejected') alert('Candidate Rejected.');
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Selection Management</h1>
                <p>Finalize selections and roll out offers.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Candidate</th>
                                <th>Role</th>
                                <th>Interview Score</th>
                                <th>Current Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((c) => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: '500' }}>{c.name}</td>
                                    <td>{c.job}</td>
                                    <td>{c.interviewScore}</td>
                                    <td>
                                        <span
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                backgroundColor: c.status === 'Selected' ? '#DCFCE7' : c.status === 'Rejected' ? '#FEE2E2' : '#FEF3C7',
                                                color: c.status === 'Selected' ? '#166534' : c.status === 'Rejected' ? '#991B1B' : '#D97706',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {c.status}
                                        </span>
                                    </td>
                                    <td>
                                        {c.status === 'Interviewed' && (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => updateStatus(c.id, 'Selected')}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#16A34A', fontWeight: '500' }}
                                                >
                                                    <UserCheck size={16} /> Select
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(c.id, 'Rejected')}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#DC2626', fontWeight: '500' }}
                                                >
                                                    <XCircle size={16} /> Reject
                                                </button>
                                            </div>
                                        )}
                                        {c.status === 'Selected' && (
                                            <button style={{ color: '#2563EB', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Mail size={16} /> View Offer
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SelectionManagement;
