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
    } = req.body;
    const idUsuario = idUserActual;
    const calificacionPregunta = req.body.calificacionPregunta || 0;
    const respuestaAlmacenada = req.body.respuestaAlmacenada || "";
    const curiosidadesPregunta = req.body.curiosidadesPregunta || "";
    const justificacion = req.body.justificacion || "";
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
    const respuestaNueva = req.body.respuesta || ""; // Asegúrate de pasar la respuesta en el cuerpo de la solicitud POST
    const idUsuario = obtenerIdUsuario();

    // Referencia al documento en Firestore
    // Referencia al documento en Firestore
    const usuarioRef = BD.firestoreDB.collection("usuarios");
    const asignaturasRef = BD.firestoreDB.collection("usuarios").doc(idUsuario).collection("asignaturasTomadas").doc(idAsignatura);
    const examenesRef = BD.firestoreDB.collection("usuarios").doc(idUsuario).collection("asignaturasTomadas").doc(idAsignatura).collection("examenesAsignatura");
    const preguntasRef = BD.firestoreDB.collection("usuarios").doc(idUsuario).collection("asignaturasTomadas").doc(idAsignatura).collection("examenesAsignatura").doc(idExamen).collection("preguntasExamen");

    // Actualizar el atributo "respuestaAlmacenada"
    await preguntasRef.doc(idPregunta).update({ respuestaAlmacenada: respuestaNueva });

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
    let evaluacion = req.body.evaluacion || 0;

    // Referencia al documento en Firestore
    const usuarioRef = BD.firestoreDB.collection("usuarios");
    const asignaturasRef = BD.firestoreDB.collection("usuarios").doc(idUsuario).collection("asignaturasTomadas").doc(idAsignatura);
    const examenesRef = BD.firestoreDB.collection("usuarios").doc(idUsuario).collection("asignaturasTomadas").doc(idAsignatura).collection("examenesAsignatura");
    const preguntasRef = BD.firestoreDB.collection("usuarios").doc(idUsuario).collection("asignaturasTomadas").doc(idAsignatura).collection("examenesAsignatura").doc(idExamen).collection("preguntasExamen");
    
    if (!req.body.evaluacion) {
      preguntasRef.doc(idPregunta).get()
      .then(async (preguntasnapshoot) => {
        const infoPregunta = preguntasnapshoot.data();
        // if (infoPregunta.respuestaAlmacenada == ''){
        //   evaluacion = 0;
        //   return res.json({ message: "No fue completada esta pregunta anteriormente"});
        // }
       
        const respuestaUsuario = infoPregunta.respuestaAlmacenada;
        // if
        console.log("preguntasnapshoot.data() : ", preguntasnapshoot.data())
        let correcta;
        if (infoPregunta.tipoPreguntaExamen.includes("vf")){
         correcta = infoPregunta.cuerpoPregunta.correcta;
      }else{
        for (let i = 0; i < infoPregunta.cuerpoPregunta.length; i++) {
          const esLaCorrecta = infoPregunta.cuerpoPregunta[i].correcta;
          if(esLaCorrecta){
            correcta = infoPregunta.cuerpoPregunta[i].idOpcion;
            break;
          }
        }
      }
      console.log("Respuesta correcta ",correcta);
      console.log("Respuesta almacenada ",respuestaUsuario);
      if (respuestaUsuario == correcta){
        evaluacion = 10;
      }else{
        evaluacion = 0;
      }
      await preguntasRef.doc(idPregunta).update({ calificacionPregunta: evaluacion });
      
      }).catch((error) => {
        console.error("Problemas iterando por campos de pregunta: ", error);
      })
    } else evaluacion = req.body.evaluacion;

    // Actualizar el atributo "calificacionPregunta"
    // await preguntasRef.doc(idPregunta).update({ calificacionPregunta: evaluacion });
    // console.log("evaluacion ", evaluacion)
    res.status(200).json({ mensaje: `La pregunta se evaluó correctamente, evaluacion en BD: ${preguntasRef.doc(idPregunta).calificacionPregunta}` });
  } catch (error) {
    console.error("Error al evaluar la pregunta:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
// export default addPreguntaExamen
const controllersPreg= {addPreguntaExamen , almacenarRespuestaPregunta , evaluarRespuestaPregunta};
export default controllersPreg;