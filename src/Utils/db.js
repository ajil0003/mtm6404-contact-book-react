
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB6xt_6hNSjrVImxCmtzEY3rIjifWGuyhM",
  authDomain: "contact-book-b9f60.firebaseapp.com",
  projectId: "contact-book-b9f60",
  storageBucket: "contact-book-b9f60.firebasestorage.app",
  messagingSenderId: "836029311958",
  appId: "1:836029311958:web:57a2aebee6baf2989ad277"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

