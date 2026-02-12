
import { db } from '../config/firebaseConfig';
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'applications';

export const applyToJob = async (studentId, jobId, jobTitle, companyName) => {
    try {
        // Check if already applied
        const q = query(
            collection(db, COLLECTION_NAME),
            where('studentId', '==', studentId),
            where('jobId', '==', jobId)
        );
        const existing = await getDocs(q);

        if (!existing.empty) {
            return { success: false, error: 'Already applied to this job' };
        }

        await addDoc(collection(db, COLLECTION_NAME), {
            studentId,
            jobId,
            jobTitle,
            companyName,
            status: 'applied',
            appliedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        console.error('Error applying to job:', error);
        return { success: false, error: error.message };
    }
};

export const getMyApplications = async (studentId) => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('studentId', '==', studentId),
            orderBy('appliedAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        const applications = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return { success: true, applications };
    } catch (error) {
        console.error('Error fetching applications:', error);
        return { success: false, error: error.message };
    }
};
