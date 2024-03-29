import { PORT } from "./config.mjs";
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

export async function evaluarRespuestaPregunta(idAsignatura, idExamen, idPregunta, evaluacion){
  try {
    const respu = await fetch(`http://127.0.0.1:${PORT}/evaluarRespuestaPregunta`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ idAsignatura, idExamen, idPregunta, evaluacion })
    });
    const data = await respu.json();
    // console.log("Respuesta de la operacion: ", data);
  } catch (error) {
    console.error("Error al intentar llamar a evaluar pregunta de prueba.");
  }
}


export async function intercambiarCases( cadena , toSnakeCase){

    // Eliminar espacios en blanco al principio y al final
    const cadenaSinEspacios = cadena.trim();
    
    let cadenaProcesada = "";
    if(toSnakeCase){
    // Sustituir espacios en blanco por "_"
    cadenaProcesada = cadenaSinEspacios.replace(/\s+/g, '_');
    }else{
      cadenaProcesada = cadenaSinEspacios.replace(/_/g, ' ');
    }
     return cadenaProcesada;
  }


// const funtions = {desordenarArreglo , getAsignaturaRef , getExamenRef , obtenerHoraActualFormateada , eliminarSubcadena , obtenerBDaPartirReferencia};
// export default funtions

export default {desordenarArreglo , getAsignaturaRef , getExamenRef , obtenerHoraActualFormateada , eliminarSubcadena , obtenerBDaPartirReferencia, evaluarRespuestaPregunta , intercambiarCases}


