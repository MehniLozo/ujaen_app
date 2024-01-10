

const ObtenerExamenesAsignatura = async (nombreAsignatura) => {
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

  const AddPreguntaExamen = async (nombreAsignatura, nombreExamen, enunciadoPregunta, tipoPregunta, respuestaCorrecta, curiosidadesPregunta) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/addPreguntaExamen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreAsignatura, nombreExamen, enunciadoPregunta, tipoPregunta, respuestaCorrecta, curiosidadesPregunta }),
      });
      const data = await response.json();

      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error al añadir pregunta a Examen:", error);
    }
  }
  
  const crearExamen = async (nombreAsignatura, nombreExamen, fecha) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/crearExamen/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreAsignatura, nombreExamen, fecha }),
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

  
module.exports = {
	ObtenerExamenesAsignatura,
	AddPreguntaExamen,
	crearExamen,
	obtenerAsignaturasUsuario,
	AgregarAsignatura,
	RegistrarUsuario,
}
//	PARA UTILIZAR LAS FUNCIONES ESCRITAS AQUÍ DEBE AÑADIR EL CODIGO DE ABAJO EN LA PARTE SUPERIOR DEL FICHERO DESTINO,
//	ACTUALIZANDO LA RUTA 
// 		const operaciones = require('./funciones');