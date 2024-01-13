export const PORT = 5000;


function actualizarIdUsuario(idNew) {
    idUserActual = idNew;
}

function obtenerIdUsuario() {
    return idUserActual;
}

function actualizarReferencia(referenciaActualizar, referencia) {
    if (referenciaActualizar == "asignaturas") {
        referenciaAsignaturasUsuarioActual = referencia;
    } else {
        if (referenciaActualizar == "examenes") {
            referenciaExamenesAsignaturaActual = referencia;
        } else {
            if (referenciaActualizar == "preguntas") {
                referenciaPreguntasExamenActual = referencia;
            }
        }

    }
}

function obtenerReferencia(nombreReferencia) {
    if (nombreReferencia == "asignaturas") {
        return referenciaAsignaturasUsuarioActual;
    } else {
        if (nombreReferencia == "examenes") {
            return referenciaExamenesAsignaturaActual;
        } else {
            if (nombreReferencia == "preguntas") {
                return referenciaPreguntasExamenActual;
            }
        }

    }
}

export let idUserActual = "0Ed3TFcFAPRf8ZGQHMhX";
export let referenciaAsignaturasUsuarioActual;
export let referenciaExamenesAsignaturaActual;
export let referenciaPreguntasExamenActual;
const variablesReferencias = {actualizarReferencia , obtenerReferencia};
export {variablesReferencias, actualizarIdUsuario, obtenerIdUsuario};

