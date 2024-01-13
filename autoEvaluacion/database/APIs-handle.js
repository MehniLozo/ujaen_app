import { PORT } from "./database/config.mjs";



const ObtenerExamenesAsignatura = async (nombreAsignatura) => {
  /// "nombreAsignatura" tiene que ser un texto y estar escrito en snake_Case
  try {
    const response = await fetch(`http://127.0.0.1:5000/obtenerEvaluacionesAsignatura/${nombreAsignatura}`)
      .then((response) => {
        // Verifica si la respuesta es exitosa (código de estado 200-299)
        if (!response.ok) {
          throw new Error(`Error de red - Código: ${response.status}`);
        }
        // Parsea la respuesta JSON
        return response.json();
      })
      .then((data) => {
        // Maneja los datos obtenidos
        console.log(`Examenes Aplicados en la asignatura ${nombreAsignatura}:`, data);
      });
    // const data = await response.json();
  } catch (error) {
    console.error("Error al obtener los examenes aplicados en la asignatura, en el usuarioCatch:", error);
  }
}

  const AddPreguntaExamen = async (nombreAsignatura, nombreExamen, temaPregunta, enunciadoPregunta, tipoPregunta, respuestaCorrecta, curiosidadesPregunta) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/addPreguntaExamen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreAsignatura, nombreExamen, temaPregunta, enunciadoPregunta, tipoPregunta, respuestaCorrecta, curiosidadesPregunta }),
      });
      const data = await response.json();

      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error al añadir pregunta a Examen:", error);
    }
  }
  
  const crearExamen = async (nombreAsignatura, nombreExamen, temaExamen, tipoPreguntaExamen, fecha) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/crearExamen/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreAsignatura, nombreExamen, temaExamen, tipoPreguntaExamen, fecha }),
      });
      const data = await response.json();

      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error al crear Examen:", error);
    }
  }

  const obtenerAsignaturasUsuario = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/obtenerAsignaturasUsuario")
        .then((response) => {
          // Verifica si la respuesta es exitosa (código de estado 200-299)
          if (!response.ok) {
            throw new Error(`Error de red - Código: ${response.status}`);
          }
          // Parsea la respuesta JSON
          return response.json();
        })
        .then((data) => {
          // Maneja los datos obtenidos
          console.log("Datos recibidos:", data);
        });
      // const data = await response.json();
    } catch (error) {
      console.error("Error al obtener las asignaturas del usuarioCatch:", error);
    }
  };

  const AgregarAsignatura = async (nombreAsignatura, descripcion, creditos) => {
    let estado = false;
    try {
      const response = await fetch("http://127.0.0.1:5000/agregarAsignatura/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreAsignatura, descripcion, creditos }),
      });
      const data = await response.json();

      console.log("Respuesta del servidor:", data);
      estado = true;
      return estado;
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
        const response = await fetch('http://127.0.0.1:5000/registrar-usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, nombre, password , membresia, apodo }),
        });
  
        const data = await response.json();
  
        console.log('Respuesta del servidor:', data);
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
  };

  const IniciarExamen = async (idExamen, idAsignatura, tiempoExamen) => {
    //  EL TIEMPO DEL EXAMEN TIENE QUE SER UN NUMERO POSITIVO
    //  EN EL FRONT TIENEN QUE FORZAR A QUE NO SE PUEDA INICIAR LA PRUEBA DOS VECES
    //  SE HACE CON UNA BANDERA QUE PROHIBA LA LLAMADA A ESTA FUNCION
  try {
    const response = await fetch("http://127.0.0.1:5000/iniciarPrueba/", {
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
};
export {apisHandles};


//  NUEVOS CREADOS A AGREGAR EN LA LISTA DE APIs-HANDLES


  async function EvaluarExamen(idExamen, idAsignatura, evaluacion = false) {
    try {
      const response = await fetch("http://127.0.0.1:5000/evaluarRespuestaExamen/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idExamen, idAsignatura , evaluacion}),
      });
      const data = await response.json();

      console.log("Respuesta del servidor:", data);

    } catch (error) {
      console.error("Error al evaluar el examen:", error);
    }
  }



async function EvaluarPregunta(idAsignatura, idExamen, idPregunta, evaluacion){
  try {
    const respu = await fetch(`http://127.0.0.1:${PORT}/evaluarRespuestaPregunta`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ idAsignatura, idExamen, idPregunta, evaluacion })
    });
    const data = await respu.json();
    console.log("Respuesta de la operacion: ", data);
  } catch (error) {
    console.error("Error al intentar llamar a evaluar pregunta de prueba.");
  }
}

async function ResponderPregunta(idAsignatura, idExamen, idPregunta, respuesta){
  try {
    const respu = await fetch(`http://127.0.0.1:${PORT}/almacenarRespuestaPregunta`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ idAsignatura, idExamen, idPregunta, respuesta })
    });
    const data = await respu.json();
    console.log("Respuesta de la operacion: ", data);
  } catch (error) {
    console.error("Error al intentar llamar a evaluar pregunta de prueba.");
  }
}










// module.exports = {
// 	ObtenerExamenesAsignatura,
// 	AddPreguntaExamen,
// 	crearExamen,
// 	obtenerAsignaturasUsuario,
// 	AgregarAsignatura,
// 	RegistrarUsuario,
// }

//	PARA UTILIZAR LAS FUNCIONES ESCRITAS AQUÍ DEBE AÑADIR EL CODIGO DE ABAJO EN LA PARTE SUPERIOR DEL FICHERO DESTINO,
//	ACTUALIZANDO LA RUTA 
// 		const operaciones = require('./funciones');