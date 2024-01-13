import functions from "./functions.mjs";
import {BD} from "./firebase.js";
import { obtenerIdUsuario } from "./config.mjs";

const idUserActual = obtenerIdUsuario(); 


// Ruta POST para añadir una pregunta al examen
const addPreguntaExamen = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const {
      nombreAsignatura,
      nombreExamen,
      enunciadoPregunta,
      tipoPreguntaExamen,
      cuerpoPregunta,
      justificacion,
    } = req.body;
    const idUsuario = idUserActual;
    const calificacionPregunta = req.body.calificacionPregunta || 0;
    const respuestaAlmacenada = req.body.respuestaAlmacenada || "";
    const curiosidadesPregunta = req.body.curiosidadesPregunta || "";

    // Obtener la referencia al documento del examen
    const examenRef = await functions.getExamenRef(
      idUsuario,
      nombreAsignatura,
      nombreExamen
    );

    // Verificar si se encontró el examen
    if (!examenRef) {
      return res.status(404).json({ mensaje: "Examen no encontrado" });
    }

    // Generar un ID único para la pregunta
    const idPregunta = BD.firestoreDB.collection("preguntasExamen").doc().id;

    // Añadir la pregunta a la colección "preguntasExamen"
    await examenRef.collection("preguntasExamen").doc(idPregunta).set({
      idPregunta,
      enunciadoPregunta,
      calificacionPregunta,
      tipoPreguntaExamen,
      respuestaAlmacenada,
      cuerpoPregunta,
      justificacion,
    });

    // Respuesta exitosa
    res.status(200).json({ mensaje: "Pregunta añadida exitosamente" });
  } catch (error) {
    console.error("Error al añadir la pregunta:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Ruta para almacenar respuesta a pregunta de examen
const almacenarRespuestaPregunta = async (req, res) => {
  try {
    const { idAsignatura, idExamen, idPregunta } = req.body;
    const respuestaNueva = req.body.respuestaNueva || ""; // Asegúrate de pasar la respuesta en el cuerpo de la solicitud POST
    const idUsuario = idUserActual;

    // Referencia al documento en Firestore
    const usuarioRef = BD.firestoreDB.collection("usuarios").doc(idUsuario);
    const asignaturasRef = usuarioRef
      .collection("asignaturasTomadas")
      .doc(idAsignatura);
    const examenesRef = asignaturasRef
      .collection("examenesAsignaturas")
      .doc(idExamen);
    const preguntasRef = examenesRef
      .collection("preguntasExamen")
      .doc(idPregunta);

    // Actualizar el atributo "respuestaAlmacenada"
    await preguntasRef.update({ respuestaAlmacenada: respuestaNueva });

    res.status(200).json({ mensaje: `Respuesta almacenada exitosamente, el valor almacenado es: ${preguntasRef.respuestaAlmacenada}` });
  } catch (error) {
    console.error("Error al almacenar la respuesta de la pregunta:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Ruta para evaluar respuesta a pregunta de examen
const evaluarRespuestaPregunta = async (req, res) => {
  try {
    const { idAsignatura, idExamen, idPregunta } = req.body;
    const idUsuario = idUserActual;
    let evaluacion;

    // Referencia al documento en Firestore
    const usuarioRef = BD.firestoreDB.collection("usuarios").doc(idUsuario);
    const asignaturasRef = usuarioRef
      .collection("asignaturasTomadas")
      .doc(idAsignatura);
    const examenesRef = asignaturasRef
      .collection("examenesAsignaturas")
      .doc(idExamen);
    const preguntasRef = examenesRef
      .collection("preguntasExamen")
      .doc(idPregunta);
    if (!req.body.evaluacion) {
      for (const i in preguntasRef.cuerpoPregunta) {
        if (i.correcta && i.id == preguntasRef.respuestaAlmacenada) {
          evaluacion = 2;
        } else {
          evaluacion = 0;
        }
      }
    } else evaluacion = req.body.evaluacion;

    // Actualizar el atributo "calificacionPregunta"
    await preguntasRef.update({ calificacionPregunta: evaluacion });

    res.status(200).json({ mensaje: `La pregunta se evaluó correctamente, evaluacion en BD: ${preguntasRef.calificacionPregunta}` });
  } catch (error) {
    console.error("Error al evaluar la pregunta:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
// export default addPreguntaExamen
const controllersPreg= {addPreguntaExamen , almacenarRespuestaPregunta , evaluarRespuestaPregunta};
export default controllersPreg;