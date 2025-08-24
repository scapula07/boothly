import { auth, db } from "@/firebase/config";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  where,
  or,
  query,
  orderBy,
} from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"

export const userApi = {
  updateUserInfo: async function (userId: string, data: Record<string, any>) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, data);
      return { success: true, message: 'User information updated successfully!' };
    } catch (error) {
      console.error('Error updating user information:', error);
      return { success: false, message: 'Failed to update user information. Please try again.' };
    }
  }
}