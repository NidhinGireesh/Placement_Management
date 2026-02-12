
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getMyApplications } from '../../services/applicationService';

export default function ApplicationList() {
    const { user } = useAuthStore();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.uid) {
            loadApplications();
        }
    }, [user]);

    const loadApplications = async () => {
        setLoading(true);
        const result = await getMyApplications(user.uid);
        if (result.success) {
            setApplications(result.applications);
        }
        setLoading(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'applied': return 'bg-yellow-100 text-yellow-800';
            case 'shortlisted': return 'bg-blue-100 text-blue-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'placed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <div>Loading applications...</div>;

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">My Applications</h2>
            </div>

            {applications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                    You haven't applied to any jobs yet.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applications.map((app) => (
                                <tr key={app.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.jobTitle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.companyName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {app.appliedAt ? new Date(app.appliedAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
