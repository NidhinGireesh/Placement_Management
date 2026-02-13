
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobCard({ job, onApply, isApplied, applying, basePath = '/student/jobs' }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3
                        className="text-lg font-bold text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => navigate(`${basePath}/${job.id}`)}
                    >
                        {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">{job.companyName}</p>
                </div>
                {job.logoUrl && (
                    <img src={job.logoUrl} alt={`${job.companyName} logo`} className="h-10 w-10 object-contain rounded" />
                )}
            </div>

            <div className="mt-2 text-sm text-gray-500 mb-4 flex-grow">
                <p>Location: {job.location || 'Remote'}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <span style={{
                        backgroundColor: job.jobType === 'Internship' ? '#EEF2FF' : '#F0FDF4',
                        color: job.jobType === 'Internship' ? '#4F46E5' : '#166534',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        border: `1px solid ${job.jobType === 'Internship' ? '#C7D2FE' : '#BBF7D0'}`
                    }}>
                        {job.jobType || 'Job'}
                    </span>
                    {job.ctc && <span className="text-gray-600">| {job.ctc}</span>}
                </div>

                <div className="mt-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</h4>
                    <p className="mt-1 text-sm text-gray-700 line-clamp-3">{job.description}</p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-xs text-gray-400">Posted: {job.createdAt?.seconds ? new Date(job.createdAt.seconds * 1000).toLocaleDateString() : 'Recently'}</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`${basePath}/${job.id}`)}
                        className="px-3 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        View
                    </button>
                    <button
                        onClick={() => onApply(job.id, job.title, job.companyName)}
                        disabled={isApplied || (applying && !job.registrationLink)}
                        className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${isApplied
                            ? 'bg-green-100 text-green-800 cursor-default'
                            : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                            }`}
                    >
                        {isApplied ? 'Applied' :
                            job.registrationLink ? 'Register ↗' :
                                applying ? 'Applying...' : 'Apply Now'}
                    </button>
                </div>
            </div>
        </div>
    );
}
