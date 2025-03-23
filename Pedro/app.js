// app.js

// Obtén una referencia a Firestore
const db = firebase.firestore();

// Obtén una referencia al documento
const docRef = db.collection("productos").doc("1");

// Lee el documento
docRef.get()
    .then((docSnap) => {
        if (docSnap.exists) {
            console.log("Data del documento:", docSnap.data());
        } else {
            console.log("¡No existe tal documento!");
        }
    })
    .catch((error) => {
        console.log("Error al obtener el documento:", error);
    });
