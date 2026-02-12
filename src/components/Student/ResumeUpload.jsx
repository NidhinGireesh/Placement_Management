import { useState, useEffect } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { UploadCloud, FileText, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { uploadResume, getStudentProfile } from '../../services/studentService';

const ResumeUpload = () => {
    const { user } = useAuthStore();
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [existingResume, setExistingResume] = useState(null);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (user?.uid) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        const result = await getStudentProfile(user.uid);
        if (result.success && result.resumeUrl) {
            setExistingResume(result.resumeUrl);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        setMsg('Uploading...');

        const result = await uploadResume(file, user.uid);
        if (result.success) {
            setMsg('Resume uploaded successfully!');
            setExistingResume(result.url);
            setFile(null);
            // Optionally update state to show generic "View Resume" or filename if we stored it
        } else {
            setMsg('Upload failed: ' + result.error);
        }
        setIsUploading(false);
    };

    const removeFile = () => {
        setFile(null);
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Resume Management</h1>
                <p>Upload your latest resume to be visible to recruiters.</p>
            </div>

            <div className={styles.section} style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                {msg && <p style={{ marginBottom: '1rem', color: msg.includes('failed') ? 'red' : 'green' }}>{msg}</p>}

                <div style={{
                    border: '2px dashed #E5E7EB',
                    borderRadius: '0.5rem',
                    padding: '3rem',
                    backgroundColor: '#F9FAFB',
                    cursor: 'pointer',
                    position: 'relative'
                }}>
                    {!file ? (
                        <>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    opacity: 0,
                                    cursor: 'pointer'
                                }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '50%', color: '#2563EB' }}>
                                    <UploadCloud size={32} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Click to upload or drag and drop</h3>
                                    <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>PDF, DOCX up to 5MB</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                            <FileText size={48} color="#2563EB" />
                            <div style={{ textAlign: 'left' }}>
                                <p style={{ fontWeight: '600' }}>{file.name}</p>
                                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button onClick={removeFile} style={{ marginLeft: '1rem', color: '#EF4444' }}>
                                <X size={20} />
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    style={{
                        marginTop: '1.5rem',
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: !file || isUploading ? '#9CA3AF' : '#2563EB',
                        color: 'white',
                        borderRadius: '0.375rem',
                        fontWeight: '600',
                        cursor: !file || isUploading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isUploading ? 'Uploading...' : 'Upload Resume'}
                </button>
            </div>

            {existingResume && (
                <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: '2rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Current Resume</h3>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <FileText size={24} color="#6B7280" />
                            <span style={{ fontWeight: '500' }}>My Resume</span>
                        </div>
                        <a
                            href={existingResume}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#2563EB', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}
                        >
                            Download
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeUpload;
