// app.js
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from './bbddConfing'; // Import the Firebase app instance

// Get a reference to Firestore
const db = getFirestore(app);

// Get a reference to the document
const docRef = doc(db, "productos", "1");

// Read the document
getDoc(docRef)
    .then((docSnap) => {
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    })
    .catch((error) => {
        console.log("Error getting document:", error);
    });
