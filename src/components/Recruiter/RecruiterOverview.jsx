import { useAuthStore } from '../../store/authStore';
import StatCard from '../dashboard/StatCard';
import { Briefcase, FileText, CheckCircle } from 'lucide-react';

export default function RecruiterOverview() {
    const { user } = useAuthStore();

    return (
        <div>
            <header className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>
                        Welcome, <span style={{ color: '#9333ea' }}>{user?.name}</span>
                    </h1>
                    <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Find your next star employee here.</p>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6" style={{ marginBottom: '2rem' }}>
                <StatCard title="Active Jobs" value="0" icon={Briefcase} color="#9333ea" />
                <StatCard title="Total Applications" value="0" icon={FileText} color="#2563eb" />
                <StatCard title="Shortlisted" value="0" icon={CheckCircle} color="#16a34a" />
            </div>
        </div>
    );
}
