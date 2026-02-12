import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Check, X, ShieldAlert } from 'lucide-react';

const CompanyManagement = () => {
    const [companies, setCompanies] = useState([
        { id: 1, name: 'TechCorp', email: 'hr@techcorp.com', status: 'Active' },
        { id: 2, name: 'DataWise', email: 'hiring@datawise.com', status: 'Pending' },
        { id: 3, name: 'Scam Tech', email: 'admin@scam.com', status: 'Blocked' },
    ]);

    const toggleStatus = (id, newStatus) => {
        setCompanies(companies.map(c => c.id === id ? { ...c, status: newStatus } : c));
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Company Management</h1>
                <p>Verify and manage recruiting companies.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Contact Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((c) => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: '500' }}>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>
                                        <span
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                backgroundColor: c.status === 'Active' ? '#DCFCE7' : c.status === 'Pending' ? '#FEF3C7' : '#FEE2E2',
                                                color: c.status === 'Active' ? '#166534' : c.status === 'Pending' ? '#D97706' : '#991B1B',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {c.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {c.status !== 'Active' && (
                                                <button
                                                    onClick={() => toggleStatus(c.id, 'Active')}
                                                    title="Approve / Activate"
                                                    style={{ color: '#16A34A' }}
                                                >
                                                    <Check size={20} />
                                                </button>
                                            )}
                                            {c.status !== 'Blocked' && (
                                                <button
                                                    onClick={() => toggleStatus(c.id, 'Blocked')}
                                                    title="Block Company"
                                                    style={{ color: '#DC2626' }}
                                                >
                                                    <ShieldAlert size={20} />
                                                </button>
                                            )}
                                        </div>
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

export default CompanyManagement;
