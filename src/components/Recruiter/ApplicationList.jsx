import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Download, Check, X } from 'lucide-react';

const ApplicantsList = () => {
    const [applicants, setApplicants] = useState([
        { id: 1, name: 'Alice Smith', job: 'Software Engineer', gpa: '8.8', resume: 'link', status: 'Applied' },
        { id: 2, name: 'Bob Johnson', job: 'Software Engineer', gpa: '7.5', resume: 'link', status: 'Applied' },
        { id: 3, name: 'David Lee', job: 'Data Analyst', gpa: '9.0', resume: 'link', status: 'Shortlisted' },
    ]);

    const updateStatus = (id, status) => {
        setApplicants(applicants.map(app => app.id === id ? { ...app, status } : app));
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Applicants</h1>
                <p>Review and manage job applications.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Candidate Name</th>
                                <th>Applied For</th>
                                <th>GPA</th>
                                <th>Resume</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicants.map((app) => (
                                <tr key={app.id}>
                                    <td style={{ fontWeight: '500' }}>{app.name}</td>
                                    <td>{app.job}</td>
                                    <td>{app.gpa}</td>
                                    <td>
                                        <button style={{ color: '#2563EB', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                                            <Download size={14} /> Download
                                        </button>
                                    </td>
                                    <td>
                                        <span
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                backgroundColor: app.status === 'Shortlisted' ? '#DCFCE7' : app.status === 'Rejected' ? '#FEE2E2' : '#F3F4F6',
                                                color: app.status === 'Shortlisted' ? '#166534' : app.status === 'Rejected' ? '#991B1B' : '#6B7280',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {app.status}
                                        </span>
                                    </td>
                                    <td>
                                        {app.status === 'Applied' && (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => updateStatus(app.id, 'Shortlisted')}
                                                    title="Shortlist"
                                                    style={{ color: '#16A34A', padding: '0.25rem', backgroundColor: '#DCFCE7', borderRadius: '0.25rem' }}
                                                >
                                                    <Check size={16} />
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(app.id, 'Rejected')}
                                                    title="Reject"
                                                    style={{ color: '#DC2626', padding: '0.25rem', backgroundColor: '#FEE2E2', borderRadius: '0.25rem' }}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}
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

export default ApplicantsList;
