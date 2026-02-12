import styles from '../dashboard/Dashboard.module.css';
import StatCard from '../dashboard/StatCard';
import { Users, Briefcase, Award, TrendingUp } from 'lucide-react';

const PlacementTracking = () => {
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Placement Tracking</h1>
                <p>Overview of department placement performance.</p>
            </div>

            <div className={styles.statsGrid}>
                <StatCard title="Total Students" value="120" icon={Users} color="#2563EB" />
                <StatCard title="Placed" value="85" icon={Award} color="#16A34A" />
                <StatCard title="Unplaced" value="35" icon={TrendingUp} color="#DC2626" />
                <StatCard title="Avg Package" value="8.5 LPA" icon={Briefcase} color="#7C3AED" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Company Wise Selections</h2>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Selected</th>
                                    <th>Avg Package</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>TechCorp</td><td>15</td><td>12 LPA</td></tr>
                                <tr><td>DataWise</td><td>10</td><td>9 LPA</td></tr>
                                <tr><td>WebSolutions</td><td>8</td><td>7.5 LPA</td></tr>
                                <tr><td>StartUp Inc</td><td>5</td><td>15 LPA</td></tr>
                                <tr><td>Global Systems</td><td>12</td><td>6.5 LPA</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Department Performance</h2>
                    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4B5563' }}>
                                <span>CSE</span>
                                <span>85% Placed</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px' }}>
                                <div style={{ width: '85%', height: '100%', backgroundColor: '#2563EB', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4B5563' }}>
                                <span>ECE</span>
                                <span>72% Placed</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px' }}>
                                <div style={{ width: '72%', height: '100%', backgroundColor: '#7C3AED', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4B5563' }}>
                                <span>MECH</span>
                                <span>60% Placed</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px' }}>
                                <div style={{ width: '60%', height: '100%', backgroundColor: '#F59E0B', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlacementTracking;
