import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase konfigürasyonu
// Firebase Console'dan (https://console.firebase.google.com/) proje oluşturup bu bilgileri buraya ekleyin
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Authentication ve Firestore servislerini al
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
