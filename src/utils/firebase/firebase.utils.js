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
//export const db = getFirestore() allows us to tell firebase
//when we want to receive or get a document

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //.exists Returns whether or not the data exists
  //false if it doesn't, true, if it does

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
