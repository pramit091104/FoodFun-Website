// Authentication state management
import { auth, onAuthStateChanged, signOut } from './firebase-config.js';

// Function to check if user is logged in
export const checkAuthState = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(!!user);
    });
  });
};

// Function to get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Function to sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
};
