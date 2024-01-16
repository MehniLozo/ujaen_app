// import { PORT } from "./database/config.mjs";

// import { intercambiarCases } from "./database/functions.mjs";

const PORT = 5000;

const IpServer = "192.168.1.134";

const ObtenerExamenesAsignatura = async (nombreAsignaturaParam) => {
  
  /// "nombreAsignatura" tiene que ser un texto y estar escrito en snake_Case
  /// para eso es la funcion de apbajo intercambiarCases
  const nombreAsignatura = await intercambiarCases(nombreAsignaturaParam, false);
  console.log(nombreAsignaturaParam,nombreAsignatura)
  try {
          
    const response = await fetch(`http://${IpServer}:${PORT}/obtenerEvaluacionesAsignatura/${nombreAsignatura}`)
      .then(async (response) => {
        // Verifica si la respuesta es exitosa (código de estado 200-299)
        if (!response.ok) {
          throw new Error(`Error de red - Código: ${response.status}`);
        }
        // Parsea la respuesta JSON
        return await response.json();
      })
      .then(async (data) => {
        // Maneja los datos obtenidos
        console.log(`Examenes Aplicados en la asignatura ${nombreAsignatura}:`, data.evaluacionesConPreguntasResueltas);
        return await data.evaluacionesConPreguntasResueltas
      });
    // const data = await response.json();
    return await response
  } catch (error) {
    console.error("Error al obtener los examenes aplicados en la asignatura, en el usuarioCatch:", error);
  }
}
	
	
	//	NO ES NECESARIA LLAMARLA DE MOMENTO PORQUE SE HACE AUTOMATICAMENTE
  const AddPreguntaExamen = async (nombreAsignatura, nombreExamen, temaPregunta, enunciadoPregunta, tipoPregunta, respuestaCorrecta, curiosidadesPregunta) => {
    try {
      const response = await fetch(`http://${IpServer}:${PORT}/addPreguntaExamen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreAsignatura, nombreExamen, temaPregunta, enunciadoPregunta, tipoPregunta, respuestaCorrecta, curiosidadesPregunta }),
      });
      const data = await response.json();

      console.log("Respuesta del servidor:", data);
      return data;
    } catch (error) {
      console.error("Error al añadir pregunta a Examen:", error);
    }
  }
  
  
  //  CREAR UN EXAMEN A TRAVES DE LA IA 
  
  //	OJO SI NO ESPECIFICA "cantidadPreguntas" SE CREARAN 5 NADA MAS QUE ERAN LAS PREVISTAS
  
  //	OJO TipoPreguntaExamen DEBE SER UNA CADENA "vf" o "alternativas"
  const crearExamen = async (nombreAsignatura, nombreExamen, temaExamen, tipoPreguntaExamen, cantidadPreguntas, fecha) => {
    
	try {
      const response = await fetch(`http://${IpServer}:${PORT}/crearExamen/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreAsignatura, nombreExamen, temaExamen, tipoPreguntaExamen, fecha , cantidadPreguntas}),
      });
      const data = await response.json();

      console.log("Respuesta del servidor:", data);
      return data.idExamen
    } catch (error) {
      console.error("Error al crear Examen:", error);
    }
  }


	// SE RETORNA LA ESTRUCTURA JERARQUICA DE LAS ASIGNATURAS DEL USUARIO 

