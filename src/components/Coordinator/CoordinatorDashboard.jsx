import { useNavigate, NavLink, Outlet, Routes, Route, Navigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, CheckSquare, Users, TrendingUp, Calendar, FileText, Briefcase, UserCircle, Upload } from 'lucide-react';

// Components
import CoordinatorOverview from './CoordinatorOverview';
import PendingApprovals from './PendingApprovals';
import ClassStudentsList from './ClassStudentsList';
import AttendanceMarking from './AttendanceMarking';
import PlacementTracking from './PlacementTracking';

// Student Components for Coordinator
import Student from '../Student/Student';
import JobBoard from '../Student/JobBoard';
import JobDetails from '../Student/JobDetails';
import ApplicationTracker from '../Student/ApplicationTracker';
import ResumeUpload from '../Student/ResumeUpload';

export default function CoordinatorDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

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
      end={to === "/coordinator"}
      className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
      style={({ isActive }) => ({
        textDecoration: 'none',
        color: isActive ? '#0d9488' : 'inherit',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0.75rem 1rem',
        backgroundColor: isActive ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
        borderRight: isActive ? '4px solid #0d9488' : 'none'
      })}
    >
      <span style={{ marginRight: '0.75rem' }}>{icon}</span>
      <span style={{ fontWeight: 600 }}>{label}</span>
    </NavLink>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar" style={{ overflowY: 'auto' }}>
        <div className="sidebar-header">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #0d9488, #10b981)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            Coordinator
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>Management Console</p>
        </div>

        <nav className="sidebar-nav">
          <div className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4">Management</div>
          <SidebarItem to="/coordinator" icon={<LayoutDashboard size={20} />} label="Overview" />
          <SidebarItem to="/coordinator/approvals" icon={<CheckSquare size={20} />} label="Approvals" />
          <SidebarItem to="/coordinator/students" icon={<Users size={20} />} label="Students" />
          <SidebarItem to="/coordinator/attendance" icon={<Calendar size={20} />} label="Attendance" />
          <SidebarItem to="/coordinator/tracking" icon={<TrendingUp size={20} />} label="Placement Tracking" />

          <div className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6">My Placement</div>
          <SidebarItem to="/coordinator/profile" icon={<UserCircle size={20} />} label="My Profile" />
          <SidebarItem to="/coordinator/jobs" icon={<Briefcase size={20} />} label="Job Board" />
          <SidebarItem to="/coordinator/applications" icon={<FileText size={20} />} label="My Applications" />
          <SidebarItem to="/coordinator/resume" icon={<Upload size={20} />} label="My Resume" />
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
              fontSize: '1rem'
            }}
          >
            <span style={{ marginRight: '0.75rem' }}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route index element={<CoordinatorOverview />} />
          <Route path="approvals" element={<PendingApprovals />} />
          <Route path="students" element={<ClassStudentsList />} />
          <Route path="attendance" element={<AttendanceMarking />} />
          <Route path="tracking" element={<PlacementTracking />} />

          {/* Student Features for Coordinator */}
          <Route path="profile" element={<Student />} />
          <Route path="jobs" element={<JobBoard basePath="/coordinator/jobs" />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="applications" element={<ApplicationTracker />} />
          <Route path="resume" element={<ResumeUpload />} />

          <Route path="*" element={<Navigate to="/coordinator" replace />} />
        </Routes>
      </main>
    </div>
  );
}