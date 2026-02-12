import styles from '../dashboard/Dashboard.module.css';
import { Bell, Calendar, Briefcase, Info } from 'lucide-react';

const NotificationsPage = () => {
    const notifications = [
        { id: 1, type: 'interview', message: 'Interview scheduled with TechCorp for Software Engineer role.', time: '2 hours ago', icon: Calendar, color: 'purple' },
        { id: 2, type: 'job', message: 'New job posted: Data Scientist at AI Labs.', time: '5 hours ago', icon: Briefcase, color: 'blue' },
        { id: 3, type: 'system', message: 'Please complete your profile to improve visibility.', time: '1 day ago', icon: Info, color: 'yellow' },
        { id: 4, type: 'alert', message: 'Application deadline for InnovateX is tomorrow.', time: '1 day ago', icon: Bell, color: 'red' },
    ];

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Notifications</h1>
                <p>Stay updated with the latest alerts.</p>
            </div>

            <div className={styles.section} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {notifications.map((notif, index) => {
                    const Icon = notif.icon;
                    return (
                        <div
                            key={notif.id}
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                padding: '1.25rem',
                                borderBottom: index !== notifications.length - 1 ? '1px solid #F3F4F6' : 'none',
                                alignItems: 'start'
                            }}
                        >
                            <div style={{
                                minWidth: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: notif.color === 'purple' ? '#F5F3FF' : notif.color === 'blue' ? '#EFF6FF' : notif.color === 'yellow' ? '#FFFBEB' : '#FEF2F2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: notif.color === 'purple' ? '#7C3AED' : notif.color === 'blue' ? '#2563EB' : notif.color === 'yellow' ? '#D97706' : '#EF4444',
                            }}>
                                <Icon size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ color: '#1F2937', fontWeight: '500', marginBottom: '0.25rem' }}>{notif.message}</p>
                                <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{notif.time}</span>
                            </div>
                            <button style={{ color: '#9CA3AF' }}>&times;</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NotificationsPage;
