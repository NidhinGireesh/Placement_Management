import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { getStudentProfile } from '../../services/studentService';
import { getMyApplications } from '../../services/applicationService';

export default function StudentOverview({ basePath = '/student' }) {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [stats, setStats] = useState({
        profileStatus: 'Pending',
        activeApps: 0,
        interviews: 0,
        placed: 'No'
    });

    useEffect(() => {
        if (user?.uid) {
            fetchStats();
        }
    }, [user]);

    const fetchStats = async () => {
        const [profileRes, appsRes] = await Promise.all([
            getStudentProfile(user.uid),
            getMyApplications(user.uid)
        ]);

        let newStats = { ...stats };

        if (profileRes.success) {
            const isComplete = profileRes.registerNumber && profileRes.resumeUrl;
            newStats.profileStatus = isComplete ? 'Complete' : 'Pending';
        }

        if (appsRes.success) {
            newStats.activeApps = appsRes.applications.length;
            newStats.interviews = appsRes.applications.filter(a => a.status === 'shortlisted').length;
            const isPlaced = appsRes.applications.some(a => a.status === 'placed');
            newStats.placed = isPlaced ? 'Yes' : 'No';
        }

        setStats(newStats);
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-6" style={{ marginBottom: '2rem' }}>
                <div className="stat-card" style={{ borderLeftColor: '#facc15' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Profile Status</h3>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stats.profileStatus === 'Complete' ? '#22c55e' : '#f59e0b', marginTop: '0.25rem' }}>{stats.profileStatus}</p>
                </div>

                <div className="stat-card" style={{ borderLeftColor: '#3b82f6' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Apps</h3>
                    <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginTop: '0.25rem' }}>{stats.activeApps}</p>
                </div>

                <div className="stat-card" style={{ borderLeftColor: '#a855f7' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interviews</h3>
                    <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginTop: '0.25rem' }}>{stats.interviews}</p>
                </div>

                <div className="stat-card" style={{ borderLeftColor: '#22c55e' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Placement</h3>
                    <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: stats.placed === 'Yes' ? '#22c55e' : '#1f2937', marginTop: '0.5rem' }}>{stats.placed}</p>
                </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{ backgroundColor: '#dbeafe', color: '#2563eb', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', marginRight: '0.75rem', fontSize: '1rem' }}>📢</span>
                    Recent Updates
                </h2>

                <div className="space-y-4">
                    {stats.profileStatus === 'Pending' && (
                        <div style={{ padding: '1rem', backgroundColor: '#fff7ed', borderRadius: '0.5rem', border: '1px solid #ffedd5' }}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 style={{ fontWeight: 'bold', color: '#9a3412' }}>Complete Your Profile</h4>
                                    <p style={{ fontSize: '0.875rem', color: '#c2410c', marginTop: '0.25rem' }}>Your profile is incomplete. Please update it to apply for jobs.</p>
                                </div>
                                <button onClick={() => navigate(`${basePath}/profile`)} style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#fed7aa', color: '#9a3412', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>Go to Profile</button>
                            </div>
                        </div>
                    )}
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                        <p className="text-gray-500 text-sm">No new announcements.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
