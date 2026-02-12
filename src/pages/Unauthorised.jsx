import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h1 style={{ color: '#EF4444', marginBottom: '1rem' }}>Access Denied</h1>
            <p style={{ marginBottom: '2rem', color: '#4B5563' }}>
                You do not have permission to view this page.
            </p>
            <Link to="/" style={{ color: '#2563EB', textDecoration: 'underline' }}>
                Return to Home
            </Link>
        </div>
    );
};

export default Unauthorized;
