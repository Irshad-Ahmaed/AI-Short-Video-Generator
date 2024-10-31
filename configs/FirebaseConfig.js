import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: "ai-short-video-generator-84fe3.firebaseapp.com",
  projectId: "ai-short-video-generator-84fe3",
  storageBucket: "ai-short-video-generator-84fe3.appspot.com",
  messagingSenderId: "561346324790",
  appId: "1:561346324790:web:0d00496be6b32ce054eb97",
  measurementId: "G-P46QFKPHGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);