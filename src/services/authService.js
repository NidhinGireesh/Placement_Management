
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

export const registerUser = async (email, password, userData) => {
  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Determine approval status based on role
    // Students and Admins are auto-approved for now (or strictly Admin if you prefer)
    // Coordinators and Recruiters need approval
    let isApproved = false;
    if (userData.role === 'admin') isApproved = true;
    // Students, Coordinators and Recruiters need approval
    if (userData.role === 'student') isApproved = false;
    // Coordinators and Recruiters remain false by default

    // Create user document in Firestore
    await setDoc(doc(db, 'users', uid), {
      userId: uid,
      name: userData.name,
      email: email,
      phone: userData.phone || '',
      role: userData.role,
      approved: isApproved,
      createdAt: new Date(),
    });

    // If role is student or coordinator, create student profile
    if (userData.role === 'student' || userData.role === 'coordinator') {
      await addDoc(collection(db, 'students'), {
        userId: uid,
        registerNumber: userData.registerNumber || '',
        passoutYear: userData.passoutYear || '',
        branch: userData.branch || '',
        gender: userData.gender || '',
        dob: userData.dob || null,
        lateralEntry: userData.lateralEntry || 'no',
        cgpa: 0,
        skills: [],
        resumeUrl: '',
        coordinatorId: '',
        approvalStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // If role is recruiter, create company profile
    if (userData.role === 'recruiter') {
      await addDoc(collection(db, 'recruiters'), {
        userId: uid,
        companyName: userData.companyName || '',
        industry: userData.industry || '',
        website: userData.website || '',
        location: userData.location || '',
        description: userData.description || '',
        approvalStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return { uid, success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: error.message, success: false };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Get user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();

      if (!userData.approved) {
        await signOut(auth); // Sign out immediately if not approved
        return { success: false, error: 'Account pending approval. Please contact Admin.' };
      }

      return {
        uid,
        email: userData.email,
        role: userData.role,
        name: userData.name,
        success: true,
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { error: error.message, success: false };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { error: error.message, success: false };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Reset password error:', error);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { ...userDoc.data(), success: true };
    }
    return { success: false, error: 'User not found' };
  } catch (error) {
    console.error('Get user error:', error);
    return { error: error.message, success: false };
  }
};

export const setupAuthListener = (callback) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: userDoc.data()?.role,
          name: userDoc.data()?.name,
        });
      } else {
        // User authenticated but no document found (should not happen in normal flow, but handle it)
        console.error("User authenticated but no user document found");
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};
