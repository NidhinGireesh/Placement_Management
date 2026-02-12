
import { db, storage } from '../config/firebaseConfig';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const COLLECTION_NAME = 'students';

export const getStudentProfile = async (uid) => {
    try {
        const q = query(collection(db, COLLECTION_NAME), where('userId', '==', uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data();
            return { id: querySnapshot.docs[0].id, ...docData, success: true };
        } else {
            return { success: false, error: 'Student profile not found' };
        }
    } catch (error) {
        console.error('Error fetching student profile:', error);
        return { success: false, error: error.message };
    }
};

export const updateStudentProfile = async (docId, data) => {
    try {
        const studentRef = doc(db, COLLECTION_NAME, docId);
        await updateDoc(studentRef, {
            ...data,
            updatedAt: new Date()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating student profile:', error);
        return { success: false, error: error.message };
    }
};

export const uploadResume = async (file, uid) => {
    try {
        const storageRef = ref(storage, `resumes/${uid}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return { success: true, url: downloadURL };
    } catch (error) {
        console.error('Error uploading resume:', error);
        return { success: false, error: error.message };
    }
};

export const uploadProfilePhoto = async (file, uid) => {
    try {
        const storageRef = ref(storage, `profile_photos/${uid}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return { success: true, url: downloadURL };
    } catch (error) {
        console.error('Error uploading profile photo:', error);
        return { success: false, error: error.message };
    }
};
