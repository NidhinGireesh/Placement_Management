import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Building, Save } from 'lucide-react';

const CompanyProfile = () => {
    const [profile, setProfile] = useState({
        name: 'TechCorp Solutions',
        industry: 'Software Development',
        website: 'https://techcorp.example.com',
        description: 'Leading provider of enterprise software solutions.',
        address: '123 Tech Park, Innovation City'
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert('Company profile updated successfully! (Mock Action)');
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Company Profile</h1>
                <p>Manage your company's public profile.</p>
            </div>

            <div className={styles.section} style={{ maxWidth: '800px' }}>
                <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Company Name</label>
                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '0.375rem', padding: '0.75rem' }}>
                            <Building size={20} color="#6B7280" style={{ marginRight: '0.75rem' }} />
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                style={{ width: '100%', outline: 'none', border: 'none', background: 'transparent' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Industry</label>
                            <input
                                type="text"
                                name="industry"
                                value={profile.industry}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Website</label>
                            <input
                                type="url"
                                name="website"
                                value={profile.website}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                        <textarea
                            name="description"
                            value={profile.description}
                            onChange={handleChange}
                            rows="4"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #E5E7EB' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Address</label>
                        <textarea
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            rows="2"
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
                            backgroundColor: '#2563EB',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        <Save size={18} /> Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanyProfile;
