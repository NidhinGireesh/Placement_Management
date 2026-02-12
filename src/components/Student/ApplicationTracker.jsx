import { useState, useEffect } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { useAuthStore } from '../../store/authStore';
import { getMyApplications } from '../../services/applicationService';

const ApplicationTracker = () => {
    const { user } = useAuthStore();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.uid) {
            fetchApplications();
        }
    }, [user]);

    const fetchApplications = async () => {
        setLoading(true);
        const result = await getMyApplications(user.uid);
        if (result.success) {
            setApplications(result.applications);
        }
        setLoading(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'placed': return styles.success;
            case 'rejected': return styles.error;
            case 'shortlisted': return styles.info;
            default: return styles.warning;
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Application Tracker</h1>
                <p>Track the status of your job applications.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.tableContainer}>
                    {loading ? (
                        <p>Loading applications...</p>
                    ) : applications.length === 0 ? (
                        <p>No applications found.</p>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Company</th>
                                    <th>Applied Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app.id}>
                                        <td><strong>{app.jobTitle}</strong></td>
                                        <td>{app.company}</td>
                                        <td>{new Date(app.appliedAt?.seconds * 1000).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${getStatusColor(app.status)}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationTracker;
