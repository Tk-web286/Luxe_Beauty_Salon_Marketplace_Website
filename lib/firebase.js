import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Firebase credentials from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check if credentials are valid (at least apiKey and projectId should be present)
const isFirebaseConfigValid = 
  firebaseConfig.apiKey && 
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== "YOUR_API_KEY";

let db = null;
let useMock = true;

if (isFirebaseConfigValid) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    useMock = false;
    console.log("Firebase Firestore initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Firebase, falling back to mock database:", error);
  }
} else {
  console.log("Firebase environment variables not set. Running in Mock Database mode.");
}

/**
 * Saves a booking request either to Firestore or to localStorage as a fallback.
 * @param {Object} bookingData - Form details from client
 */
export async function saveBookingRequest(bookingData) {
  const timestampedData = {
    ...bookingData,
    createdAt: new Date().toISOString()
  };

  if (useMock) {
    // Simulate database write delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Save to local storage for local testing convenience
    const localBookings = JSON.parse(localStorage.getItem("luxe_bookings") || "[]");
    localBookings.push(timestampedData);
    localStorage.setItem("luxe_bookings", JSON.stringify(localBookings));
    
    console.log("Mock Database Write Success. Booking data saved to LocalStorage:", timestampedData);
    return { success: true, id: `mock-bk-${Math.random().toString(36).substr(2, 9)}` };
  } else {
    // Write to real Firestore
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        ...bookingData,
        createdAt: serverTimestamp()
      });
      console.log("Firestore Write Success. Document written with ID: ", docRef.id);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error writing document to Firestore: ", error);
      throw error;
    }
  }
}
