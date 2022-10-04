// In order to use firebase this entire section is required
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1TnN3s6WvbQSjeYubG8sqNRSoryPEdFc",
  authDomain: "crwn-clothing-db-426a4.firebaseapp.com",
  projectId: "crwn-clothing-db-426a4",
  storageBucket: "crwn-clothing-db-426a4.appspot.com",
  messagingSenderId: "905082853334",
  appId: "1:905082853334:web:b1f9b433547c400cad3677",
};
// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
//In order to use GoogleAuthProvider we need
//to initialize a provider using this code below
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
  //prompt: "select_account",this means every time someone interacts
  //with our provider they will be forced to create an account
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());
};
