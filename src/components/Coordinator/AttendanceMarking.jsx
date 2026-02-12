import { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css';

const AttendanceMarking = () => {
    const [students, setStudents] = useState([
        { id: 1, name: 'Alice Smith', present: true },
        { id: 2, name: 'Bob Johnson', present: true },
        { id: 3, name: 'Charlie Brown', present: false },
        { id: 4, name: 'David Lee', present: true },
        { id: 5, name: 'Eva Green', present: true },
    ]);

    const toggleAttendance = (id) => {
        setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
    };

    const handleSubmit = () => {
        alert('Attendance submitted successfully! (Mock Action)');
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeSection}>
                <h1>Mark Attendance</h1>
                <p>Record placement training attendance for today.</p>
            </div>

            <div className={styles.section} style={{ maxWidth: '600px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                    <h3 style={{ textTransform: 'uppercase', color: '#6B7280', fontSize: '0.875rem', fontWeight: 'bold' }}>Student Name</h3>
                    <h3 style={{ textTransform: 'uppercase', color: '#6B7280', fontSize: '0.875rem', fontWeight: 'bold', marginRight: '1rem' }}>Present?</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {students.map((s) => (
                        <div
                            key={s.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                backgroundColor: '#F9FAFB',
                                borderRadius: '0.5rem',
                                border: '1px solid #E5E7EB'
                            }}
                        >
                            <span style={{ fontWeight: '500' }}>{s.name}</span>
                            <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                                <input
                                    type="checkbox"
                                    checked={s.present}
                                    onChange={() => toggleAttendance(s.id)}
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundColor: s.present ? '#2563EB' : '#ccc',
                                    transition: '.4s',
                                    borderRadius: '24px'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        content: '""',
                                        height: '16px',
                                        width: '16px',
                                        left: '4px',
                                        bottom: '4px',
                                        backgroundColor: 'white',
                                        transition: '.4s',
                                        borderRadius: '50%',
                                        transform: s.present ? 'translateX(16px)' : 'translateX(0)'
                                    }}></span>
                                </span>
                            </label>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    style={{
                        marginTop: '1.5rem',
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: '#2563EB',
                        color: 'white',
                        borderRadius: '0.375rem',
                        fontWeight: '600'
                    }}
                >
                    Submit Attendance
                </button>
            </div>
        </div>
    );
};

export default AttendanceMarking;
