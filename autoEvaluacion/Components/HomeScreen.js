import React from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoUJA from '../assets/LogoUJA.png'
import { Svg, Polygon, Rect, Circle } from 'react-native-svg';



const HomeScreen = () => {
  const navigation = useNavigation();

  const goTo = () => {
    navigation.navigate("SubjectExam");
  };

  const goToSignIn = () => {
    navigation.navigate('SingIn');
  };

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
    // navigation.navigate('ConfigEvaluation');
    // AgregarAsignatura("Filosofía", "Muela y mas muela", 90);
    if (await AgregarAsignatura("Filosofía", "Muela y mas muela", 90) &&
      await AgregarAsignatura("base de datos", "Se relacionará???", 190) &&
      await AgregarAsignatura("Ingeniería de Datos", "Ay Silena", 9000)) {
          await obtenerAsignaturasUsuario();
          await crearExamen("Filosofía", "Primer Control Parcial","10/05/2020");
          await crearExamen("Filosofía", "Segundo Control Parcial","10/05/2023");
          await AddPreguntaExamen("Filosofía", "Primer Control Parcial", "¿Ser o no ser?", 1, "ResCorr1", "curiosidad de la pregunta");
          await AddPreguntaExamen("Filosofía", "Segundo Control Parcial", "Existo o como", 3, "ResCorr2", "curiosidad de la pregunta");
          await AddPreguntaExamen("Filosofía", "Primer Control Parcial", "Redacte su biografía", 2, "ResCorr3", "curiosidad de la pregunta");
          await AddPreguntaExamen("Filosofía", "Primer Control Parcial", "Cuarto tipo de pregunta", 4, "ResCorr4", "curiosidad de la pregunta");
          await ObtenerExamenesAsignatura("Filosofía");
    }
  };

  return (
    
      <View style={styles.container}>
        <Svg height="110%" width="110%" style={styles.background}>
       <Circle cx="65%" cy="0%" r="70%" fill="#00A65D" />
        <Circle cx="35%" cy="0%" r="44%" fill="#231F20" />
        <Circle cx="46%" cy="-6%" r="35%" fill="#006D38" />
      </Svg>
      <View style={styles.contentContainer}>
        <Image source={LogoUJA} style={styles.logo} />
        <Text style={styles.title}>Bienvenido a la aplicación</Text>
        <Text style={styles.title}>De evaluacion</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={RegistrarUsuario}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttony} onPress={goTo}> // goToSignIn
        <Text style={styles.buttonTexty}>Ya cuento con una cuenta</Text>
      </TouchableOpacity>
    </View>
      
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 16,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex:1,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006D38', // Color verde
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#006D38', // Color verde
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#006D38', // Color verde
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  buttony: {
    backgroundColor: 'transparent', // Color verde
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonTexty: {
    fontSize: 18,
    color: '#006D38',
    fontWeight: 'bold',
  },
};

export default HomeScreen;