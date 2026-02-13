import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  MoveRight, Users, Building2, Briefcase, TrendingUp, Calendar,
  CheckCircle2, FileText, Bell, Phone, Mail, MapPin, ChevronDown, ChevronUp,
  PlayCircle, Award, BarChart3, UserCheck, Search, Filter, MessageSquare
} from 'lucide-react';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();
  const { user, role } = useAuthStore();
  const [activeTab, setActiveTab] = useState('student');
  const [openFaq, setOpenFaq] = useState(null);

  // Animated Stats
  const [counts, setCounts] = useState({ placed: 0, companies: 0, highest: 0, average: 0 });

  useEffect(() => {
    // Simple count-up animation simulation
    const interval = setInterval(() => {
      setCounts(prev => ({
        placed: Math.min(prev.placed + 5, 850),
        companies: Math.min(prev.companies + 1, 120),
        highest: Math.min(prev.highest + 0.5, 45),
        average: Math.min(prev.average + 0.1, 8.5)
      }));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={styles.pageContainer}>
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Your Campus &rarr; Your Career <br />
              <span className={styles.highlight} style={{ color: '#93c5fd' }}>One Platform</span>
            </h1>
            <p className={styles.heroSubtitle}>
              The complete solution for managing placements, applications, and hiring.
              Connecting talent with opportunity.
            </p>
            <div className={styles.ctaGroup}>
              {user ? (
                <button onClick={() => navigate(`/${role}`)} className={`${styles.btn} ${styles.btnPrimary}`}>
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button onClick={() => navigate('/login')} className={`${styles.btn} ${styles.btnPrimary}`}>
                    Student Login
                  </button>
                  <button onClick={() => navigate('/register')} className={`${styles.btn} ${styles.btnSecondary}`}>
                    Recruiter Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Placement Highlights */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{counts.placed}+</span>
              <span className={styles.statLabel}>Students Placed</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{counts.companies}+</span>
              <span className={styles.statLabel}>Companies Visited</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>₹{counts.highest.toFixed(1)} LPA</span>
              <span className={styles.statLabel}>Highest Package</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>₹{counts.average.toFixed(1)} LPA</span>
              <span className={styles.statLabel}>Average Package</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Top Recruiters (Infinite Scroll) */}
      <section className={styles.recruitersSection}>
        <div className={styles.container} style={{ padding: '2rem 1rem' }}>
          <h2 className={styles.sectionTitle} style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Our Top Partners</h2>
        </div>
        <div className={styles.scrollContainer}>
          <div className={styles.scrollTrack}>
            {/* Placeholder Logos */}
            {[...Array(10)].map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '1.5rem', color: '#cbd5e1' }}>
                <Building2 size={32} style={{ marginRight: '0.5rem' }} /> COMPANY {i + 1}
              </div>
            ))}
            {[...Array(10)].map((_, i) => (
              <div key={`dup-${i}`} style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '1.5rem', color: '#cbd5e1' }}>
                <Building2 size={32} style={{ marginRight: '0.5rem' }} /> COMPANY {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className={styles.section} style={{ backgroundColor: '#f8fafc' }}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>How It Works</h2>

          <div className={styles.roleToggle}>
            <button
              className={`${styles.toggleBtn} ${activeTab === 'student' ? styles.active : ''}`}
              onClick={() => setActiveTab('student')}
            >
              For Students
            </button>
            <button
              className={`${styles.toggleBtn} ${activeTab === 'recruiter' ? styles.active : ''}`}
              onClick={() => setActiveTab('recruiter')}
            >
              For Recruiters
            </button>
          </div>

          <div className={styles.stepsGrid}>
            {activeTab === 'student' ? (
              <>
                <StepCard icon={<UserCheck />} title="Register Profile" desc="Create your profile with resume and academic details." />
                <StepCard icon={<Filter />} title="Get Shortlisted" desc="Automatically checking eligibility for various companies." />
                <StepCard icon={<Calendar />} title="Attend Tests" desc="Participate in aptitude tests and interviews." />
                <StepCard icon={<Award />} title="Get Placed" desc="Receive offer letters and start your career journey." />
              </>
            ) : (
              <>
                <StepCard icon={<Building2 />} title="Post Job" desc="Create job openings with required criteria." />
                <StepCard icon={<Search />} title="Filter Candidates" desc="Access database of eligible students instantly." />
                <StepCard icon={<MessageSquare />} title="Interview" desc="Schedule and conduct interviews seamlessly." />
                <StepCard icon={<CheckCircle2 />} title="Hire" desc="Finalize candidates and roll out offers." />
              </>
            )}
          </div>
        </div>
      </section>

      {/* 5. Upcoming Drives */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Upcoming Drives</h2>
          <div className={styles.drivesGrid}>
            <DriveCard company="Infosys" role="System Engineer" deadline="Feb 18" branches={['CSE', 'ECE']} />
            <DriveCard company="TCS" role="Digital Innovator" deadline="Feb 20" branches={['All Branches']} />
            <DriveCard company="Accenture" role="App Developer" deadline="Feb 25" branches={['CSE', 'IT']} />
          </div>
        </div>
      </section>

      {/* 6. Success Stories */}
      <section className={styles.section} style={{ background: '#1e293b', color: 'white' }}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle} style={{ color: 'white' }}>Success Stories</h2>
          <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <Testimonial
              quote="The portal made applying to companies simple and stress-free. I got placed in my dream company!"
              author="Rahul Kumar"
              role="Placed in Google, 2025"
            />
            <Testimonial
              quote="Shortlisting candidates became so much faster. The automated eligibility check is a game changer."
              author="Priya Singh"
              role="HR Manager, TechCorp"
            />
          </div>
        </div>
      </section>

      {/* 7. Department-wise Placement Chart */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Placement Statistics 2025</h2>
          <div className={styles.chartContainer}>
            <ChartBar label="CSE" percent={92} />
            <ChartBar label="ECE" percent={81} />
            <ChartBar label="ME" percent={70} />
            <ChartBar label="IT" percent={88} />
            <ChartBar label="EEE" percent={75} />
          </div>
        </div>
      </section>

      {/* 8. Features */}
      <section className={styles.section} style={{ backgroundColor: '#f0f9ff' }}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
          <div className={styles.featuresGrid}>
            <Feature icon={<Filter />} title="Automated Filtering" desc="System auto-checks eligibility based on criteria." />
            <Feature icon={<FileText />} title="Resume Collection" desc="Centralized resume management for all students." />
            <Feature icon={<Calendar />} title="Interview Scheduling" desc="Effortless scheduling for multiple rounds." />
            <Feature icon={<Bell />} title="Real-time Alerts" desc="Instant notifications for new drives and results." />
            <Feature icon={<BarChart3 />} title="Analytics" desc="Detailed reports on placement performance." />
            <Feature icon={<Users />} title="Coordinator Access" desc="Faculty can monitor and approve student activities." />
          </div>
        </div>
      </section>

      {/* 9. Announcements (Marquee) */}
      <div className={styles.announcementBar}>
        <div className={styles.marquee}>
          📢 New Drive: Infosys Registration Open! | 🎓 Graduation Ceremony on March 15th | 🚀 Internship Opportunities at Amazon | 📝 Resume Workshop Tomorrow at 10 AM
        </div>
      </div>

      {/* 10. FAO Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <FaqItem
              question="Can backlog students apply?"
              answer="It depends on the company's eligibility criteria. Some companies allow 1 active backlog, while others require none."
              isOpen={openFaq === 0}
              onClick={() => toggleFaq(0)}
            />
            <FaqItem
              question="How do I reset my password?"
              answer="Go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email."
              isOpen={openFaq === 1}
              onClick={() => toggleFaq(1)}
            />
            <FaqItem
              question="Who can register?"
              answer="Final year and pre-final year students with a valid college ID can register on the portal."
              isOpen={openFaq === 2}
              onClick={() => toggleFaq(2)}
            />
          </div>
        </div>
      </section>

      {/* 11 & 12. Contact & Footer */}
      <footer className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerCol}>
              <h4>Contact Placement Cell</h4>
              <div className={styles.contactInfo}>
                <p><Phone size={18} /> +91 98765 43210</p>
                <p><Mail size={18} /> placement@college.edu</p>
                <p><MapPin size={18} /> Admin Block, Room 101</p>
              </div>
            </div>
            <div className={styles.footerCol}>
              <h4>Quick Links</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#">Placement Policy</a></li>
                <li><a href="#">Brochure 2025</a></li>
                <li><a href="#">Recruiter Guide</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>For Companies</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#">Register</a></li>
                <li><a href="#">Post a Job</a></li>
                <li><a href="#">Past Recruiters</a></li>
              </ul>
            </div>
          </div>
          <div className={styles.copyright}>
            &copy; 2026 College Placement Management System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
const StepCard = ({ icon, title, desc }) => (
  <div className={styles.stepCard}>
    <div className={styles.stepIcon}>{icon}</div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ color: '#64748b' }}>{desc}</p>
  </div>
);

const DriveCard = ({ company, role, deadline, branches }) => (
  <div className={styles.driveCard}>
    <div className={styles.driveHeader}>
      <div>
        <h3 className={styles.companyName}>{company}</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{role}</p>
      </div>
      <span className={styles.deadlineBadge}>Due: {deadline}</span>
    </div>
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
      {branches.map(b => (
        <span key={b} style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px', color: '#475569' }}>
          {b}
        </span>
      ))}
    </div>
    <button className={styles.btn} style={{ width: '100%', marginTop: '1.5rem', background: '#2563eb', color: 'white', padding: '0.5rem' }}>
      View Details
    </button>
  </div>
);

const Testimonial = ({ quote, author, role }) => (
  <div className={styles.testimonialCard}>
    <p className={styles.quote}>"{quote}"</p>
    <div className={styles.author}>
      <div className={styles.authorAvatar}>{author.charAt(0)}</div>
      <div>
        <div style={{ fontWeight: 'bold' }}>{author}</div>
        <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{role}</div>
      </div>
    </div>
  </div>
);

const ChartBar = ({ label, percent }) => (
  <div className={styles.barGroup}>
    <div className={styles.bar} style={{ height: `${percent * 2}px` }}>
      <span className={styles.percentage}>{percent}%</span>
    </div>
    <div className={styles.label}>{label}</div>
  </div>
);

const Feature = ({ icon, title, desc }) => (
  <div className={styles.featureCard}>
    <div className={styles.featureIcon}>{icon}</div>
    <div>
      <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{desc}</p>
    </div>
  </div>
);

const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className={styles.faqItem}>
    <div className={styles.faqQuestion} onClick={onClick}>
      {question}
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </div>
    {isOpen && <div className={styles.faqAnswer}>{answer}</div>}
  </div>
);