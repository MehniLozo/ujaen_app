import { actualizarIdUsuario, obtenerIdUsuario , variablesReferencias} from "./config.mjs";
import {BD} from "./firebase.js";
import { getAsignaturaRef } from "./functions.mjs";

const idUserActual = obtenerIdUsuario(); 



// Ruta para agregar una asignatura al listado de asignaturasTomadas
const agregarAsignatura = async (req, res) => {
  try {
    const idUsuario = idUserActual;
    const { nombreAsignatura, descripcion, creditos } = req.body;

    // Obtener la referencia a la colección 'asignaturasTomadas' del usuario
    const asignaturasCollectionRef = BD.firestoreDB
      .collection("usuarios")
      .doc(idUsuario)
      .collection("asignaturasTomadas");

    variablesReferencias.actualizarReferencia("asignaturas" ,asignaturasCollectionRef)
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
    if(asignaturasCollectionRef) variablesReferencias.actualizarReferencia("asignaturas",asignaturasCollectionRef);

    // Enviar una respuesta exitosa al cliente
    res.json({ success: true, message: "Asignatura agregada con éxito." });
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
    variablesReferencias.actualizarReferencia("asignaturas" ,asignaturasCollectionRef);
      if(asignaturasCollectionRef) variablesReferencias.actualizarReferencia("asignaturas",asignaturasCollectionRef);

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
    
    const  nombreAsignatura  = req.params.nombreAsignatura;

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
const controllersAsig = {agregarAsignatura , obtenerAsignaturasUsuario , obtenerEvaluacionesAsignatura , idUserActual};
export default controllersAsig;