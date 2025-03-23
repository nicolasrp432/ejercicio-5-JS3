export function primeraPrueba(){
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

}

export async function obtenerJsonCompleto(){
    const db = firebase.firestore();
    const collectionRef = db.collection("productos");
  
    try {
      const querySnapshot = await collectionRef.get();
      const data = [];
  
      querySnapshot.forEach((doc) => {  
        const product = doc.data()  
        product.id = doc.id  
        data.push(product); // Añade los datos del documento al array
  
      });
  
      return JSON.stringify(data);
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
      return null; // O puedes lanzar el error, dependiendo de cómo quieras manejarlo
    }

}    