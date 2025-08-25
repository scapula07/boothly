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
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const userApi = {
  createEvent: async function (
    userId: string,
    data: { templateId: string; eventName: string }
  ) {
    try {
      const eventRef = collection(db, "events");
      const newEvent = {
        ...data,
        creatorId: userId,
        createdAt: new Date().toISOString(),
      };
      const docRef = await addDoc(eventRef, newEvent);
      return {
        success: true,
        id: docRef.id,
        message: "Event created successfully!",
      };
    } catch (error) {
      console.error("Error creating event:", error);
      return {
        success: false,
        message: "Failed to create event. Please try again.",
      };
    }
  },
  getUserEvents: async function (userId: string) {
     console.log(userId, 'userId....');
    try {
      const eventRef = collection(db, "events");
      const q = query(
        eventRef,
        // where("creatorId", "==", userId),
        // orderBy("createdAt", "desc")
      );
      console.log(q, 'query....');
      const querySnapshot = await getDocs(q);
      const events = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return {
        success: true,
        events,
      };
    } catch (error) {
      console.error("Error fetching user events:", error);
      return {
        success: false,
        message: "Failed to fetch events. Please try again.",
      };
    }
  },
  deleteEvent: async function (eventId: string) {
    try {
      const eventRef = doc(db, "events", eventId);
      await deleteDoc(eventRef);
      return {
        success: true,
        message: "Event deleted successfully!",
      };
    } catch (error) {
      console.error("Error deleting event:", error);
      return {
        success: false,
        message: "Failed to delete event. Please try again.",
      };
    }
  },
};