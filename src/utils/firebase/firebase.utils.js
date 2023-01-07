// In order to use firebase this entire section is required
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc, //retrieves the data
  getDoc, //access the data
  setDoc, //sets the data
} from "firebase/firestore";

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
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
  //prompt: "select_account",this means every time someone interacts
  //with our provider they will be forced to create an account
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
//export const db = getFirestore() allows us to tell firebase
//when we want to receive or get a document

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  //uid stands for unique id identifier

  const userSnapshot = await getDoc(userDocRef);

  //.exists Returns whether or not the data exists
  //false if it doesn't, true, if it does

  if (!userSnapshot.exists()) {
    //We check if the snapshot exists
    //If it doesn't then we set it up with the code below
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  //If we don't get an email or password then our function will not run
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  //If we don't get an email or password then our function will not run
  return await signInWithEmailAndPassword(auth, email, password);
};
