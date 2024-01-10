const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();


// Configuración de Firebase Admin SDK
const serviceAccount = require('./uja-database-firebase-adminsdk-5irti-81b8ca89ac.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // También puedes agregar más configuraciones de Firebase aquí si es necesario
});


// Habilitar CORS
app.use(cors());
// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());
app.use(bodyParser.json());

const firestoreDB = admin.firestore();

let idUserActual = "";


// Ruta para el registro de usuarios
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Validar el formato del correo electrónico
  const emailRegex = /^[\w-]+(\.[\w-]+)*@(red\.uja\.es|red\.ujaen\.es)$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Correo electrónico no válido.' });
  }

  // Validar el formato de la contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        'Contraseña no válida. Debe contener al menos 8 caracteres con al menos una letra mayúscula, una letra minúscula, un número y un símbolo.',
    });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      return res.status(409).json({ error: 'El correo electrónico ya está en uso.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});


// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Verificar si ya hay un usuario autenticado
  const currentUser = req.currentUser;
  if (currentUser) {
    return res.status(400).json({ error: 'Ya hay un usuario autenticado.' });
  }

  try {
    // Obtener el registro de usuario
    const userRecord = await admin.auth().getUserByEmail(email);



    // Comparar la contraseña manualmente
    // Puedes usar una biblioteca como bcrypt para hacer esto más seguro en un entorno de producción
    // Aquí, simplemente estamos comparando las contraseñas en texto plano, lo cual no es seguro.
    if (password === userRecord.password) {
      res.status(200).json({ uid: userRecord.uid, message: 'Inicio de sesión exitoso.' });
    } else {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ error: 'Correo electrónico no registrado.' });
    }

    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si el usuario existe
    const userRecord = await firestoreDB.getUserByEmail(email);

    // Generar el enlace para restablecer la contraseña
    const resetLink = await admin.auth().generatePasswordResetLink(email);

    // Enviar el enlace al correo electrónico del usuario
    // Aquí puedes usar un servicio de envío de correos electrónicos como nodemailer
    // o la API de Firebase para enviar correos electrónicos

    // Enviar una respuesta exitosa al cliente
    res.json({ success: true, message: 'Correo de restablecimiento enviado con éxito.' });
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
    res.status(500).json({ success: false, error: 'Error al enviar el correo de restablecimiento de contraseña.' });
  }
});

// Ruta para registrar un usuario y sus asignaturas
app.post('/registrar-usuario', async (req, res) => {
  try {
    const { email, nombre, password, membresia, apodo, asignaturas } = req.body;

    // Generar un ID único para el usuario
    const idUsuario = admin.firestore().collection('usuarios').doc().id;

    // Hash de la contraseña (debes manejar esto de manera segura en un entorno de producción)
    // En un entorno de producción, considera usar herramientas como bcrypt para almacenar contraseñas de manera segura.
    // const hashedPassword = await hashPassword(password);

    // Crear el objeto de usuario
    const usuario = {
      idUsuario,
      email,
      nombre,
      password,
      membresia,
      apodo,
      // Puedes agregar más campos según sea necesario
    };

    // Agregar el usuario a la colección 'usuarios' en Firestore
    await admin.firestore().collection('usuarios').doc(idUsuario).set(usuario);

    // Agregar asignaturas como subcolección de 'asignaturas' en la colección del usuario
    // await admin.firestore().collection('usuarios').doc(idUsuario).collection('asignaturasTomadas').doc().set({});

    idUserActual = idUsuario;

    // Enviar una respuesta exitosa al cliente
    res.json({ success: true, message: 'Usuario y asignaturas registrados con éxito.' });
  } catch (error) {
    console.error('Error al registrar el usuario y las asignaturas:', error);
    res.status(500).json({ success: false, error: 'Error al registrar el usuario y las asignaturas.' });
  }
});

// Ruta para agregar una asignatura al listado de asignaturasTomadas
app.post('/agregarAsignatura/', async (req, res) => {
  try {
    const idUsuario = idUserActual;
    const { nombreAsignatura, descripcion, creditos } = req.body;

    // Obtener la referencia a la colección 'asignaturasTomadas' del usuario
    const asignaturasCollectionRef = admin.firestore().collection('usuarios').doc(idUsuario).collection('asignaturasTomadas');
    console.log({nombreAsignatura,descripcion,creditos});
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
    res.json({ success: true, message: 'Asignatura agregada con éxito.' });
  } catch (error) {
    console.error('Error al agregar la asignatura:', error);
    res.status(500).json({ success: false, error: 'Error al agregar la asignatura.' });
  }
});

// Ruta para obtener las asignaturas de un usuario
app.get('/obtenerAsignaturasUsuario', async (req, res) => {
  try {
    const idUsuario = idUserActual;

    // Obtener la colección 'asignaturasTomadas' del usuario
    const asignaturasCollectionRef = admin.firestore().collection('usuarios').doc(idUsuario).collection('asignaturasTomadas');

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
    console.error('Error al obtener las asignaturas del usuario:', error);
    res.status(500).json({ success: false, error: 'Error al obtener las asignaturas del usuario.' });
  }
});

