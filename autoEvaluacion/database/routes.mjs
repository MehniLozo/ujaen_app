import express from 'express';
import controllersPreg from './controller_pregunta.mjs';
import controllersAsig from "./controller_asignatura.mjs";
import controllersUsua from './controller_users.mjs';
import controllersExam from './controller_examen.mjs';

const router = express.Router();

router.post("/addPreguntaExamen", controllersPreg.addPreguntaExamen);//
router.post("/almacenarRespuestaPregunta", controllersPreg.almacenarRespuestaPregunta);
router.post("/evaluarRespuestaPregunta", controllersPreg.evaluarRespuestaPregunta);
router.post("/crearExamen", controllersExam.crearExamen);//
router.post("/evaluarRespuestaExamen", controllersExam.evaluarRespuestaExamen);
router.post("/iniciarPrueba", controllersExam.iniciarPrueba);
router.post("/agregar Asignatura", controllersAsig.agregarAsignatura);//
router.get("/obtenerAsignaturasUsuario", controllersAsig.obtenerAsignaturasUsuario);//
router.get("/obtenerEvaluacionesAsignatura/:nombreAsignatura", controllersAsig.obtenerEvaluacionesAsignatura);//
router.post("/register", controllersUsua.register);
router.post("/login", controllersUsua.login);
router.post("/resetPassword", controllersUsua.resetPassword);
router.post("/registrarUsuario", controllersUsua.registrarUsuario);

export default router;

// module.exports = router;