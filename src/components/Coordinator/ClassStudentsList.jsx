import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Search, Eye } from 'lucide-react';

const ClassStudentsList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const students = [
        { id: 1, name: 'Alice Smith', email: 'alice@example.com', gpa: '8.8', status: 'Placed' },
        { id: 2, name: 'Bob Johnson', email: 'bob@example.com', gpa: '7.5', status: 'Unplaced' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', gpa: '9.2', status: 'Placed' },
        { id: 4, name: 'David Lee', email: 'david@example.com', gpa: '6.8', status: 'Unplaced' },
        { id: 5, name: 'Eva Green', email: 'eva@example.com', gpa: '8.1', status: 'In Process' },
    ];

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Placed': return styles.success;
            case 'Unplaced': return styles.error;
            default: return styles.warning;
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Class Student List</h1>
                <p>View and manage students in your department.</p>
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
                                <th>GPA</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((s) => (
                                <tr key={s.id}>
                                    <td style={{ fontWeight: '500' }}>{s.name}</td>
                                    <td>{s.email}</td>
                                    <td>{s.gpa}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${getStatusColor(s.status)}`}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button style={{ color: '#2563EB', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '500' }}>
                                            <Eye size={16} /> details
                                        </button>
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

export default ClassStudentsList;
