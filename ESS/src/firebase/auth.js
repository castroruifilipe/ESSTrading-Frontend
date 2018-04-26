import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
	auth.createUserWithEmailAndPassword(email, password);

// Email verification
export const sendEmailVerification = () =>
	auth.currentUser.sendEmailVerification();

// Email verified
export const emailVerified = () =>
	auth.currentUser.emailVerified;

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
	auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
	auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
	auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
	auth.currentUser.updatePassword(password);

// Update profile
export const currentUser = () => 
	auth.currentUser;
// Update Email
export const updateEmail = (email) =>
	auth.currentUser.updateEmail(email);