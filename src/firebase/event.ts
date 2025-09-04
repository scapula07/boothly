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

interface EventData {
  id: string;
  eventName: string;
  templateId: string;
  recordings?: string[];
  status?: string;
  creatorId: string;
  createdAt: string;
  updatedAt?: string;
  settings?: Record<string, any>;
  customFields?: Record<string, any>;
  [key: string]: any;
}

export const userApi = {
  getEventById: async function(eventId: string): Promise<EventData | null> {
    try {
      const eventRef = doc(db, "events", eventId);
      const eventDoc = await getDoc(eventRef);
      
      if (!eventDoc.exists()) {
        return null;
      }

      return {
        id: eventDoc.id,
        ...eventDoc.data()
      } as EventData;
    } catch (error) {
      console.error("Error fetching event:", error);
      return null;
    }
  },

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

  updateEvent: async function (
    eventId: string,
    updateData: {
      templateId?: string;
      eventName?: string;
      recordings?: string[];
      status?: string;
      settings?: Record<string, any>;
      customFields?: Record<string, any>;
      [key: string]: any;
    }
  ) {
    try {
      const eventRef = doc(db, "events", eventId);
      
      // First check if event exists
      const eventDoc = await getDoc(eventRef);
      if (!eventDoc.exists()) {
        return {
          success: false,
          message: "Event not found",
        };
      }

      // Add metadata to update
      const dataToUpdate = {
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      await updateDoc(eventRef, dataToUpdate);

      return {
        success: true,
        message: "Event updated successfully!",
        updatedFields: Object.keys(updateData),
      };
    } catch (error) {
      console.error("Error updating event:", error);
      return {
        success: false,
        message: "Failed to update event. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};