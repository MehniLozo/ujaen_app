import express from 'express';
import controllersPreg from './controller_pregunta.mjs';
import controllersAsig from "./controller_asignatura.mjs";
import controllersUsua from './controller_users.mjs';
import controllersExam from './controller_examen.mjs';

const router = express.Router();

router.post("/addPreguntaExamen", controllersPreg.addPreguntaExamen);//
router.get("obtenerPreguntasExamen/:idAsignatura/:idExamen", controllersPreg.obtenerPreguntasExamen);
router.post("/almacenarRespuestaPregunta", controllersPreg.almacenarRespuestaPregunta);//
router.post("/evaluarRespuestaPregunta", controllersPreg.evaluarRespuestaPregunta);//
router.post("/crearExamen", controllersExam.crearExamen);//
router.post("/evaluarRespuestaExamen", controllersExam.evaluarRespuestaExamen);//
router.post("/evaluarRespuestaExamen2", controllersExam.evaluarRespuestaExamen2);//
router.post("/iniciarPrueba", controllersExam.iniciarPrueba);
router.post("/agregarAsignatura", controllersAsig.agregarAsignatura);//
router.get("/obtenerAsignaturasUsuario", controllersAsig.obtenerAsignaturasUsuario);//
router.get("/obtenerEvaluacionesAsignatura/:nombreAsignatura", controllersAsig.obtenerEvaluacionesAsignatura);//
router.delete('/eliminarAsignatura/:idAsignatura', controllersAsig.eliminarAsignatura);
router.post("/register", controllersUsua.register);
router.post("/login", controllersUsua.login);
router.post("/resetPassword", controllersUsua.resetPassword);
router.post("/registrarUsuario", controllersUsua.registrarUsuario);

export default router;

// module.exports = router;