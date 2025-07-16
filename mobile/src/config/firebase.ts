import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ❗️NEVER put real keys in source control
const firebaseConfig = {
  apiKey:            process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain:        'forescoredev.firebaseapp.com',
  projectId:         'forescoredev',
  storageBucket:     'forescoredev.appspot.com',
  messagingSenderId: process.env.EXPO_PUBLIC_FB_SENDER_ID,
  appId:             process.env.EXPO_PUBLIC_FB_APP_ID,
};

const app  = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// 👇 This single line switches Firestore to long-polling
const db   = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });

const store = getStorage(app);

export { app, auth, db, store };