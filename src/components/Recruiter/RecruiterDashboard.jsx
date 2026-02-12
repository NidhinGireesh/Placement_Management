import { useNavigate, NavLink, Outlet, Routes, Route, Navigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, Briefcase, Users, Calendar, FileText, CheckSquare, PlusCircle, Building } from 'lucide-react';

// Components
import RecruiterOverview from './RecruiterOverview';
import JobPostingForm from './JobPostingForm';
import ApplicationList from './ApplicationList';
import InterviewScheduling from './InterviewScheduling';
import RecruiterReports from './RecruiterReports';
import SelectionManagement from './SelectionManagement';
import CompanyProfile from './CompanyProfile';

export default function RecruiterDashboard() {
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
      end={to === "/recruiter"}
      className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
      style={({ isActive }) => ({
        textDecoration: 'none',
        color: isActive ? '#9333ea' : 'inherit',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0.75rem 1rem',
        backgroundColor: isActive ? 'rgba(147, 51, 234, 0.1)' : 'transparent',
        borderRight: isActive ? '4px solid #9333ea' : 'none'
      })}
    >
      <span style={{ marginRight: '0.75rem' }}>{icon}</span>
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
            background: 'linear-gradient(to right, #9333ea, #7c3aed)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            Recruiter Hub
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>Talent Acquisition</p>
        </div>

        <nav className="sidebar-nav">
          <SidebarItem to="/recruiter" icon={<LayoutDashboard size={20} />} label="Overview" />
          <SidebarItem to="/recruiter/profile" icon={<Building size={20} />} label="Company Profile" />
          <SidebarItem to="/recruiter/post-job" icon={<PlusCircle size={20} />} label="Post a Job" />
          <SidebarItem to="/recruiter/applications" icon={<Users size={20} />} label="Applications" />
          <SidebarItem to="/recruiter/interviews" icon={<Calendar size={20} />} label="Interviews" />
          <SidebarItem to="/recruiter/selection" icon={<CheckSquare size={20} />} label="Selection" />
          <SidebarItem to="/recruiter/reports" icon={<FileText size={20} />} label="Reports" />
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
          <Route index element={<RecruiterOverview />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="post-job" element={<JobPostingForm />} />
          <Route path="applications" element={<ApplicationList />} />
          <Route path="interviews" element={<InterviewScheduling />} />
          <Route path="selection" element={<SelectionManagement />} />
          <Route path="reports" element={<RecruiterReports />} />
          <Route path="*" element={<Navigate to="/recruiter" replace />} />
        </Routes>
      </main>
    </div>
  );
}