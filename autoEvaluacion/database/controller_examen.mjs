import {BD} from "./firebase.js";
import { PORT, obtenerIdUsuario } from "./config.mjs";
import functions, { evaluarRespuestaPregunta } from "./functions.mjs";
// import { EvaluarExamen } from "../APIs-handle.js";
const idUserActual = obtenerIdUsuario(); 

// Ruta POST para crear un examen
const crearExamen = async (req, res) => {
  
  try {
    console.log("ENTRANDO EN API CREAR EXAMEN")
    // Extraer datos del cuerpo de la solicitud
    let {
      nombreAsignatura,
      nombreExamen,
      temaExamen,
      tipoPreguntaExamen,
      calificacionExamen,
    } = req.body;
    const idUsuario = obtenerIdUsuario();
    calificacionExamen = req.body.calificacionExamen || 0; // Valor predeterminado
    const fecha = functions.obtenerHoraActualFormateada() || "6/03/2016";
    const estado = "Creada";
    const cantPreguntas = req.body.cantPreguntas || 5;

    // Obtener todos los documentos de la colección 'Asignatura'
    const asignaturasSnapshot = await BD.firestoreDB
      .collection("usuarios")
      .doc(idUsuario)
      .collection("asignaturasTomadas")
      .where("nombreAsignatura", "==", nombreAsignatura)
      .get();

    // Verificar si se encontró la asignatura
    if (asignaturasSnapshot.empty) {
      return res.status(404).json({ mensaje: "Asignatura no encontrada" });
    }

    // Obtener la referencia al documento de la asignatura
    const asignaturaDoc = asignaturasSnapshot.docs[0].ref;

    // Generar un ID único para el examen
    const idExamen = BD.firestoreDB
      .collection("examenesAsignatura")
      .doc().id;

    // Agregar el examen a la colección "examenesAsignatura"
    await asignaturaDoc.collection("examenesAsignatura").doc(idExamen).set({
      idExamen,
      nombreExamen,
      temaExamen,
      fecha,
      calificacionExamen,
      estado,
      // preguntasExamen: [] // Inicializar la colección de preguntas del examen
    });

    //  Generamos las 5 preguntas que llevará el examen

    await import("./openai.mjs")
      .then(async (openaiModule) => {
        // Accede a la función generarPregunta
        const { generarPregunta } = openaiModule;
        
        let i = 0;
        while (i < cantPreguntas) {
          console.log(`Intentando crear la pregunta número ${i+1} de tipo ${tipoPreguntaExamen} con api de openai`)
          let resultadoGeneracionAI = await generarPregunta(
            temaExamen,
            nombreAsignatura,
            tipoPreguntaExamen
          );
          let justificacion;
          let enunciadoPregunta;
          let respuestaOpenAI;
          let cuerpoPregunta;
          let atributosPregunta;
          if (tipoPreguntaExamen == "vf"){
            [ enunciadoPregunta, respuestaOpenAI, justificacion] = resultadoGeneracionAI;
            cuerpoPregunta = {correcta: ( respuestaOpenAI.includes("verdadera") ) ? true : false};
            atributosPregunta ={
              nombreAsignatura,
              nombreExamen,
              enunciadoPregunta,
              tipoPreguntaExamen,
              cuerpoPregunta,
              justificacion,
            };
          }else{
            [ enunciadoPregunta, respuestaOpenAI] = resultadoGeneracionAI;
            cuerpoPregunta = functions.desordenarArreglo(respuestaOpenAI);
            atributosPregunta ={
            nombreAsignatura,
            nombreExamen,
            enunciadoPregunta,
            tipoPreguntaExamen,
            cuerpoPregunta,
          };
          }

          console.log(enunciadoPregunta, respuestaOpenAI, justificacion)
          
          
          if(tipoPreguntaExamen == "vf"){atributosPregunta.justificacion = justificacion;}
          try {
            const response = await fetch(
              `http://127.0.0.1:${PORT}/addPreguntaExamen`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(atributosPregunta),
              }
            );
            const data = await response.json();

            console.log(
              "Respuesta de la ruta AÑADIR PREGUNTA en CREAR EXAMEN:",
              data
            );
          } catch (error) {
            console.error("Error en AÑADIR PREGUNTA en CREAR EXAMEN:", error);
          }
          i++;
        } // end while
      })
      .catch((error) => {
        console.error("Error al importar el módulo openai.mjs:", error);
      });

      //  obtenemos la estructura del examen para devolverla
      const asignaturasSnapshot2 = await BD.firestoreDB
      .collection("usuarios")
      .doc(idUsuario)
      .collection("asignaturasTomadas")
      .doc(idExamen)
      .get();

      const Examen = asignaturasSnapshot2.data();

    // Respuesta exitosa
    res.status(200).json({ mensaje: "Examen creado exitosamente" , Examen});
  } catch (error) {
    console.error("Error al crear el examen:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Ruta para evaluar examen segun las calificaciones de sus preguntas
const evaluarRespuestaExamen = async (req, res) => {
  try {
    const { idAsignatura, idExamen } = req.body;
    const idUsuario = obtenerIdUsuario();
    let evaluacion = req.body.evaluacion || false;

    // Referencia al documento en Firestore
    const usuarioRef = BD.firestoreDB.collection("usuarios");
    const asignaturaRef = BD.firestoreDB.collection("usuarios").doc(idUsuario).collection("asignaturasTomadas");
    const examenesRef = BD.firestoreDB.collection("usuarios").doc(idUsuario).collection("asignaturasTomadas").doc(idAsignatura).collection("examenesAsignatura");
    const preguntasExamenRef = BD.firestoreDB.collection("usuarios").doc(idUsuario).collection("asignaturasTomadas").doc(idAsignatura).collection("examenesAsignatura").doc(idExamen).collection("preguntasExamen");
    //  evaluarRespuestaPregunta(idAsignatura , idExamen , idPregunta );
    const examenColeccionSnapshot = await examenesRef.doc(idExamen)
      .collection("preguntasExamen")
      .get();
    const cantPreguntas = examenColeccionSnapshot.size;
    
    // if (cantPreguntas !== 5){
    //   return res.json({message: "No tiene las 5 preguntas esperadas este examen."});
    // }

    let sumaCalificaciones = 0;
    const querySnapshot = await preguntasExamenRef.get();

    // Iterar sobre los documentos de preguntasExamen con un bucle for...of
    for (const doc of querySnapshot.docs) {

      const idPregunta = doc.data().idPregunta;

      // Hacer un fetch POST a otra ruta para establecer el valor de "calificacionPregunta"
      await evaluarRespuestaPregunta(idAsignatura , idExamen , idPregunta );

      // Obtener la calificación de cada pregunta después de la actualización
      const calificacionPregunta = doc.data().calificacionPregunta;

      // Acumular la suma de calificaciones
      sumaCalificaciones += calificacionPregunta;
    }

    // Puedes hacer cualquier operación adicional con la suma de calificaciones aquí
    console.log('Calificacion del Examen:', sumaCalificaciones);

    // Responder con la suma de calificaciones
    res.json({ sumaCalificaciones });
  } catch (error) {
    console.error('Error en evaluarRespuestaExamen:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Ruta que hace dos solicitudes fetch POST a otra evaluar Examen
const evaluarRespuestaExamen2 = async (req, res) => {
  try {
    const { idAsignatura, idExamen } = req.body;

    // Hacer la primera solicitud fetch POST
    const respuesta1 = await fetch(`http://localhost:${PORT}/evaluarRespuestaExamen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idAsignatura, idExamen }),
    });

    if (!respuesta1.ok) {
      throw new Error('Error en la primera solicitud POST');
    }

    // Obtener datos de la primera respuesta (si es necesario)
    const datosRespuesta1 = await respuesta1.json();

    // Hacer la segunda solicitud fetch POST
    const respuesta2 = await fetch(`http://localhost:${PORT}/evaluarRespuestaExamen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idAsignatura, idExamen }),
    });

    if (!respuesta2.ok) {
      throw new Error('Error en la segunda solicitud POST');
    }

    // Obtener datos de la segunda respuesta (si es necesario)
    const datosRespuesta2 = await respuesta2.json();

    // Puedes hacer cualquier cosa con los datos de ambas respuestas
    const resultadoFinal = {
      respuesta2: datosRespuesta2,
    };

    res.json(resultadoFinal);
  } catch (error) {
    console.error('Error en la ruta /rutaEjemplo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Ruta para empezar el tiempo de examen
const iniciarPrueba = async (req, res) => {
  try {
    const { idExamen, idAsignatura, tiempoExamen } = req.body;
    const idUsuario = obtenerIdUsuario();

    if (!Number.isInteger(tiempoExamen) || tiempoExamen < 1)
      return res.json({message: "El tiempo en que se espera resolver el examen no es válido"});
        
    // Referencia al documento en Firestore
    const usuarioRef = BD.firestoreDB.collection("usuarios").doc(idUsuario);
    
    let estado = "";

    const CollectionRef = BD.firestoreDB
    .collection("usuarios")
    .doc(idUsuario)
    .collection("asignaturasTomadas")
    .doc(idAsignatura)
    .collection("examenesAsignatura")
    .doc(idExamen);

    CollectionRef.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      // El documento existe, obtén la variable "estado"
      estado = docSnapshot.data().estado;
      console.log('Valor de estado:', estado);
    } else {
      console.log('El documento no existe.');
    }
  })
  .catch((error) => {
    console.error('Error al obtener el documento:', error);
  });

    if (estado.includes("Creada")){
        return res.json({message: "Esta prueba ya no esta disponible porque el usuario la inició anteriormente"})
      }
          

    await CollectionRef.update({ estado: "En Curso" });

    // Iniciar el contador regresivo
    let contador = tiempoExamen;
    let intervalId = setInterval(async () => {
      console.log(`Cuenta regresiva: ${contador} segundos`);

      contador--;
      if (contador < 1){
        //  terminar la prueba

          CollectionRef.update({ estado: "Terminado" });
          
                  //   const respu = await fetch(
        //     `http://127.0.0.1:${PORT}/evaluarRespuestaExamen`,
        //     {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({ idAsignatura, idExamen }),
        //     }

        //  eliminar la cuenta regresiva
        clearInterval(intervalId);
      }

    }, tiempoExamen * 100);


    // intervalId = setTimeout(async () => {
    //   examenesRef.update({ estado: "Terminado" });
    //   const respu = await fetch(
    //     `http://127.0.0.1:${PORT}/evaluarRespuestaExamen`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ idAsignatura, idExamen }),
    //     }
    //   );

    //   // Puedes agregar aquí la lógica para mostrar una alerta en el servidor
    // }, tiempoExamen * 1000);



    res.status(200).json({ mensaje: "Prueba iniciada exitosamente" });
  } catch (error) {
    console.error("Error al iniciar la prueba:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};


const controllersExam = {crearExamen , evaluarRespuestaExamen , evaluarRespuestaExamen2 , iniciarPrueba};
export default controllersExam