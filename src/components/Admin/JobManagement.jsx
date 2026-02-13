import { useState, useEffect } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Trash2, Plus, X, ExternalLink } from 'lucide-react';
import { getOpenJobs, createJob, deleteJob } from '../../services/jobService';

const JobManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        companyName: '',
        location: '',
        jobType: 'Job', // Job or Internship
        ctc: '', // or Stipend
        description: '',
        registrationLink: '', // External link
        deadline: '',
        eligibility: {
            minCGPA: '',
            branches: [], // Array of strings e.g. ['CSE', 'ECE']
            passoutYear: ''
        }
    });

    const branches = ['CSE', 'ECE', 'ME', 'IT', 'EEE', 'RAI'];

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        setLoading(true);
        const result = await getOpenJobs();
        if (result.success) {
            setJobs(result.jobs);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job posting?')) return;

        const result = await deleteJob(id);
        if (result.success) {
            loadJobs();
        } else {
            alert('Failed to delete job');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleBranchChange = (branch) => {
        setFormData(prev => {
            const currentBranches = prev.eligibility.branches;
            if (currentBranches.includes(branch)) {
                return {
                    ...prev,
                    eligibility: {
                        ...prev.eligibility,
                        branches: currentBranches.filter(b => b !== branch)
                    }
                };
            } else {
                return {
                    ...prev,
                    eligibility: {
                        ...prev.eligibility,
                        branches: [...currentBranches, branch]
                    }
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.title || !formData.companyName) {
            alert('Please fill required fields');
            return;
        }

        const result = await createJob({
            ...formData,
            postedBy: 'admin' // can add admin ID if available
        });

        if (result.success) {
            alert('Job Posted Successfully!');
            setShowForm(false);
            setFormData({
                title: '',
                companyName: '',
                location: '',
                jobType: 'Job',
                ctc: '',
                description: '',
                registrationLink: '',
                deadline: '',
                eligibility: { minCGPA: '', branches: [], passoutYear: '' }
            });
            loadJobs();
        } else {
            alert('Failed to post job: ' + result.error);
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Job Management</h1>
                    <p>Post and manage job opportunities.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    style={{
                        backgroundColor: '#2563EB',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {showForm ? <X size={20} /> : <Plus size={20} />}
                    {showForm ? 'Cancel' : 'Post New Job'}
                </button>
            </div>

            {showForm && (
                <div className={styles.section} style={{ marginBottom: '2rem', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Create New Posting</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Job Title *</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Company Name *</label>
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Classification</label>
                                <select name="jobType" value={formData.jobType} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }}>
                                    <option value="Job">Full-time Job</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location</label>
                                <input type="text" name="location" value={formData.location} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>CTC / Stipend</label>
                                <input type="text" name="ctc" value={formData.ctc} onChange={handleInputChange} placeholder="e.g. 10 LPA or 20k/month" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Deadline</label>
                                <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }}></textarea>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Registration Link (External)</label>
                            <input type="url" name="registrationLink" value={formData.registrationLink} onChange={handleInputChange} placeholder="https://..." style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} />
                            <small style={{ color: '#6B7280' }}>If provided, students will be redirected here to apply. Leave empty for internal application.</small>
                        </div>

                        {/* Eligibility Section */}
                        <div style={{ padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Eligibility Criteria</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Min CGPA</label>
                                    <input type="number" step="0.1" name="eligibility.minCGPA" value={formData.eligibility.minCGPA} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Passout Year</label>
                                    <input type="text" name="eligibility.passoutYear" value={formData.eligibility.passoutYear} onChange={handleInputChange} placeholder="e.g. 2024" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} />
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Eligible Branches</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                    {branches.map(branch => (
                                        <label key={branch} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={formData.eligibility.branches.includes(branch)}
                                                onChange={() => handleBranchChange(branch)}
                                            />
                                            {branch}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#10B981',
                                color: 'white',
                                padding: '0.75rem 2rem',
                                borderRadius: '0.5rem',
                                fontWeight: '600',
                                border: 'none',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            Post Job
                        </button>
                    </form>
                </div>
            )}

            <div className={styles.section}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Type</th>
                                <th>Eligibility</th>
                                <th>Posted Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((j) => (
                                <tr key={j.id}>
                                    <td style={{ fontWeight: '500' }}>
                                        <div>{j.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{j.companyName}</div>
                                    </td>
                                    <td>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            backgroundColor: j.jobType === 'Internship' ? '#EEF2FF' : '#F0FDF4',
                                            color: j.jobType === 'Internship' ? '#4F46E5' : '#166534',
                                            border: `1px solid ${j.jobType === 'Internship' ? '#C7D2FE' : '#BBF7D0'}`
                                        }}>
                                            {j.jobType || 'Job'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.85rem' }}>
                                            {j.eligibility?.minCGPA && <div>CGPA: {j.eligibility.minCGPA}+</div>}
                                            {j.eligibility?.branches?.length > 0 ? (
                                                <div>{j.eligibility.branches.join(', ')}</div>
                                            ) : <div>All Branches</div>}
                                        </div>
                                    </td>
                                    <td>{j.createdAt?.toDate ? j.createdAt.toDate().toLocaleDateString() : 'Just now'}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(j.id)}
                                            style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '0.25rem', border: 'none', background: 'none', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={18} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {jobs.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>
                            No active job postings.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobManagement;
