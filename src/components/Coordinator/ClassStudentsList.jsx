import { useState, useEffect } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Search, Eye } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { getCoordinatorProfile, getClassStudents } from '../../services/coordinatorService';

const ClassStudentsList = () => {
    const { user } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [coordinatorInfo, setCoordinatorInfo] = useState(null);

    useEffect(() => {
        if (user) {
            loadData();
        }
    }, [user]);

    const loadData = async () => {
        setLoading(true);
        const profileResult = await getCoordinatorProfile(user.uid);
        if (profileResult.success) {
            setCoordinatorInfo(profileResult.profile);
            const studentsResult = await getClassStudents(profileResult.profile.branch, profileResult.profile.passoutYear);
            if (studentsResult.success) {
                setStudents(studentsResult.students);
            }
        }
        setLoading(false);
    };

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        // Status typically comes from 'approvalStatus' or 'placementStatus' (if implemented)
        // For now simplifying to approved/pending account status
        if (!status) return styles.warning; // Not approved
        return styles.success; // Approved
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Class Student List</h1>
                <p>Students in <strong>{coordinatorInfo?.branch} - {coordinatorInfo?.passoutYear}</strong></p>
            </div>

            <div className={styles.section}>
                <div style={{ marginBottom: '1rem', position: 'relative', maxWidth: '400px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #E5E7EB'
                        }}
                    />
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Register No.</th>
                                <th>CGPA</th>
                                <th>Status</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>No students found.</td>
                                </tr>
                            ) : (
                                filteredStudents.map((s) => (
                                    <tr key={s.id}>
                                        <td style={{ fontWeight: '500' }}>{s.name}</td>
                                        <td>{s.email}</td>
                                        <td>{s.registerNumber || 'N/A'}</td>
                                        <td>{s.cgpa || '0'}</td>
                                        <td>
                                            <span
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.75rem',
                                                    backgroundColor: s.approved ? '#DCFCE7' : '#FEF3C7',
                                                    color: s.approved ? '#166534' : '#D97706',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {s.approved ? 'Active' : 'Pending'}
                                            </span>
                                        </td>
                                        {/* 
                                        <td>
                                            <button style={{ color: '#2563EB', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '500' }}>
                                                <Eye size={16} /> details
                                            </button>
                                        </td>
                                        */}
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

export default ClassStudentsList;
