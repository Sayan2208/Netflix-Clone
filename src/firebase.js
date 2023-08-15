import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6j6JxFLPPny_6-nFFf32efceNBuv_W6I",
  authDomain: "netflix-clone-b51f8.firebaseapp.com",
  projectId: "netflix-clone-b51f8",
  storageBucket: "netflix-clone-b51f8.appspot.com",
  messagingSenderId: "1012209392698",
  appId: "1:1012209392698:web:a33c2d15a3310b68b0a903",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

export {auth}
export default db;

