import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Trash2 } from 'lucide-react';

const JobManagement = () => {
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Software Engineer', company: 'TechCorp', posted: '2d ago' },
        { id: 2, title: 'Data Analyst', company: 'DataWise', posted: '5d ago' },
        { id: 3, title: 'Fake Job', company: 'Scam Tech', posted: '1d ago' },
    ]);

    const handleDelete = (id) => {
        setJobs(jobs.filter(j => j.id !== id));
        alert('Job deleted! (Mock Action)');
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Job Management</h1>
                <p>Moderation of job postings.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Posted Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((j) => (
                                <tr key={j.id}>
                                    <td style={{ fontWeight: '500' }}>{j.title}</td>
                                    <td>{j.company}</td>
                                    <td>{j.posted}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(j.id)}
                                            style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                        >
                                            <Trash2 size={18} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {jobs.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>
                            No active job postings.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobManagement;
