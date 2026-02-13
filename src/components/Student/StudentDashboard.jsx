import { useNavigate, NavLink, Outlet, Routes, Route, Navigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import StudentOverview from './StudentOverview';
import Student from './Student';
import JobBoard from './JobBoard';
import JobDetails from './JobDetails';
import ApplicationTracker from './ApplicationTracker';
import ResumeUpload from './ResumeUpload';
import NotificationPage from './NotificationPage';
import StudentCourseList from './StudentCourseList';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      logout();
      navigate('/login');
    }
  };

  const SidebarItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      end={to === "/student"}
      className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', width: '100%', padding: '0.75rem 1rem' }}
    >
      <span style={{ marginRight: '0.75rem', fontSize: '1.25rem' }}>{icon}</span>
      <span style={{ fontWeight: 600 }}>{label}</span>
    </NavLink>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            Student Portal
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>Placement Management System</p>
        </div>

        <nav className="sidebar-nav">
          <SidebarItem to="/student" icon="📊" label="Overview" />
          <SidebarItem to="/student/profile" icon="👨‍🎓" label="My Profile" />
          <SidebarItem to="/student/jobs" icon="💼" label="Job Board" />
          <SidebarItem to="/student/courses" icon="📚" label="Courses" />
          <SidebarItem to="/student/applications" icon="📝" label="Applications" />
          <SidebarItem to="/student/notifications" icon="🔔" label="Notifications" />
        </nav>

        <div style={{ padding: '1.5rem', marginTop: 'auto', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#ef4444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
              width: '100%'
            }}
          >
            <span style={{ marginRight: '0.75rem' }}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>
              Welcome back, <span style={{ color: '#2563eb' }}>{user?.name}</span>! 👋
            </h1>
            <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Here's what's happening with your applications today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div style={{
              height: '2.5rem',
              width: '2.5rem',
              borderRadius: '50%',
              backgroundColor: '#dbeafe',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}>
              {user?.name?.charAt(0) || 'S'}
            </div>
          </div>
        </header>

        {/* Dynamic Content via Outlet */}
        <Routes>
          <Route index element={<StudentOverview />} />
          <Route path="profile" element={<Student />} />
          <Route path="jobs" element={<JobBoard />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="courses" element={<StudentCourseList />} />
          <Route path="applications" element={<ApplicationTracker />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="*" element={<Navigate to="/student" replace />} />
        </Routes>
      </main>
    </div>
  );
}