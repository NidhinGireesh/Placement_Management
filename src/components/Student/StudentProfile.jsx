
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getStudentProfile, updateStudentProfile, uploadResume, uploadProfilePhoto } from '../../services/studentService';

export default function StudentProfile() {
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState({
        passoutYear: '',
        branch: '',
        gender: '',
        dob: '',
        lateralEntry: '',
        cgpa: '',
        skills: '', // Comma separated string for input
        resumeUrl: '',
        photoUrl: '',
        phone: '',
        address: ''
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [msg, setMsg] = useState({ type: '', content: '' });

    useEffect(() => {
        if (user?.uid) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        setLoading(true);
        console.log('Loading profile for user:', user.uid);
        const result = await getStudentProfile(user.uid);
        console.log('Profile result:', result);
        if (result.success) {
            setProfile(prev => ({
                ...prev,
                ...result,
                skills: Array.isArray(result.skills) ? result.skills.join(', ') : result.skills || ''
            }));
        } else {
            console.error('Failed to load profile:', result.error);
            setMsg({ type: 'error', content: 'Failed to load profile: ' + result.error });
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'resume' && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        } else if (e.target.name === 'photo' && e.target.files[0]) {
            setPhotoFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMsg({ type: '', content: '' });

        console.log('Submitting profile:', profile);

        if (!profile.id) {
            console.error('Profile ID is missing. Cannot update.');
            setMsg({ type: 'error', content: 'Error: Profile ID is missing. Please refresh the page.' });
            setSaving(false);
            return;
        }

        try {
            let url = profile.resumeUrl;
            if (resumeFile) {
                const uploadRes = await uploadResume(resumeFile, user.uid);
                if (uploadRes.success) {
                    url = uploadRes.url;
                } else {
                    throw new Error('Failed to upload resume');
                }
            }

            let photoUrl = profile.photoUrl;
            if (photoFile) {
                const uploadPhotoRes = await uploadProfilePhoto(photoFile, user.uid);
                if (uploadPhotoRes.success) {
                    photoUrl = uploadPhotoRes.url;
                } else {
                    throw new Error('Failed to upload profile photo');
                }
            }

            const skillsArray = profile.skills.split(',').map(s => s.trim()).filter(s => s);

            const updateRes = await updateStudentProfile(profile.id, {
                ...profile,
                resumeUrl: url,
                photoUrl: photoUrl,
                skills: skillsArray
            });

            if (updateRes.success) {
                setMsg({ type: 'success', content: 'Profile updated successfully!' });
                setProfile(prev => ({ ...prev, resumeUrl: url, photoUrl: photoUrl, skills: skillsArray.join(', ') }));
                setResumeFile(null);
                setPhotoFile(null);
            } else {
                setMsg({ type: 'error', content: updateRes.error });
            }
        } catch (error) {
            setMsg({ type: 'error', content: error.message });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading profile...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>

            {msg.content && (
                <div className={`p-3 mb-4 rounded ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {msg.content}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Profile Photo Section */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-2 border-2 border-blue-500">
                        {profile.photoUrl ? (
                            <img src={profile.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">No Photo</div>
                        )}
                    </div>
                    <label className="cursor-pointer bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-100 transition">
                        Change Photo
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                    {photoFile && <span className="text-xs text-gray-500 mt-1">Selected: {photoFile.name}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={user?.name || ''}
                            disabled
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Register Number</label>
                        <input
                            type="text"
                            name="registerNumber"
                            value={profile.registerNumber || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department/Branch</label>
                        <input
                            type="text"
                            name="branch"
                            value={profile.branch || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={profile.gender || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={profile.dob || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Passout Year</label>
                        <input
                            type="number"
                            name="passoutYear"
                            value={profile.passoutYear || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">CGPA</label>
                        <input
                            type="number"
                            step="0.01"
                            name="cgpa"
                            value={profile.cgpa || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Lateral Entry</label>
                        <input
                            type="text"
                            value={profile.lateralEntry === 'yes' ? 'Yes' : 'No'}
                            disabled
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={profile.phone || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            name="address"
                            value={profile.address || ''}
                            onChange={handleChange}
                            rows="3"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                        <textarea
                            name="skills"
                            value={profile.skills}
                            onChange={handleChange}
                            rows="2"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="Java, Python, React, etc."
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Resume</label>
                        <div className="mt-1 flex items-center">
                            <input
                                type="file"
                                name="resume"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {profile.resumeUrl && (
                                <a
                                    href={profile.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-4 text-blue-600 hover:underline text-sm"
                                >
                                    View Current Resume
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
}
