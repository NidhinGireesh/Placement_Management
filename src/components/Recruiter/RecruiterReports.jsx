import styles from '../dashboard/Dashboard.module.css';
import StatCard from '../dashboard/StatCard';
import { Users, FileText, UserCheck, Briefcase } from 'lucide-react';

const RecruiterReports = () => {
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Recruitment Reports</h1>
                <p>Insights into your hiring pipeline.</p>
            </div>

            <div className={styles.statsGrid}>
                <StatCard title="Total Applicants" value="128" icon={Users} color="#2563EB" />
                <StatCard title="Positions Open" value="5" icon={Briefcase} color="#F59E0B" />
                <StatCard title="Interviews Scheduled" value="12" icon={FileText} color="#7C3AED" />
                <StatCard title="Hires Made" value="3" icon={UserCheck} color="#16A34A" />
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Hiring Funnel</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '2rem 0', flexWrap: 'wrap', gap: '1rem' }}>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid #E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#2563EB', margin: '0 auto 1rem' }}>
                            128
                        </div>
                        <p style={{ fontWeight: '500', color: '#4B5563' }}>Applied</p>
                    </div>

                    <div style={{ fontSize: '2rem', color: '#D1D5DB' }}>&rarr;</div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid #FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#D97706', margin: '0 auto 1rem' }}>
                            45
                        </div>
                        <p style={{ fontWeight: '500', color: '#4B5563' }}>Screened</p>
                    </div>

                    <div style={{ fontSize: '2rem', color: '#D1D5DB' }}>&rarr;</div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid #EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#7C3AED', margin: '0 auto 1rem' }}>
                            12
                        </div>
                        <p style={{ fontWeight: '500', color: '#4B5563' }}>Interviewed</p>
                    </div>

                    <div style={{ fontSize: '2rem', color: '#D1D5DB' }}>&rarr;</div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid #DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#16A34A', margin: '0 auto 1rem' }}>
                            3
                        </div>
                        <p style={{ fontWeight: '500', color: '#4B5563' }}>Hired</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RecruiterReports;
