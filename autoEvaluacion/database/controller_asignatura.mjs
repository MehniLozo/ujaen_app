import { actualizarIdUsuario, obtenerIdUsuario , variablesReferencias} from "./config.mjs";
import {BD} from "./firebase.js";
import { getAsignaturaRef, intercambiarCases } from "./functions.mjs";

const idUserActual = obtenerIdUsuario(); 



// Ruta para agregar una asignatura al listado de asignaturasTomadas
const agregarAsignatura = async (req, res) => {
  try {
    const idUsuario = obtenerIdUsuario();
    const { nombreAsignatura, descripcion, creditos } = req.body;

    // Obtener la referencia a la colección 'asignaturasTomadas' del usuario
    const asignaturasCollectionRef = BD.firestoreDB
      .collection("usuarios")
      .doc(idUsuario)
      .collection("asignaturasTomadas");

    console.log({ nombreAsignatura, descripcion, creditos });
    // Generar un ID único para la nueva asignatura
    const idAsignatura = asignaturasCollectionRef.doc().id;

    // Crear un objeto de asignatura
    const nuevaAsignatura = {
      idAsignatura,
      nombreAsignatura,
      descripcion,
      creditos,
    };

    // Agregar la nueva asignatura a la colección 'asignaturasTomadas'
    await asignaturasCollectionRef.doc(idAsignatura).set(nuevaAsignatura);
    

    // Enviar una respuesta exitosa al cliente
    res.json({ success: true, message: "Asignatura agregada con éxito." , asignatura: nuevaAsignatura});
  } catch (error) {
    console.error("Error al agregar la asignatura:", error);
    res
      .status(500)
      .json({ success: false, error: "Error al agregar la asignatura." });
  }
};

// Ruta para obtener las asignaturas de un usuario
const obtenerAsignaturasUsuario = async (req, res) => {
  try {
    
    const idUsuario = obtenerIdUsuario();
    console.log("idUser al entrar: ", idUsuario)
      
    if(BD.firestoreDB.collection("usuarios").doc(idUsuario).size){
      return res.json({message: "El usuario no existe"});
    }

    // Obtener la colección 'asignaturasTomadas' del usuario
    const asignaturasCollectionRef = BD.firestoreDB
      .collection("usuarios")
      .doc(idUsuario)
      .collection("asignaturasTomadas");
    
    // Obtener los documentos de la colección 'asignaturasTomadas'
    const asignaturasSnapshot = await asignaturasCollectionRef.get();

    // Crear una lista de asignaturas a partir de los documentos
    const asignaturasList = [];
    asignaturasSnapshot.forEach((asignaturaDoc) => {
      // Obtener los atributos de la asignatura del documento
      const { nombreAsignatura, descripcion, creditos } = asignaturaDoc.data();

      // Crear un objeto de asignatura y agregarlo a la lista
      const asignatura = {
        idAsignatura: asignaturaDoc.id,
        nombreAsignatura,
        descripcion,
        creditos,
      };
      asignaturasList.push(asignatura);
    });

    // Enviar la lista de asignaturas al cliente
    res.json({ success: true, asignaturas: asignaturasList });
  } catch (error) {
    console.error("Error al obtener las asignaturas del usuario:", error);
    if(error.message == "El usuario no existe"){
      res.status(500).json({
        success: false,
        error: "error.message",}
      )
    }else{
      res.status(500).json({
        success: false,
        error: "Error al obtener las asignaturas del usuario.",}
      )};
  }
};

// Ruta GET para obtener todas las evaluaciones de una asignatura
const obtenerEvaluacionesAsignatura = async (req, res) => {
  try {
    console.log("Entrando a buscar los examenes")
   // Aqui cambiamos el nombre de la asignatura de snake_case a normal 
    const  nombreAsignatura  = await intercambiarCases(req.params.nombreAsignatura, false);
    console.log(req.params.nombreAsignatura, nombreAsignatura)

    const idUsuario = obtenerIdUsuario();

    // Obtener la referencia al documento de la asignatura
    const asignaturaRef = await getAsignaturaRef(idUsuario, nombreAsignatura);

    // Verificar si se encontró la asignatura
    if (!asignaturaRef) {
      return res.status(404).json({ mensaje: "Asignatura no encontrada" });
    }

    // Obtener todas las evaluaciones de la asignatura
    const evaluacionesSnapshot = await asignaturaRef
      .collection("examenesAsignatura")
      .get();
    variablesReferencias.actualizarReferencia("examenes" , asignaturaRef.collection("examenesAsignaturas"));
      
    // Mapear los datos de las evaluaciones con preguntas anidadas
    const evaluacionesConPreguntas = evaluacionesSnapshot.docs.map(
      async (doc) => {
        const examenData = doc.data();

        // Obtener preguntas del examen
        const preguntasSnapshot = await doc.ref
          .collection("preguntasExamen")
          .get();
        const preguntas = preguntasSnapshot.docs.map((preguntaDoc) =>
          preguntaDoc.data()
        );

        // Añadir preguntas al objeto del examen
        examenData.preguntasExamen = preguntas;

        return examenData;
      }
    );
              //  SI NO FUNCIONA INTENTAR CON LA FUNCION obtenerDBaPARTIRrEF
    // Esperar a que se completen todas las promesas de obtener preguntas
    const evaluacionesConPreguntasResueltas = await Promise.all(
      evaluacionesConPreguntas
    );

    // Respuesta exitosa con los datos de las evaluaciones
    res.status(200).json({message: "Obtenidas las evaluaciones" , evaluacionesConPreguntasResueltas});
  } catch (error) {
    console.error("Error al obtener las evaluaciones:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Ruta para eliminar un documento y sus subdocumentos
const eliminarAsignatura = async (req, res) => {
  const idAsignatura = req.params.idAsignatura;
const idUsuario = obtenerIdUsuario();
console.log(idUsuario, idAsignatura)  
try {
    
  const asignaturaDocRef = BD.firestoreDB.collection("usuarios").doc(idUsuario).collection("asignaturasTomadas").doc(idAsignatura);
  const subcoleccionesSnapshot = await asignaturaDocRef.listCollections();
  console.log(subcoleccionesSnapshot)
    
  const promesasEliminarSubcolecciones = subcoleccionesSnapshot.map(async (subcoleccionRef) => {
      const documentosSubcoleccion = await subcoleccionRef.listDocuments();
      const promesasEliminarDocumentos = documentosSubcoleccion.map(async (docRef) => {
        await docRef.delete();
      });
      await Promise.all(promesasEliminarDocumentos);
    });


    await Promise.all(promesasEliminarSubcolecciones);
    await BD.firestoreDB.collection("usuarios").doc(idUsuario).collection("asignaturasTomadas").doc(idAsignatura).delete();

    res.status(200).send('Documento y subdocumentos eliminados correctamente.');
  } catch (error) {
    console.error('Error al eliminar documento y subdocumentos:', error);
    res.status(500).send('Error interno del servidor.');
  }
};

const controllersAsig = {agregarAsignatura , obtenerAsignaturasUsuario , obtenerEvaluacionesAsignatura , eliminarAsignatura , idUserActual};
export default controllersAsig;