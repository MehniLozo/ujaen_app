import {BD} from "./firebase.js";


export const desordenarArreglo = (arr) => {
    // Función de comparación aleatoria para el método sort
    const comparadorAleatorio = () => Math.random() - 0.5;
  
    // Copia el arreglo original para no modificarlo directamente
    const copiaArr = [...arr];
  
    // Utiliza el método sort con la función de comparación aleatoria
    copiaArr.sort(comparadorAleatorio);
  
    return copiaArr;
  }

  // Función para obtener la hora actual del servidor
  export function obtenerHoraActualFormateada(){
    const fechaHoraActual = new Date();  
    const opcionesFormato = { hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZoneName: 'short' };
    const stringFechaHoraLocalPersonalizado = fechaHoraActual.toLocaleString('es-ES', opcionesFormato);
    return stringFechaHoraLocalPersonalizado;
  }
  
  // Función para obtener la referencia al documento del examen
  export  async function getExamenRef(idUsuario, nombreAsignatura, nombreExamen) {
    const asignaturasSnapshot = await BD.firestoreDB.collection('usuarios').doc(idUsuario)
      .collection('asignaturasTomadas').where('nombreAsignatura', '==', nombreAsignatura).get();
  
    if (asignaturasSnapshot.empty) {
      return null;
    }
    const asignaturaDoc = asignaturasSnapshot.docs[0].ref;
    const examenesSnapshot = await asignaturaDoc.collection('examenesAsignatura').where('nombreExamen', '==', nombreExamen).get();
    if (examenesSnapshot.empty) {
      return null;
    }
    return examenesSnapshot.docs[0].ref;
  }

  // Función para obtener la referencia al documento de la asignatura
export async function getAsignaturaRef(idUsuario, nombreAsignatura) {
    const asignaturasSnapshot = await BD.firestoreDB.collection('usuarios').doc(idUsuario)
      .collection('asignaturasTomadas').where('nombreAsignatura', '==', nombreAsignatura).get();
    if (asignaturasSnapshot.empty) {
      return null;
    }
    return asignaturasSnapshot.docs[0].ref;
  }

export async function eliminarSubcadena(cadena , subcadena){
  let cadenaResult = cadena.replace(new RegExp( subcadena, 'g'), '');
  return cadenaResult;
}

// Función recursiva para explorar colecciones anidadas en Firestore
export async function obtenerBDaPartirReferencia(docRef) {
  try {
    const documentSnapshot = await docRef.get();

    if (!documentSnapshot.exists) {
      return null; // El documento no existe
    }

    const data = documentSnapshot.data();
    const result = { attributes: data, collections: {} };

    // Itera sobre las colecciones anidadas
    for (const key in data) {
      if (data[key] instanceof admin.firestore.CollectionReference) {
        // Llama recursivamente para explorar la colección anidada
        result.collections[key] = await exploreFirestore(data[key]);
      }
    }

    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// const funtions = {desordenarArreglo , getAsignaturaRef , getExamenRef , obtenerHoraActualFormateada , eliminarSubcadena , obtenerBDaPartirReferencia};
// export default funtions

export default {desordenarArreglo , getAsignaturaRef , getExamenRef , obtenerHoraActualFormateada , eliminarSubcadena , obtenerBDaPartirReferencia}


