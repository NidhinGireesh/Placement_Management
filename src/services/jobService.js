
import { db } from '../config/firebaseConfig';
import { collection, query, where, getDocs, orderBy, addDoc, deleteDoc, doc } from 'firebase/firestore';

const COLLECTION_NAME = 'jobs';

export const getOpenJobs = async () => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
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

export const createJob = async (jobData) => {
    try {
        await addDoc(collection(db, COLLECTION_NAME), {
            ...jobData,
            createdAt: new Date(),
            status: 'open' // Default status
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating job:', error);
        return { success: false, error: error.message };
    }
};

export const deleteJob = async (jobId) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, jobId));
        return { success: true };
    } catch (error) {
        console.error('Error deleting job:', error);
        return { success: false, error: error.message };
    }
};

export const getJobById = async (jobId) => {
    // Implement if needed for detailed view
};