const obtenerAsignaturasUsuario = async () => {
    try {
      const response = await fetch(`http://${IpServer}:${PORT}/obtenerAsignaturasUsuario`)
        .then(async (response) => {
          // Verifica si la respuesta es exitosa (código de estado 200-299)
          if (!response.ok) {
            throw new Error(`Error de red - Código: ${response.status}`);
          }
          // console.log("salida fetch = ", response)
          // Parsea la respuesta JSON
          return await response.json();
        })
        .then((data) => {
          // Maneja los datos obtenidos
          // console.log("Datos recibidos:", data.asignaturas);
          return data.asignaturas;
        });
      // const data = await response.json();
      return response
    } catch (error) {
      console.error("Error al obtener las asignaturas del usuarioCatch:", error);
    }
  };

  const obtenerPreguntasExamen = async (idAsignatura, idExamen) => {
    try {
      const params = {idAsignatura,idExamen};
      const response = await fetch(`http://${IpServer}:${PORT}/obtenerPreguntasExamen/${idAsignatura}/${idExamen}`)
        .then(async (response) => {
          // Verifica si la respuesta es exitosa (código de estado 200-299)
          if (!response.ok) {
            throw new Error(`Error de red - Código: ${response.status}`);
          }
          console.log("salida fetch = ", response)
          // Parsea la respuesta JSON
          return await response.json();
        })
        .then((data) => {
          // Maneja los datos obtenidos
          console.log("Datos recibidos:", data.asignaturas);
          return data.preguntas;
        });
      // const data = await response.json();
      console.log("response = ",response);
      return response
    } catch (error) {
      console.error("Error al obtener las preguntas del usuarioCatch:", error);
    }
  };

  const AgregarAsignatura = async (nombreAsignatura, descripcion = '', creditos = 50) => {
    // let estado = false;
    try {
      const response = await fetch(`http://${IpServer}:${PORT}/agregarAsignatura/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreAsignatura, descripcion, creditos }),
      });
      const data = await response.json();

      console.log("Respuesta del servidor:", data);
      // estado = true;
      // return estado;
      return data;
    } catch (error) {
      console.error("Error al registrar Asignatura:", error);
    }
  };

	

  const RegistrarUsuario = async () => {   //  ESTA ES UNA PRUEBA DE REGISTRAR USUARIO CON ASIGNATURAS
    const email = "carolao@red.ujaen.es";
    const nombre = "Carolsssssssina Mujica";
    const password = "passwordssssss";
    const membresia = "Membresia talsssssss cual";
    const apodo = "caritosssssss"; 
    
      try {
        const response = await fetch(`http://${IpServer}:${PORT}/registrar-usuario`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, nombre, password , membresia, apodo }),
        });
  
        const data = await response.json();
  
        console.log('Respuesta del servidor:', data);
        return data;
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
  };


	//  ESTA FUNCION NO USARLA AUN
  const IniciarExamen = async (idExamen, idAsignatura, tiempoExamen) => {
    //  EL TIEMPO DEL EXAMEN TIENE QUE SER UN NUMERO POSITIVO
    //  EN EL FRONT TIENEN QUE FORZAR A QUE NO SE PUEDA INICIAR LA PRUEBA DOS VECES
    //  SE HACE CON UNA BANDERA QUE PROHIBA LA LLAMADA A ESTA FUNCION
  try {
    const response = await fetch(`http://${IpServer}:${PORT}/iniciarPrueba/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idExamen, idAsignatura, tiempoExamen }),
    });
    const data = await response.json();

    console.log("Respuesta del servidor:", data);

  } catch (error) {
    console.error("Error al empezar el examen:", error);
  }
};
	
	//	DEVOLVERA LA NOTA OBTENIDA EN UN EXAMEN. LA IDEA ES LLAMARLA AL HACER CLIC SOBRE UN EXAMEN AL QUE SE LLEGA HACIENDOLE CLIC A UNA ASIGNATURA DE 
	//	MODO TAL QUE SE OBTENGAN LOS ID DE AMBAS COSAS QUE DEBEN SER EL MISMO ID DE LA LISTA RENDERIZADA A LA QUE SE CLIQUEA.
  async function EvaluarExamen(idExamen, idAsignatura, evaluacion = false) {
    try {
      const response = await fetch(`http://${IpServer}:${PORT}/evaluarRespuestaExamen2/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idExamen, idAsignatura , evaluacion}),
      });
      const data = await response.json();

      console.log("Respuesta del servidor:", data);
      return data;
    } catch (error) {
      console.error("Error al evaluar el examen:", error);
    }
  }

	//	EVALUA UNA PREGUNTA ESPECIFICA
async function EvaluarPregunta(idAsignatura, idExamen, idPregunta, evaluacion){
  try {
    const respu = await fetch(`http://${IpServer}:${PORT}/evaluarRespuestaPregunta`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ idAsignatura, idExamen, idPregunta, evaluacion })
    });
    const data = await respu.json();
    // console.log("Respuesta de la operacion: ", data);
    return data;
  } catch (error) {
    console.error("Error al intentar llamar a evaluar pregunta de prueba.");
  }
}


//	ALMACENA LA RESPUESTA DE UNA PREGUNTA ESPECIFICA
async function ResponderPregunta(idAsignatura, idExamen, idPregunta, respuesta){
  try {
    const respu = await fetch(`http://${IpServer}:${PORT}/almacenarRespuestaPregunta`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ idAsignatura, idExamen, idPregunta, respuesta })
    });
    const data = await respu.json();
    console.log("Respuesta de la operacion: ", data);
    return data;
  } catch (error) {
    console.error("Error al intentar llamar a evaluar pregunta de prueba.");
  }
}

async function EliminarAsignatura(idAsignatura){
 try{
  // Configura la solicitud DELETE
  const opcionesSolicitud = {
    method: "DELETE",
  };

  // Realiza la solicitud fetch
  const respuesta = await fetch(`http://${IpServer}:${PORT}/eliminarAsignatura/${idAsignatura}`,opcionesSolicitud)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error(
          `Error en la solicitud: ${respuesta.status} ${respuesta.statusText}`
        );
      }
      return respuesta;
    })
    .then((datos) => {
      console.log("Éxito:", datos);
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
  }catch (error){
    console.log("Error desde Api eliminar asignatura")
  }
    // return respuesta;
};
  
const apisHandles = {
	ObtenerExamenesAsignatura,
	AddPreguntaExamen,
	crearExamen,
	obtenerAsignaturasUsuario,
	AgregarAsignatura,
	RegistrarUsuario,
  IniciarExamen,
  EvaluarExamen,
  EvaluarPregunta,
  ResponderPregunta,
  EliminarAsignatura,
  obtenerPreguntasExamen,
};
export {apisHandles};


//  NUEVOS CREADOS A AGREGAR EN LA LISTA DE APIs-HANDLES


//      ESTA ES UNA FUNCION QUE NO CONSEGUI IMPORTARLA DE ./database/functions.mjs POR LO QUE LA AÑADI AQUI PARA PODER UTILIZARLA
async function intercambiarCases( cadena , toSnakeCase){

  // Eliminar espacios en blanco al principio y al final
  const cadenaSinEspacios = cadena.trim();
  console.log("cadena trim:", cadenaSinEspacios)
  let cadenaProcesada = "";
  if(toSnakeCase){
  // Sustituir espacios en blanco por "_"
  cadenaProcesada = cadenaSinEspacios.replace(/\s+/g, '_');
  console.log("cadena procesada1:",cadenaProcesada);
  }else{
    cadenaProcesada = cadenaSinEspacios.replace(/_/g, ' ');
    console.log("cadena procesada0:",cadenaProcesada);
  }
  return cadenaProcesada;
}

