
import { useState, useEffect } from 'react';
import { getOpenJobs } from '../../services/jobService';
import { applyToJob, getMyApplications } from '../../services/applicationService';
import { useAuthStore } from '../../store/authStore';
import JobCard from './JobCard';

export default function JobBoard({ basePath = '/student/jobs' }) {
    const { user } = useAuthStore();
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(null); // jobId being applied to

    useEffect(() => {
        if (user?.uid) {
            loadData();
        }
    }, [user]);

    const loadData = async () => {
        setLoading(true);
        const [jobsRes, appsRes] = await Promise.all([
            getOpenJobs(),
            getMyApplications(user.uid)
        ]);

        if (jobsRes.success) {
            setJobs(jobsRes.jobs);
        }

        if (appsRes.success) {
            setApplications(appsRes.applications);
        }
        setLoading(false);
    };

    const handleApply = async (jobId, jobTitle, companyName) => {
        if (!user) return;
        setApplying(jobId);

        const result = await applyToJob(user.uid, jobId, jobTitle, companyName);

        if (result.success) {
            // Refresh applications to update UI
            const appsRes = await getMyApplications(user.uid);
            if (appsRes.success) {
                setApplications(appsRes.applications);
            }
            alert('Applied successfully!');
        } else {
            alert(`Failed to apply: ${result.error}`);
        }
        setApplying(null);
    };

    const isApplied = (jobId) => {
        return applications.some(app => app.jobId === jobId);
    };

    if (loading) return <div>Loading jobs...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Open Opportunities</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {jobs.length} Jobs
                </span>
            </div>

            {jobs.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">No open jobs at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onApply={handleApply}
                            isApplied={isApplied(job.id)}
                            applying={applying === job.id}
                            basePath={basePath}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
