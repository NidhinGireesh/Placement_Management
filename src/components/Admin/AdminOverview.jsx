import StatCard from '../dashboard/StatCard';
import { Users, UserCheck, Building, AlertTriangle } from 'lucide-react';

export default function AdminOverview() {
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
                <StatCard title="Total Students" value="0" icon={Users} color="#2563eb" />
                <StatCard title="Coordinators" value="0" icon={UserCheck} color="#0d9488" />
                <StatCard title="Recruiters" value="0" icon={Building} color="#9333ea" />
                <StatCard title="System Alerts" value="0" icon={AlertTriangle} color="#dc2626" />
            </div>
        </div>
    );
}
