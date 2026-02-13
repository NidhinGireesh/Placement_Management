import { useState, useEffect } from 'react';
import StatCard from '../dashboard/StatCard';
import { Users, UserCheck, Building, AlertTriangle } from 'lucide-react';
import { getDashboardStats } from '../../services/adminService';

export default function AdminOverview() {
    const [stats, setStats] = useState({
        students: 0,
        coordinators: 0,
        recruiters: 0,
        alerts: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const result = await getDashboardStats();
        if (result.success) {
            setStats(result.stats);
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
                        System Overview
                    </h1>
                    <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Monitoring active system status.</p>
                </div>
                <div style={{
                    backgroundColor: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #e5e7eb'
                }}>
                    <div style={{ width: '0.75rem', height: '0.75rem', backgroundColor: '#22c55e', borderRadius: '50%', marginRight: '0.5rem' }}></div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>System Online</span>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6" style={{ marginBottom: '2rem' }}>
                <StatCard title="Total Students" value={stats.students} icon={Users} color="#2563eb" />
                <StatCard title="Coordinators" value={stats.coordinators} icon={UserCheck} color="#0d9488" />
                <StatCard title="Recruiters" value={stats.recruiters} icon={Building} color="#9333ea" />
                <StatCard title="System Alerts" value={stats.alerts} icon={AlertTriangle} color="#dc2626" />
            </div>
        </div>
    );
}
