import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  User 
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const registerUser = async (name: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Update profile with user's name
  await updateProfile(user, { displayName: name });
  
  // Store additional user data in Firestore
  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
    createdAt: new Date().toISOString(),
  });
  
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};