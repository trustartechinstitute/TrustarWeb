import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '@/firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// Use the specific databaseId from the config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Connectivity check as per instructions
async function testConnection() {
  try {
    // Attempting to fetch a dummy doc to verify connection
    await getDocFromServer(doc(db, 'system', 'connection-check'));
  } catch (error: any) {
    if (error.message && error.message.includes('the client is offline')) {
      console.warn("Firebase is currently offline or unreachable. Check your network.");
    }
  }
}
testConnection();
