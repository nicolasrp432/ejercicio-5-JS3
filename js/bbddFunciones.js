
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
  const db = firebase.firestore();
  const collectionRef = db.collection("productos");
  //const collectionRef = firebase.firestore().collection("productos"); // Replace "your_collection_name" with the actual name of your collection

  const documentRef = collectionRef.doc(documentId);
  
  try {

    // 2. Update the "stock" field

    await documentRef.update({

      stock: newStockValue,

    });

    
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