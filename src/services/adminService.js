import { db } from '../config/firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where, getDoc } from 'firebase/firestore';

// Get users by role with extended details
// Get users by role with extended details
export const getUsersByRole = async (role) => {
    try {
        const q = query(collection(db, 'users'), where('role', '==', role));
        const querySnapshot = await getDocs(q);

        const users = [];
        for (const userDoc of querySnapshot.docs) {
            const userData = { id: userDoc.id, ...userDoc.data() };

            // Fetch additional details based on role
            if (role === 'coordinator' || role === 'student') {
                // Students and Coordinators are stored in 'students' collection
                const studentQuery = query(collection(db, 'students'), where('userId', '==', userData.userId));
                const studentSnapshot = await getDocs(studentQuery);
                if (!studentSnapshot.empty) {
                    const studentData = studentSnapshot.docs[0].data();
                    userData.branch = studentData.branch;
                    userData.passoutYear = studentData.passoutYear;
                    userData.registerNumber = studentData.registerNumber;
                    userData.cgpa = studentData.cgpa;
                    userData.approvalStatus = studentData.approvalStatus; // if needed
                }
            } else if (role === 'recruiter') {
                const recruiterQuery = query(collection(db, 'recruiters'), where('userId', '==', userData.userId));
                const recruiterSnapshot = await getDocs(recruiterQuery);
                if (!recruiterSnapshot.empty) {
                    const recruiterData = recruiterSnapshot.docs[0].data();
                    userData.companyName = recruiterData.companyName;
                    userData.industry = recruiterData.industry;
                    userData.location = recruiterData.location;
                    userData.website = recruiterData.website;
                }
            }

            users.push(userData);
        }

        return { success: true, users };
    } catch (error) {
        console.error(`Error getting ${role} users:`, error);
        return { success: false, error: error.message };
    }
};

// Get Dashboard Stats
export const getDashboardStats = async () => {
    try {
        const usersRef = collection(db, 'users');

        // This is not the most efficient for large datasets (use aggregation queries in production)
        // asking for counts directly
        const studentQuery = query(usersRef, where('role', '==', 'student'));
        const coordinatorQuery = query(usersRef, where('role', '==', 'coordinator'));
        const recruiterQuery = query(usersRef, where('role', '==', 'recruiter'));

        const [studentsSnap, coordinatorsSnap, recruitersSnap] = await Promise.all([
            getDocs(studentQuery),
            getDocs(coordinatorQuery),
            getDocs(recruiterQuery)
        ]);

        return {
            success: true,
            stats: {
                students: studentsSnap.size,
                coordinators: coordinatorsSnap.size,
                recruiters: recruitersSnap.size,
                alerts: 0 // Placeholder for now
            }
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return { success: false, error: error.message };
    }
};

// Toggle user approval status
export const toggleUserApproval = async (uid, currentStatus) => {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            approved: !currentStatus
        });
        return { success: true };
    } catch (error) {
        console.error('Error toggling approval:', error);
        return { success: false, error: error.message };
    }
};

// Approve user
export const approveUser = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            approved: true
        });
        return { success: true };
    } catch (error) {
        console.error('Error approving user:', error);
        return { success: false, error: error.message };
    }
};

// Block user (set approved to false)
export const blockUser = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            approved: false
        });
        return { success: true };
    } catch (error) {
        console.error('Error blocking user:', error);
        return { success: false, error: error.message };
    }
};

// Delete user (Note: This only deletes from Firestore, Auth user deletion requires Admin SDK or Cloud Functions)
export const deleteUserDoc = async (uid) => {
    try {
        await deleteDoc(doc(db, 'users', uid));

        // Also try to delete role-specific text
        // We would need to know the role or query other collections, 
        // but for now we focus on the main user record.

        return { success: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, error: error.message };
    }
};
