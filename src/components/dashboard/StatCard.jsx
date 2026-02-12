import styles from './Dashboard.module.css';

const StatCard = ({ title, value, icon: Icon, color }) => {
    return (
        <div className={styles.statCard} style={{ borderTop: `4px solid ${color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: '#6b7280', fontWeight: 500, fontSize: '1rem' }}>{title}</h3>
                <div style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: `${color}20`, // 20% opacity 
                    color: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={20} />
                </div>
            </div>
            <p style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937' }}>{value}</p>
        </div>
    );
};

export default StatCard;
