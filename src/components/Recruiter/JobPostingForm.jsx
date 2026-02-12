import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Send } from 'lucide-react';

const JobPostingForm = () => {
    const [job, setJob] = useState({
        title: '',
        type: 'Full-time',
        location: '',
        salary: '',
        description: '',
        requirements: ''
    });

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Job Posted Successfully! (Mock Action)');
        setJob({ title: '', type: 'Full-time', location: '', salary: '', description: '', requirements: '' });
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Post a New Job</h1>
                <p>Create a job listing to find the best talent.</p>
            </div>

            <div className={styles.section} style={{ maxWidth: '800px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={job.title}
                            onChange={handleChange}
                            placeholder="e.g. Software Engineer"
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Job Type</label>
                            <select
                                name="type"
                                value={job.type}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB' }}
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Part-time">Part-time</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={job.location}
                                onChange={handleChange}
                                placeholder="e.g. Remote / Bangalore"
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>CTC / Stipend</label>
                            <input
                                type="text"
                                name="salary"
                                value={job.salary}
                                onChange={handleChange}
                                placeholder="e.g. 12 LPA"
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Job Description</label>
                        <textarea
                            name="description"
                            value={job.description}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Describe the role and responsibilities..."
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Requirements</label>
                        <textarea
                            name="requirements"
                            value={job.requirements}
                            onChange={handleChange}
                            rows="4"
                            placeholder="List key skills and qualifications..."
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB' }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem',
                            backgroundColor: '#16A34A',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        <Send size={18} /> Post Job
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobPostingForm;
