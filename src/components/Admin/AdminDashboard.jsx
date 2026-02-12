import { useNavigate, NavLink, Outlet, Routes, Route, Navigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, Users, UserCheck, Building, Briefcase, FileText, Settings, BookOpen } from 'lucide-react';

// Components
import AdminOverview from './AdminOverview';
import StudentManagement from './StudentManagement';
import CoordinatorManagement from './CoordinatorManagement';
import CompanyManagement from './CompanyManagement';
import JobManagement from './JobManagement';
import ReportAnalysis from './ReportAnalysis';
import CourseManagement from './CourseManagement';

export default function AdminDashboard() {
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
      end={to === "/admin"}
      className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
      style={({ isActive }) => ({
        textDecoration: 'none',
        color: isActive ? 'white' : '#9ca3af',
        backgroundColor: isActive ? '#1f2937' : 'transparent',
        borderRight: isActive ? '4px solid #ef4444' : 'none',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0.75rem 1rem'
      })}
    >
      <span style={{ marginRight: '0.75rem' }}>{icon}</span>
      <span style={{ fontWeight: 600 }}>{label}</span>
    </NavLink>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar" style={{ backgroundColor: '#111827', color: 'white' }}>
        <div className="sidebar-header" style={{ borderBottom: '1px solid #1f2937' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', letterSpacing: '0.05em' }}>
            ADMIN<span style={{ color: '#ef4444' }}>.</span>
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Control</p>
        </div>

        <nav className="sidebar-nav" style={{ marginTop: '1rem' }}>
          <SidebarItem to="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <SidebarItem to="/admin/students" icon={<Users size={20} />} label="Students" />
          <SidebarItem to="/admin/coordinators" icon={<UserCheck size={20} />} label="Coordinators" />
          <SidebarItem to="/admin/companies" icon={<Building size={20} />} label="Companies" />
          <SidebarItem to="/admin/jobs" icon={<Briefcase size={20} />} label="Job Postings" />
          <SidebarItem to="/admin/courses" icon={<BookOpen size={20} />} label="Courses & Depts" />
          <SidebarItem to="/admin/reports" icon={<FileText size={20} />} label="Reports & Analytics" />
        </nav>

        <div style={{ padding: '1.5rem', marginTop: 'auto', borderTop: '1px solid #1f2937' }}>
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
              transition: 'color 0.2s',
              width: '100%'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#ef4444'}
          >
            <span style={{ marginRight: '0.75rem' }}>🛑</span>
            <span>Logout System</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ backgroundColor: '#f9fafb' }}>
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="coordinators" element={<CoordinatorManagement />} />
          <Route path="companies" element={<CompanyManagement />} />
          <Route path="jobs" element={<JobManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="reports" element={<ReportAnalysis />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  );
}