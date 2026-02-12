import { useAuthStore } from '../../store/authStore';
import StatCard from '../dashboard/StatCard';
import { Users, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CoordinatorOverview() {
    const { user } = useAuthStore();

    return (
        <div>
            <header className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>
                        Hello, <span style={{ color: '#0d9488' }}>{user?.name}</span>
                    </h1>
                    <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Manage extensive placement activities effectively.</p>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6" style={{ marginBottom: '2rem' }}>
                <StatCard title="Pending Approvals" value="0" icon={AlertTriangle} color="#eab308" />
                <StatCard title="Eligible Students" value="0" icon={Users} color="#14b8a6" />
                <StatCard title="Placed Students" value="0" icon={CheckCircle} color="#3b82f6" />
            </div>

            {/* Action Area */}
            <div className="grid grid-cols-2 gap-6">
                <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button style={{
                            padding: '1rem',
                            border: '2px dashed #d1d5db',
                            borderRadius: '0.75rem',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            color: '#4b5563',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#14b8a6'; e.currentTarget.style.backgroundColor = '#f0fdfa'; e.currentTarget.style.color = '#0f766e'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#4b5563'; }}
                        >
                            Create Drive
                        </button>
                        <button style={{
                            padding: '1rem',
                            border: '2px dashed #d1d5db',
                            borderRadius: '0.75rem',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            color: '#4b5563',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#14b8a6'; e.currentTarget.style.backgroundColor = '#f0fdfa'; e.currentTarget.style.color = '#0f766e'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#4b5563'; }}
                        >
                            Review Resumes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
