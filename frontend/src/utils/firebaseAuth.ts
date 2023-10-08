import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "paradiseestate-e32c5.firebaseapp.com",
  projectId: "paradiseestate-e32c5",
  storageBucket: "paradiseestate-e32c5.appspot.com",
  messagingSenderId: "931942073760",
  appId: "1:931942073760:web:1d4a50a3db777d7d5dd0c5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);