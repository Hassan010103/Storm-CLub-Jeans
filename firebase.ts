import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ------------------------------------------------------------------
// FIREBASE INITIALIZATION (FIRESTORE DATABASE)
// ------------------------------------------------------------------
// This file wires your app to a real Firebase project.
// - In development, values come from `.env.local`
// - In production (Netlify / Vercel / Render, etc.), values come from
//   the hosting provider’s environment variables.
//
// 1. Go to `console.firebase.google.com`
// 2. Create a project and enable Firestore (in "Build" → "Firestore Database")
// 3. Add a Web App to get your config
// 4. Create `.env.local` in the project root (same folder as `package.json`)
// 5. Add these keys (example):
//
//    VITE_FIREBASE_API_KEY=your_api_key
//    VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
//    VITE_FIREBASE_PROJECT_ID=your_project_id
//    VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
//    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
//    VITE_FIREBASE_APP_ID=your_app_id
//
// 6. On your hosting provider, create the same variables in the dashboard.
// ------------------------------------------------------------------

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let db: ReturnType<typeof getFirestore> | null = null;

try {
  // Basic guard so we don't try to initialize with totally missing config
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error(
      'Missing Firebase config. Please set VITE_FIREBASE_* env vars (see firebase.ts).'
    );
  }

  const app =
    getApps().length > 0
      ? getApp()
      : initializeApp(firebaseConfig);

  db = getFirestore(app);
} catch (error) {
  console.error(
    'Firebase not initialized. Admin database features will be disabled until env vars are set.',
    error
  );
}

// Export only db, we don’t need storage in this project
export { db };