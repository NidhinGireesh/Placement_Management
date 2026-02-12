import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Search, Eye, Trash2, Ban } from 'lucide-react';

const StudentManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([
        { id: 1, name: 'Alice Smith', email: 'alice@example.com', dept: 'CSE', year: '4th', status: 'Active' },
        { id: 2, name: 'Bob Johnson', email: 'bob@example.com', dept: 'ECE', year: '4th', status: 'Active' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', dept: 'MECH', year: '4th', status: 'Inactive' },
    ]);

    const handleDisable = (id) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s));
    };

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Student Management</h1>
                <p>Manage student accounts and access.</p>
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
                                <th>Department</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((s) => (
                                <tr key={s.id}>
                                    <td style={{ fontWeight: '500' }}>{s.name}</td>
                                    <td>{s.email}</td>
                                    <td>{s.dept}</td>
                                    <td>
                                        <span
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                backgroundColor: s.status === 'Active' ? '#DCFCE7' : '#F3F4F6',
                                                color: s.status === 'Active' ? '#166534' : '#6B7280',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {s.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button style={{ color: '#2563EB' }}><Eye size={18} /></button>
                                            <button
                                                onClick={() => handleDisable(s.id)}
                                                style={{ color: s.status === 'Active' ? '#DC2626' : '#16A34A' }}
                                                title={s.status === 'Active' ? 'Disable Account' : 'Enable Account'}
                                            >
                                                {s.status === 'Active' ? <Ban size={18} /> : <Trash2 size={18} />}
                                            </button>
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

export default StudentManagement;
