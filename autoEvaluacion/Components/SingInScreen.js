import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet ,Alert} from 'react-native';
import LogoUJA from '../assets/LogoUJA.png'
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import deBd from "./InicializacionBd";


// Inicializar la aplicación de Firebase
const app = initializeApp(deBd.firebaseConfig);

const SingInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const navigation = useNavigation();

  const goToSignUp = () => {
    console.log("voy al registro")
  };
  const goToRestart = () => {
    navigation.navigate('Restart');
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log('Respuesta del servidor:', data);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  
const handleSignIn = async () => {
  try {
    // Inicializar la aplicación de Firebase
    const app = initializeApp(deBd.firebaseConfig);

    // Obtener la instancia de autenticación
    const auth = getAuth(app);

    // Intentar iniciar sesión con el correo electrónico y la contraseña
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // El inicio de sesión fue exitoso
    console.log('Usuario autenticado:', userCredential);

    // Aquí puedes navegar a otra pantalla o realizar acciones después del inicio de sesión exitoso.
    navigation.navigate('Test');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);

    // Manejar errores de autenticación
    if (error.code === 'auth/user-not-found') {
      const errorMessage = 'Usuario no encontrado. Verifica tu correo electrónico.';
      Alert.alert('Error', errorMessage);
      window.alert(errorMessage); // Mostrar alerta en navegadores
    } else if (error.code === 'auth/wrong-password') {
      const errorMessage = 'Contraseña incorrecta. Verifica tu contraseña.';
      Alert.alert('Error', errorMessage);
      window.alert(errorMessage); // Mostrar alerta en navegadores
    } else if (error.code === 'auth/invalid-email') {
      const errorMessage = 'Correo electrónico inválido. Verifica tu correo electrónico.';
      Alert.alert('Error', errorMessage);
      window.alert(errorMessage); // Mostrar alerta en navegadores
    } else if (error.code === 'auth/invalid-credential') {
      const errorMessage = 'Credenciales de autenticación no válidas. Verifica sus posibles credenciales.';
      Alert.alert('Error', errorMessage);
      window.alert(errorMessage); // Mostrar alerta en navegadores
    } else {
      // Otros errores no especificados
      const errorMessage = 'Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.';
      Alert.alert('Error', errorMessage);
      window.alert(errorMessage); // Mostrar alerta en navegadores
    }
  }
};


// navigation.navigate('Test');
  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
       <Text style={styles.texto}>Genera autoevaluaciones de tus materias
       </Text>
       <Text style={styles.texto}>Exclusivo para estudiantes de la UJA
       </Text>
      </View>
      <View style={styles.upperContainer}>
        <Image source={LogoUJA} style={styles.image} />
      </View>
      <View style={styles.lowerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        {emailError.length > 0 &&
                  <Text>{emailError}</Text>
                }
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        {passwordError.length > 0 &&
                  <Text>{passwordError}</Text>
                }
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOl} onPress={goToRestart}>
          <Text style={styles.textoOl}>He olvidado mi Contraseña</Text>
        </TouchableOpacity>   
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight:25,
    marginTop:0,
  },
  texto: {
    color:'white',
    fontSize:20,
    justifyContent:'flex-start'
  },
  lowerContainer: {
    flex: 4,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
   encabezado: {
    flex: 1,
    width: '100%',
    backgroundColor: '#006D38',
    padding: 16,
    paddingTop: 0,
    maxHeight:95, 
    minHeight:50,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#006D38', 
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom:10,
  },
  buttonOl: {
    backgroundColor: 'white', 
    padding: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  textoOl: {
    color: '#006D38',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SingInScreen;