// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyDQqfTb4VnmRKqn1c_lzgYNqPcLz5vSVxY",
  authDomain: "tubespabfirman.firebaseapp.com",
  projectId: "tubespabfirman",
  storageBucket: "tubespabfirman.firebasestorage.app",
  messagingSenderId: "1019895273456",
  appId: "1:1019895273456:web:ffed9cacb190e2eb21af35",
  measurementId: "G-WQRZNGBCQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth dengan AsyncStorage untuk persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };