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

export async function updateStockBBDD(documentId, newStockValue) {

  // 1. Get a reference to the document
  console.log('updateStockBBDD:'+documentId, newStockValue);
  const collectionRef = firebase.firestore().collection("productos"); // Replace "your_collection_name" with the actual name of your collection

  const documentRef = collectionRef.doc(documentId);
  console.log('updateStockBBDD:'+documentId, newStockValue);
  console.log(`documentRef: ${documentRef}`);
  
  try {

    // 2. Update the "stock" field

    await documentRef.update({

      stock: newStockValue,

    });

    console.log(`Document with ID ${documentId} successfully updated stock to ${newStockValue}`);

  } catch (error) {

    console.error("Error updating document: ", error);

  }

}


/**

 * Carga un array de objetos JSON en la colección "productos" en Firestore.

 * @param {array} productosArray Un array de objetos JSON que representan los productos.

 * @returns {Promise<void>} Una promesa que se resuelve cuando todos los documentos se han creado.

 */

export async function uploadJSONToFirestore(productosArray) {

  const db = firebase.firestore();

  const collectionRef = db.collection("productos");


  try {

    for (const producto of productosArray) {
      const id = producto.id; // Obtener el ID del producto

      //TODO: delete id, firebase generate it

      delete producto.id

      await collectionRef.doc(id.toString()).set(producto); // Usar doc(id).set()


    }

    console.log("Todos los documentos se han cargado correctamente.");

  } catch (error) {

    console.error("Error al cargar los documentos:", error);

  }

}
