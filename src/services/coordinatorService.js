import { db, auth } from '../config/firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';

// Get current coordinator's profile (Branch & Year)
export const getCoordinatorProfile = async (uid) => {
    try {
        // Coordinators are stored in 'students' collection (reused schema)
        const q = query(collection(db, 'students'), where('userId', '==', uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return { success: true, profile: querySnapshot.docs[0].data() };
        }
        return { success: false, error: 'Coordinator profile not found' };
    } catch (error) {
        console.error('Error fetching coordinator profile:', error);
        return { success: false, error: error.message };
    }
};

// Get students belonging to specific Branch and Year
export const getClassStudents = async (branch, passoutYear) => {
    try {
        // 1. Get all profiles matching Branch & Year from 'students' collection
        const q = query(
            collection(db, 'students'),
            where('branch', '==', branch),
            where('passoutYear', '==', passoutYear)
        );
        const querySnapshot = await getDocs(q);

        const students = [];

        // 2. For each profile, fetch the User doc to get Name, Email, Role and Approval Status
        for (const studentDoc of querySnapshot.docs) {
            const studentData = studentDoc.data();

            // Fetch user doc
            const userDocRef = doc(db, 'users', studentData.userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();

                // Only include if role is 'student' (exclude other coordinators in same class)
                if (userData.role === 'student') {
                    students.push({
                        id: studentDoc.id, // Student Profile ID
                        userId: userData.userId,
                        name: userData.name,
                        email: userData.email,
                        approved: userData.approved,
                        ...studentData
                    });
                }
            }
        }

        return { success: true, students };
    } catch (error) {
        console.error('Error fetching class students:', error);
        return { success: false, error: error.message };
    }
};

// Approve a student
export const approveStudent = async (studentUserId) => {
    try {
        const userRef = doc(db, 'users', studentUserId);
        await updateDoc(userRef, {
            approved: true
        });

        // Optionally update status in 'students' collection too if needed for redundancy
        // const q = query(collection(db, 'students'), where('userId', '==', studentUserId));
        // const snapshot = await getDocs(q);
        // if (!snapshot.empty) {
        //    await updateDoc(doc(db, 'students', snapshot.docs[0].id), { approvalStatus: 'approved' });
        // }

        return { success: true };
    } catch (error) {
        console.error('Error approving student:', error);
        return { success: false, error: error.message };
    }
};
