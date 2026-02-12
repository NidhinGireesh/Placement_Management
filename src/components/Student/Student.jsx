import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import styles from '../dashboard/Dashboard.module.css';
import { getStudentProfile, updateStudentProfile } from '../../services/studentService';

const StudentProfile = () => {
    const { user } = useAuthStore();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        branch: '',
        cgpa: '',
        passoutYear: '',
        skills: '',
        phone: '',
        gender: '',
        dob: '',
        address: '',
        lateralEntry: 'no'
    });
    const [profileId, setProfileId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (user?.uid) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        const result = await getStudentProfile(user.uid);
        if (result.success) {
            setProfileId(result.id);
            setFormData(prev => ({
                ...prev,
                ...result,
                skills: Array.isArray(result.skills) ? result.skills.join(', ') : result.skills || ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');

        const skillsArray = typeof formData.skills === 'string'
            ? formData.skills.split(',').map(s => s.trim()).filter(s => s)
            : formData.skills;

        const updatedData = {
            ...formData,
            skills: skillsArray
        };

        const result = await updateStudentProfile(profileId, updatedData);
        if (result.success) {
            setMsg('Profile updated successfully!');
            setIsEditing(false);
            loadProfile(); // Reload to normalize data
        } else {
            setMsg('Failed to update profile.');
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>My Profile</h1>
                <p>Manage your personal and academic information.</p>
            </div>

            <div className={styles.section} style={{ maxWidth: '800px' }}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Personal Details</h2>
                    {msg && <span style={{ color: msg.includes('Failed') ? 'red' : 'green', marginLeft: '1rem' }}>{msg}</span>}
                    <button
                        onClick={() => isEditing ? handleSubmit({ preventDefault: () => { } }) : setIsEditing(true)}
                        style={{
                            backgroundColor: isEditing ? '#10B981' : '#2563EB',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem'
                        }}
                    >
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4B5563' }}>Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            disabled
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB', backgroundColor: '#F3F4F6' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4B5563' }}>Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            disabled
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB', backgroundColor: '#F3F4F6' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4B5563' }}>Department / Branch</label>
                        <input
                            type="text"
                            value={formData.branch}
                            disabled={!isEditing}
                            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB', backgroundColor: isEditing ? 'white' : '#F3F4F6' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4B5563' }}>Passout Year</label>
                        <input
                            type="text"
                            value={formData.passoutYear}
                            disabled={!isEditing}
                            onChange={(e) => setFormData({ ...formData, passoutYear: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB', backgroundColor: isEditing ? 'white' : '#F3F4F6' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4B5563' }}>CGPA</label>
                        <input
                            type="text"
                            value={formData.cgpa}
                            disabled={!isEditing}
                            onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB', backgroundColor: isEditing ? 'white' : '#F3F4F6' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4B5563' }}>Phone</label>
                        <input
                            type="text"
                            value={formData.phone}
                            disabled={!isEditing}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB', backgroundColor: isEditing ? 'white' : '#F3F4F6' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4B5563' }}>Gender</label>
                        <select
                            value={formData.gender}
                            disabled={!isEditing}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB', backgroundColor: isEditing ? 'white' : '#F3F4F6' }}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4B5563' }}>Lateral Entry</label>
                        <input
                            type="text"
                            value={formData.lateralEntry}
                            disabled
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB', backgroundColor: '#F3F4F6' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4B5563' }}>Address</label>
                        <textarea
                            value={formData.address}
                            disabled={!isEditing}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            rows="2"
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB', backgroundColor: isEditing ? 'white' : '#F3F4F6', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4B5563' }}>Skills (Comma separated)</label>
                        <textarea
                            value={formData.skills}
                            disabled={!isEditing}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            rows="3"
                            style={{ padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB', backgroundColor: isEditing ? 'white' : '#F3F4F6', fontFamily: 'inherit' }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentProfile;
