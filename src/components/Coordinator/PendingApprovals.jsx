import { useState, useEffect } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Check, X, UserPlus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { getCoordinatorProfile, getClassStudents, approveStudent } from '../../services/coordinatorService';

const PendingApprovals = () => {
    const { user } = useAuthStore();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [coordinatorInfo, setCoordinatorInfo] = useState(null);

    useEffect(() => {
        if (user) {
            loadData();
        }
    }, [user]);

    const loadData = async () => {
        setLoading(true);
        // 1. Get Coordinator Profile to know Branch/Year
        const profileResult = await getCoordinatorProfile(user.uid);
        if (profileResult.success) {
            setCoordinatorInfo(profileResult.profile);

            // 2. Get Students for that Branch/Year
            const studentsResult = await getClassStudents(profileResult.profile.branch, profileResult.profile.passoutYear);
            if (studentsResult.success) {
                // Filter only Pending students
                const pendingStudents = studentsResult.students.filter(s => !s.approved);
                setRequests(pendingStudents);
            }
        }
        setLoading(false);
    };

    const handleApprove = async (studentUserId) => {
        const result = await approveStudent(studentUserId);
        if (result.success) {
            alert('Student Approved!');
            loadData(); // Refresh list
        } else {
            alert('Error approving student');
        }
    };

    const handleReject = (id) => {
        // For now, rejection might just mean leaving them pending or deleting (not implemented yet)
        alert('Reject functionality not implemented yet (requires blocking/deleting logic).');
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Pending Approvals</h1>
                <p>Review registration requests for <strong>{coordinatorInfo?.branch} - {coordinatorInfo?.passoutYear}</strong></p>
            </div>

            <div className={styles.section}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Request Type</th>
                                <th>Register No.</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                                        No pending approvals.
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req) => (
                                    <tr key={req.id}>
                                        <td style={{ fontWeight: '500' }}>{req.name}<br /><span style={{ fontSize: '0.8em', color: '#6b7280' }}>{req.email}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <UserPlus size={16} color="#2563EB" />
                                                Registration
                                            </div>
                                        </td>
                                        <td>{req.registerNumber}</td>
                                        <td>{req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'N/A'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => handleApprove(req.userId)}
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
                                                {/* 
                                                <button
                                                    onClick={() => handleReject(req.userId)}
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
                                                 */}
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

export default PendingApprovals;

