
import { actualizarIdUsuario } from "./config.mjs";
import {BD} from "./firebase.js";


// Ruta para el registro de usuarios
const register = async (req, res) => {
  const { email, password } = req.body;

  // Validar el formato del correo electrónico
  const emailRegex = /^[\w-]+(\.[\w-]+)*@(red\.uja\.es|red\.ujaen\.es)$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Correo electrónico no válido." });
  }

  // Validar el formato de la contraseña
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Contraseña no válida. Debe contener al menos 8 caracteres con al menos una letra mayúscula, una letra minúscula, un número y un símbolo.",
    });
  }

  try {
    const userRecord = await BD.admin.auth().createUser({
      email,
      password,
    });
    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    if (error.code === "auth/email-already-exists") {
      return res
        .status(409)
        .json({ error: "El correo electrónico ya está en uso." });
    }
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// Ruta para iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si ya hay un usuario autenticado
  const currentUser = req.currentUser;
  if (currentUser) {
    return res.status(400).json({ error: "Ya hay un usuario autenticado." });
  }

  try {
    // Obtener el registro de usuario
    const userRecord = await BD.admin.auth().getUserByEmail(email);

    // Comparar la contraseña manualmente
    // Puedes usar una biblioteca como bcrypt para hacer esto más seguro en un entorno de producción
    // Aquí, simplemente estamos comparando las contraseñas en texto plano, lo cual no es seguro.
    if (password === userRecord.password) {
      res
        .status(200)
        .json({ uid: userRecord.uid, message: "Inicio de sesión exitoso." });
    } else {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return res
        .status(404)
        .json({ error: "Correo electrónico no registrado." });
    }

    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// Ruta para recuperar contraseña usando correo
const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si el usuario existe
    const userRecord = await BD.firestoreDB.getUserByEmail(email);

    // Generar el enlace para restablecer la contraseña
    const resetLink = await BD.admin.auth().generatePasswordResetLink(email);

    // Enviar el enlace al correo electrónico del usuario
    // Aquí puedes usar un servicio de envío de correos electrónicos como nodemailer
    // o la API de Firebase para enviar correos electrónicos

    // Enviar una respuesta exitosa al cliente
    res.json({
      success: true,
      message: "Correo de restablecimiento enviado con éxito.",
    });
  } catch (error) {
    console.error(
      "Error al enviar el correo de restablecimiento de contraseña:",
      error
    );
    res
      .status(500)
      .json({
        success: false,
        error: "Error al enviar el correo de restablecimiento de contraseña.",
      });
  }
};

// Ruta para registrar un usuario y sus asignaturas
const registrarUsuario = async (req, res) => {
  try {
    const { email, nombre, password, membresia, apodo, asignaturas } = req.body;

    // Generar un ID único para el usuario
    const idUsuario = BD.firestoreDB.collection("usuarios").doc().id;

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
    await BD.firestoreDB.collection("usuarios").doc(idUsuario).set(usuario);

    // Agregar asignaturas como subcolección de 'asignaturas' en la colección del usuario
    // await admin.firestore().collection('usuarios').doc(idUsuario).collection('asignaturasTomadas').doc().set({});
    actualizarIdUsuario(idUsuario);

    // Enviar una respuesta exitosa al cliente
    res.json({
      success: true,
      message: "Usuario y asignaturas registrados con éxito.",
    });
  } catch (error) {
    console.error("Error al registrar el usuario y las asignaturas:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Error al registrar el usuario y las asignaturas.",
      });
  }
};
const controllersUsua = { register, login , registrarUsuario, resetPassword};
export default controllersUsua