// Ruta POST para crear un examen
app.post('/crearExamen', async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { nombreAsignatura, nombreExamen, fecha } = req.body;
    const idUsuario = idUserActual;
    const calificacionExamen = req.body.calificacionExamen || 0; // Valor predeterminado

    // Obtener todos los documentos de la colección 'Asignatura'
    const asignaturasSnapshot = await admin.firestore().collection('usuarios').doc(idUsuario)
      .collection('asignaturasTomadas').where('nombreAsignatura', '==', nombreAsignatura).get();

    // Verificar si se encontró la asignatura
    if (asignaturasSnapshot.empty) {
      return res.status(404).json({ mensaje: 'Asignatura no encontrada' });
    }

    // Obtener la referencia al documento de la asignatura
    const asignaturaDoc = asignaturasSnapshot.docs[0].ref;

    // Generar un ID único para el examen
    const idExamen = admin.firestore().collection('examenesAsignatura').doc().id;

    // Agregar el examen a la colección "examenesAsignatura"
    await asignaturaDoc.collection('examenesAsignatura').doc(idExamen).set({
      idExamen,
      nombreExamen,
      fecha,
      calificacionExamen,
      // preguntasExamen: [] // Inicializar la colección de preguntas del examen
    });

    // Respuesta exitosa
    res.status(200).json({ mensaje: 'Examen creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el examen:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});


// Ruta POST para añadir una pregunta al examen
app.post('/addPreguntaExamen', async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const {  nombreAsignatura, nombreExamen, enunciadoPregunta, tipoPregunta, respuestaCorrecta} = req.body;
    const idUsuario = idUserActual;
    const calificacionPregunta = req.body.calificacionPregunta || 0;
    const respuestaAlmacenada = req.body.respuestaAlmacenada || 0;
    const curiosidadesPregunta = req.body.curiosidadesPregunta || 0;

    // Obtener la referencia al documento del examen
    const examenRef = await getExamenRef(idUsuario, nombreAsignatura, nombreExamen);

    // Verificar si se encontró el examen
    if (!examenRef) {
      return res.status(404).json({ mensaje: 'Examen no encontrado' });
    }

    // Generar un ID único para la pregunta
    const idPregunta = admin.firestore().collection('preguntasExamen').doc().id;
    let tipoPreg = "";
    switch (tipoPregunta) {
      case 1:
          tipoPreg = "Marcar";
        break;
        case 2:
          tipoPreg = "Redacción";
        break;
        case 3:
          tipoPreg = "Tipo 3 Por definir";
        break;
        case 4:
          tipoPreg = "Tipo 4 Por definir";
        break;
      default:
        break;
    }

    // Añadir la pregunta a la colección "preguntasExamen"
    await examenRef.collection('preguntasExamen').doc(idPregunta).set({
      idPregunta,
      enunciadoPregunta,
      calificacionPregunta,
      tipoPreg,
      respuestaAlmacenada,
      respuestaCorrecta,
      curiosidadesPregunta
    });

    // Respuesta exitosa
    res.status(200).json({ mensaje: 'Pregunta añadida exitosamente' });
  } catch (error) {
    console.error('Error al añadir la pregunta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});
// Función para obtener la referencia al documento del examen
async function getExamenRef(idUsuario, nombreAsignatura, nombreExamen) {
  const asignaturasSnapshot = await admin.firestore().collection('usuarios').doc(idUsuario)
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

// Ruta GET para obtener todas las evaluaciones de una asignatura
app.get('/obtenerEvaluacionesAsignatura/:nombreAsignatura', async (req, res) => {
  try {
    const {  nombreAsignatura } = req.params;
    const idUsuario = idUserActual;

    // Obtener la referencia al documento de la asignatura
    const asignaturaRef = await getAsignaturaRef(idUsuario, nombreAsignatura);

    // Verificar si se encontró la asignatura
    if (!asignaturaRef) {
      return res.status(404).json({ mensaje: 'Asignatura no encontrada' });
    }

    // Obtener todas las evaluaciones de la asignatura
    const evaluacionesSnapshot = await asignaturaRef.collection('examenesAsignatura').get();

    // Mapear los datos de las evaluaciones con preguntas anidadas
    const evaluacionesConPreguntas = evaluacionesSnapshot.docs.map(async doc => {
      const examenData = doc.data();

      // Obtener preguntas del examen
      const preguntasSnapshot = await doc.ref.collection('preguntasExamen').get();
      const preguntas = preguntasSnapshot.docs.map(preguntaDoc => preguntaDoc.data());

      // Añadir preguntas al objeto del examen
      examenData.preguntasExamen = preguntas;

      return examenData;
    });

    // Esperar a que se completen todas las promesas de obtener preguntas
    const evaluacionesConPreguntasResueltas = await Promise.all(evaluacionesConPreguntas);

    // Respuesta exitosa con los datos de las evaluaciones
    res.status(200).json(evaluacionesConPreguntasResueltas);
  } catch (error) {
    console.error('Error al obtener las evaluaciones:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});
// Función para obtener la referencia al documento de la asignatura
async function getAsignaturaRef(idUsuario, nombreAsignatura) {
  const asignaturasSnapshot = await admin.firestore().collection('usuarios').doc(idUsuario)
    .collection('asignaturasTomadas').where('nombreAsignatura', '==', nombreAsignatura).get();
  if (asignaturasSnapshot.empty) {
    return null;
  }
  return asignaturasSnapshot.docs[0].ref;
}

// Configurar el puerto del servidor
const PORT = 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// module.exports = {admin, cors};