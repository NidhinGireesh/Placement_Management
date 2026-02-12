
import { db } from '../config/firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const COLLECTION_NAME = 'jobs';

export const getOpenJobs = async () => {
    try {
        // Assuming jobs have a 'status' field and 'deadline'
        // For now, just fetching all jobs, later can filter by status 'open' or deadline
        const q = query(
            collection(db, COLLECTION_NAME),
            // where('status', '==', 'open'), // Uncomment when job structure is confirmed
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        const jobs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return { success: true, jobs };
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return { success: false, error: error.message };
    }
};

export const getJobById = async (jobId) => {
    // Implement if needed for detailed view
};
