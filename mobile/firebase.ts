import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:        'PASTE-YOUR-KEY',
  authDomain:    'forescore-dev.firebaseapp.com',
  projectId:     'forescore-dev',
  storageBucket: 'forescore-dev.appspot.com',
  messagingSenderId: '…',
  appId: '…',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);