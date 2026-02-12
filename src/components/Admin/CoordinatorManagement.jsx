import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { UserPlus, Trash2 } from 'lucide-react';

const CoordinatorManagement = () => {
    const [coordinators, setCoordinators] = useState([
        { id: 1, name: 'Dr. John Doe', email: 'john.doe@example.com', dept: 'CSE' },
        { id: 2, name: 'Prof. Jane Smith', email: 'jane.smith@example.com', dept: 'ECE' },
    ]);

    const handleDelete = (id) => {
        setCoordinators(coordinators.filter(c => c.id !== id));
        alert('Coordinator removed! (Mock Action)');
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>Coordinator Management</h1>
                        <p>Manage department coordinators.</p>
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
                        <UserPlus size={18} /> Add Coordinator
                    </button>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coordinators.map((c) => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: '500' }}>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>{c.dept}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(c.id)}
                                            style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                        >
                                            <Trash2 size={18} /> Remove
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

export default CoordinatorManagement;
