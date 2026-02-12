import styles from '../dashboard/Dashboard.module.css';
import StatCard from '../dashboard/StatCard';
import { Users, Award, Briefcase, TrendingUp } from 'lucide-react';

const ReportsAnalytics = () => {
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Reports & Analytics</h1>
                <p>System-wide performance metrics.</p>
            </div>

            <div className={styles.statsGrid}>
                <StatCard title="Total Students" value="450" icon={Users} color="#2563EB" />
                <StatCard title="Placed Students" value="320" icon={Award} color="#16A34A" />
                <StatCard title="Partner Companies" value="25" icon={Briefcase} color="#F59E0B" />
                <StatCard title="Placement Rate" value="71%" icon={TrendingUp} color="#7C3AED" />
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Mock Hiring Trends (2023)</h2>
                <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '2rem', padding: '1rem 0' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '100%', height: '60%', backgroundColor: '#93C5FD', borderRadius: '4px' }}></div>
                        <span style={{ fontSize: '0.8rem' }}>Q1</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '100%', height: '80%', backgroundColor: '#60A5FA', borderRadius: '4px' }}></div>
                        <span style={{ fontSize: '0.8rem' }}>Q2</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '100%', height: '40%', backgroundColor: '#3B82F6', borderRadius: '4px' }}></div>
                        <span style={{ fontSize: '0.8rem' }}>Q3</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '100%', height: '90%', backgroundColor: '#2563EB', borderRadius: '4px' }}></div>
                        <span style={{ fontSize: '0.8rem' }}>Q4</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;
