import { db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

const COLLECTION_NAME = 'courses';

export const createCourse = async (courseData) => {
    try {
        await addDoc(collection(db, COLLECTION_NAME), {
            ...courseData,
            createdAt: new Date()
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating course:', error);
        return { success: false, error: error.message };
    }
};

export const getCourses = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const courses = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return { success: true, courses };
    } catch (error) {
        console.error('Error fetching courses:', error);
        return { success: false, error: error.message };
    }
};

export const deleteCourse = async (courseId) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, courseId));
        return { success: true };
    } catch (error) {
        console.error('Error deleting course:', error);
        return { success: false, error: error.message };
    }
};
