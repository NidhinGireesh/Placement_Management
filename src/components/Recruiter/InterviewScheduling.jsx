import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';
import { Calendar, Clock, Video } from 'lucide-react';

const InterviewScheduling = () => {
    const [interviews, setInterviews] = useState([
        { id: 1, candidate: 'David Lee', job: 'Data Analyst', date: '', time: '', scheduled: false },
        { id: 2, candidate: 'Alice Smith', job: 'Software Engineer', date: '2023-11-25', time: '10:00 AM', scheduled: true },
    ]);

    const handleSchedule = (id) => {
        // Mock scheduling logic
        setInterviews(interviews.map(i => i.id === id ? { ...i, scheduled: true, date: '2023-11-26', time: '2:00 PM' } : i));
        alert('Interview Scheduled! (Mock Action)');
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Interview Scheduling</h1>
                <p>Schedule and manage interviews with shortlisted candidates.</p>
            </div>

            <div className={styles.section}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {interviews.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1.5rem',
                                backgroundColor: '#F9FAFB',
                                borderRadius: '0.5rem',
                                border: '1px solid #E5E7EB',
                                gap: '1rem'
                            }}
                        >
                            <div>
                                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{item.candidate}</h3>
                                <p style={{ margin: 0, color: '#6B7280', fontSize: '0.9rem' }}>Role: {item.job}</p>
                            </div>

                            {item.scheduled ? (
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#4B5563' }}>
                                        <Calendar size={18} /> <span>{item.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#4B5563' }}>
                                        <Clock size={18} /> <span>{item.time}</span>
                                    </div>
                                    <button style={{ padding: '0.5rem 1rem', backgroundColor: '#DBEAFE', color: '#2563EB', borderRadius: '0.375rem', border: 'none', fontWeight: '500' }}>
                                        Reschedule
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input type="date" style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} />
                                    <input type="time" style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} />
                                    <button
                                        onClick={() => handleSchedule(item.id)}
                                        style={{ padding: '0.5rem 1rem', backgroundColor: '#2563EB', color: 'white', borderRadius: '0.375rem', border: 'none', fontWeight: '500' }}
                                    >
                                        Schedule
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InterviewScheduling;
