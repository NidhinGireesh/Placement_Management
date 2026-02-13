import { useState, useEffect } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { UserPlus, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getUsersByRole, approveUser, blockUser, deleteUserDoc } from '../../services/adminService';

const CoordinatorManagement = () => {
    const [coordinators, setCoordinators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCoordinators();
    }, []);

    const fetchCoordinators = async () => {
        setLoading(true);
        setError(null);
        const result = await getUsersByRole('coordinator');
        if (result.success) {
            setCoordinators(result.users);
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    const handleApprove = async (id) => {
        const result = await approveUser(id);
        if (result.success) {
            alert('Coordinator approved!');
            fetchCoordinators();
        } else {
            alert('Error approving coordinator');
        }
    };

    const handleBlock = async (id) => {
        const result = await blockUser(id);
        if (result.success) {
            alert('Coordinator blocked!');
            fetchCoordinators();
        } else {
            alert('Error blocking coordinator');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const result = await deleteUserDoc(id);
            if (result.success) {
                alert('Coordinator deleted!');
                fetchCoordinators();
            } else {
                alert('Error deleting coordinator');
            }
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>Coordinator Management</h1>
                        <p>Manage department coordinators.</p>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Branch / Year</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {error}</td>
                                </tr>
                            ) : coordinators.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No coordinators found.</td>
                                </tr>
                            ) : (
                                coordinators.map((c) => (
                                    <tr key={c.id}>
                                        <td style={{ fontWeight: '500' }}>{c.name}</td>
                                        <td>{c.branch} / {c.passoutYear}</td>
                                        <td>{c.email}</td>
                                        <td>
                                            <span
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.75rem',
                                                    backgroundColor: c.approved ? '#DCFCE7' : '#FEF3C7',
                                                    color: c.approved ? '#166534' : '#D97706',
                                                    fontWeight: '500',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem'
                                                }}
                                            >
                                                {c.approved ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                                                {c.approved ? 'Active' : 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {!c.approved && (
                                                    <button
                                                        onClick={() => handleApprove(c.id)}
                                                        style={{ color: '#16A34A', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                        title="Approve User"
                                                    >
                                                        <CheckCircle size={18} /> Approve
                                                    </button>
                                                )}
                                                {c.approved && (
                                                    <button
                                                        onClick={() => handleBlock(c.id)}
                                                        style={{ color: '#D97706', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                        title="Block User"
                                                    >
                                                        <XCircle size={18} /> Block
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(c.id)}
                                                    style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={18} /> Delete
                                                </button>
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

export default CoordinatorManagement;
