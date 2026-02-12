import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Plus } from 'lucide-react';

const CourseManagement = () => {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Computer Science', code: 'CSE', duration: '4 Years' },
        { id: 2, name: 'Electronics', code: 'ECE', duration: '4 Years' },
        { id: 3, name: 'Mechanical', code: 'MECH', duration: '4 Years' },
    ]);

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>Course & Dept Management</h1>
                        <p>Configure academic departments.</p>
                    </div>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: '#2563EB',
                        color: 'white',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.375rem',
                        fontWeight: '500'
                    }}>
                        <Plus size={18} /> Add Department
                    </button>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Department Name</th>
                                <th>Code</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((c) => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: '500' }}>{c.name}</td>
                                    <td>{c.code}</td>
                                    <td>{c.duration}</td>
                                    <td>
                                        <button style={{ color: '#2563EB', fontWeight: '500' }}>Edit</button>
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

export default CourseManagement;
