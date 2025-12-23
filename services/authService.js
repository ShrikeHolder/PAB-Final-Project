// services/authService.js
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Register user dengan email dan password
 */
export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile dengan display name
    await updateProfile(userCredential.user, {
      displayName: displayName
    });

    // Simpan user data ke AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: displayName,
      createdAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName,
        createdAt: new Date().toISOString()
      }
    };
  } catch (error) {
    let errorMessage = 'Terjadi kesalahan saat registrasi';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email sudah terdaftar';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Format email tidak valid';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password terlalu lemah (minimal 6 karakter)';
        break;
      default:
        errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Login user dengan email dan password
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Simpan user data ke AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName
    }));
    
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName
      }
    };
  } catch (error) {
    let errorMessage = 'Terjadi kesalahan saat login';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Email tidak terdaftar';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Password salah';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Format email tidak valid';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Terlalu banyak percobaan login. Coba lagi nanti';
        break;
      default:
        errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('userData');
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Cek status auth user
 */
export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Get cached user data
 */
export const getCachedUser = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting cached user:', error);
    return null;
  }
};