import { useState, useEffect } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Check, X, ShieldAlert, Ban, CheckCircle } from 'lucide-react';
import { getUsersByRole, approveUser, blockUser } from '../../services/adminService';

const CompanyManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        setLoading(true);
        setError(null);
        const result = await getUsersByRole('recruiter');
        if (result.success) {
            setCompanies(result.users);
        } else {
            console.error("Failed to fetch companies:", result.error);
            setError(result.error);
        }
        setLoading(false);
    };

    const handleApprove = async (id) => {
        const result = await approveUser(id);
        if (result.success) {
            fetchCompanies();
        }
    };

    const handleBlock = async (id) => {
        const result = await blockUser(id);
        if (result.success) {
            fetchCompanies();
        }
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
                                <th>Company / Recruiter</th>
                                <th>Industry / Location</th>
                                <th>Email / Website</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="text-center p-4">Loading...</td></tr>
                            ) : error ? (
                                <tr><td colSpan="4" className="text-center p-4 text-red-600">Error: {error}</td></tr>
                            ) : companies.length === 0 ? (
                                <tr><td colSpan="4" className="text-center p-4">No recruiters found.</td></tr>
                            ) : (
                                companies.map((c) => (
                                    <tr key={c.id}>
                                        <td style={{ fontWeight: '500' }}>
                                            <div>{c.companyName || c.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Rep: {c.name}</div>
                                        </td>
                                        <td>
                                            <div>{c.industry}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{c.location}</div>
                                        </td>
                                        <td>
                                            <div>{c.email}</div>
                                            {c.website && (
                                                <a href={c.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#2563EB' }}>
                                                    Website
                                                </a>
                                            )}
                                        </td>
                                        <td>
                                            <span
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.75rem',
                                                    backgroundColor: c.approved ? '#DCFCE7' : '#FEF3C7',
                                                    color: c.approved ? '#166534' : '#D97706',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {c.approved ? 'Active' : 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {!c.approved && (
                                                    <button
                                                        onClick={() => handleApprove(c.id)}
                                                        title="Approve / Activate"
                                                        style={{ color: '#16A34A', display: 'flex', gap: '0.25rem' }}
                                                    >
                                                        <CheckCircle size={20} /> Approve
                                                    </button>
                                                )}
                                                {c.approved && (
                                                    <button
                                                        onClick={() => handleBlock(c.id)}
                                                        title="Block Company"
                                                        style={{ color: '#DC2626', display: 'flex', gap: '0.25rem' }}
                                                    >
                                                        <Ban size={20} /> Block
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompanyManagement;
