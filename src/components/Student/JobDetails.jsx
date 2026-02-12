import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../dashboard/Dashboard.module.css';
import { MapPin, Briefcase, DollarSign, Calendar, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { getOpenJobs } from '../../services/jobService';
import { applyToJob, getMyApplications } from '../../services/applicationService';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [job, setJob] = useState(null);
    const [hasApplied, setHasApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        if (user?.uid && id) {
            loadJobDetails();
        }
    }, [user, id]);

    const loadJobDetails = async () => {
        setLoading(true);
        // In a real app, we'd have getJobById(id). For now, we fetch all and find.
        const jobsRes = await getOpenJobs();
        const appsRes = await getMyApplications(user.uid);

        if (jobsRes.success) {
            const foundJob = jobsRes.jobs.find(j => j.id === id);
            setJob(foundJob);
        }

        if (appsRes.success) {
            const isApplied = appsRes.applications.some(app => app.jobId === id);
            setHasApplied(isApplied);
        }
        setLoading(false);
    };

    const handleApply = async () => {
        if (!user || !job) return;
        setApplying(true);

        const result = await applyToJob(user.uid, job.id, job.title, job.companyName);

        if (result.success) {
            setHasApplied(true);
            alert('Application submitted successfully!');
        } else {
            alert('Failed to apply: ' + result.error);
        }
        setApplying(false);
    };

    if (loading) return <div className={styles.dashboardContainer}><p>Loading job details...</p></div>;
    if (!job) return <div className={styles.dashboardContainer}><p>Job not found.</p></div>;

    // Parse requirements if array or string
    const requirementsList = Array.isArray(job.requirements)
        ? job.requirements
        : typeof job.requirements === 'string'
            ? job.requirements.split('\n').filter(r => r.trim())
            : [];

    return (
        <div className={styles.dashboardContainer}>
            <button
                onClick={() => navigate(-1)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', fontSize: '0.9rem', width: 'fit-content', border: 'none', background: 'none', cursor: 'pointer', marginBottom: '1rem' }}
            >
                <ArrowLeft size={16} /> Back to Jobs
            </button>

            <div className={styles.section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1F2937', marginBottom: '0.5rem' }}>{job.title}</h1>
                        <h2 style={{ fontSize: '1.25rem', color: '#2563EB', fontWeight: '600' }}>{job.companyName}</h2>
                    </div>
                    <button
                        onClick={handleApply}
                        disabled={hasApplied || applying}
                        style={{
                            backgroundColor: hasApplied ? '#10B981' : '#2563EB',
                            color: 'white',
                            padding: '0.75rem 2rem',
                            borderRadius: '0.375rem',
                            fontWeight: '600',
                            fontSize: '1.125rem',
                            cursor: hasApplied || applying ? 'default' : 'pointer',
                            opacity: applying ? 0.7 : 1
                        }}
                    >
                        {hasApplied ? 'Applied Successfully' : applying ? 'Applying...' : 'Apply Now'}
                    </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Briefcase size={20} color="#6B7280" />
                        <span>{job.jobType || 'Full-time'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={20} color="#6B7280" />
                        <span>{job.location || 'Remote'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <DollarSign size={20} color="#6B7280" />
                        <span>{job.ctc || 'Not specified'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={20} color="#6B7280" />
                        <span>Posted {job.createdAt ? new Date(job.createdAt.seconds * 1000).toLocaleDateString() : 'Recently'}</span>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Job Description</h3>
                    <p style={{ lineHeight: '1.6', color: '#4B5563', whiteSpace: 'pre-wrap' }}>{job.description}</p>
                </div>

                {requirementsList.length > 0 && (
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Requirements</h3>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#4B5563', lineHeight: '1.6' }}>
                            {requirementsList.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobDetails;
