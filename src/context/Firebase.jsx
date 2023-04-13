// Import the functions you need from the SDKs you need
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signOut, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
// import { getDatabase, set, ref } from "firebase/database";
import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, getFirestore, updateDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDxdaNGNlFUe-WbzoYUb4gxMzra8l8ByXc",
    authDomain: "testing-39040.firebaseapp.com",
    projectId: "testing-39040",
    storageBucket: "testing-39040.appspot.com",
    messagingSenderId: "418999471339",
    appId: "1:418999471339:web:88ebd77742db0cb18382ae",
    measurementId: "G-4YW10V8LJM",
    databaseURL: "https://testing-39040-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
// const db = getDatabase(app);
const database = getFirestore(app);
const storage = getStorage(app)
const googleProvider = new GoogleAuthProvider();
export const FireBaseContext = createContext(null);


export const FireBaseProvider = (props) => {

    // const putData = (key, data) => set(ref(db, key), data)
    // signup wih email

    const signupUserWithEmailAndPassword = (e, email, password) => {
        e.preventDefault()
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    // signin wih email

    const signInUserWithEmailAndPassword = (e, email, password) => {
        e.preventDefault()
        return signInWithEmailAndPassword(firebaseAuth, email, password)
    }


    // sign out

    const useLogOut = () => {
        return signOut(firebaseAuth)
    }

    // sign in with google 

    const userSignInWithGoogle = () => {
        return signInWithPopup(firebaseAuth, googleProvider)
    }


    const product = collection(database, "products")
    // get data 

    const getData = () => {
        return getDocs(product)
    }

    // add data
    const addData = (e, data) => {
        return addDoc(product, { ...data, userId: firebaseAuth?.currentUser.uid })
    }
    // delete data

    const DeteleData = (id) => {
        const pDoc = doc(product, id)
        return deleteDoc(pDoc)
    }

    // get by id

    const getByID = (id) => {
        const pDoc = doc(product, id)
        return getDoc(pDoc)
    }

    // update data

    const UpadateData = (id, data) => {
        const pDoc = doc(product, id)
        return updateDoc(pDoc, data)
    }

    // file upload

    const uploadFile = (file) => {
        if (!file) {
            console.log("No file!");
        } else {
            const storageRef = ref(storage, `products/${file.name}`);
            return uploadBytes(storageRef, file);
        }


    }



    return (
        <FireBaseContext.Provider value={{
            signupUserWithEmailAndPassword,
            //  putData,
            useLogOut, userSignInWithGoogle, signInUserWithEmailAndPassword, getData, addData, DeteleData, UpadateData, getByID, uploadFile
        }}>
            {props.children}
        </FireBaseContext.Provider>
    )
}