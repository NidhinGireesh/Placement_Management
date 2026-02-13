
import { useState, useEffect } from 'react';
import { getOpenJobs } from '../../services/jobService';
import { applyToJob, getMyApplications } from '../../services/applicationService';
import { useAuthStore } from '../../store/authStore';
import { db } from '../../config/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import JobCard from './JobCard';

export default function JobBoard({ basePath = '/student/jobs' }) {
    const { user } = useAuthStore();
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(null); // jobId being applied to
    const [studentProfile, setStudentProfile] = useState(null);

    useEffect(() => {
        if (user?.uid) {
            loadData();
        }
    }, [user]);

    const loadData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Student Profile
            let profile = null;
            if (user.role === 'student') {
                const q = query(collection(db, 'students'), where('userId', '==', user.uid));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    profile = snap.docs[0].data();
                    setStudentProfile(profile);
                }
            }

            // 2. Fetch Jobs and Applications
            const [jobsRes, appsRes] = await Promise.all([
                getOpenJobs(),
                getMyApplications(user.uid)
            ]);

            if (jobsRes.success) {
                // Filter jobs based on eligibility if profile exists
                let filteredJobs = jobsRes.jobs;

                if (profile) {
                    filteredJobs = jobsRes.jobs.filter(job => {
                        // If no eligibility criteria, it's open for all
                        if (!job.eligibility) return true;

                        const { branches, minCGPA, passoutYear } = job.eligibility;

                        // Check Branch
                        if (branches && branches.length > 0) {
                            if (!profile.branch || !branches.includes(profile.branch)) {
                                return false; // Not in eligible branch
                            }
                        }

                        // Check CGPA
                        if (minCGPA) {
                            const studentCGPA = parseFloat(profile.cgpa || 0);
                            if (studentCGPA < parseFloat(minCGPA)) {
                                return false; // CGPA too low
                            }
                        }

                        // Check Passout Year
                        if (passoutYear) {
                            if (profile.passoutYear != passoutYear) {
                                return false; // Wrong year
                            }
                        }

                        return true;
                    });
                }

                setJobs(filteredJobs);
            }

            if (appsRes.success) {
                setApplications(appsRes.applications);
            }
        } catch (error) {
            console.error("Error loading job board:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (jobId, jobTitle, companyName, registrationLink) => {
        if (registrationLink) {
            window.open(registrationLink, '_blank');
            return;
        }

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
                    {jobs.length} Eligible Jobs
                </span>
            </div>

            {jobs.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">No matching jobs found for your profile.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onApply={(id, title, company) => handleApply(id, title, company, job.registrationLink)}
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
