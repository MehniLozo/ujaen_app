import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LogoUJA from '../assets/LogoUJA.png'
import { useNavigation } from '@react-navigation/native';
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
  const handleSingIn = () => {
    // Por ahora, simplemente imprime los datos de inicio de sesión
    var emailValid = false;
        var re = /^[\w-\.]+@(red.ujaen.es)|(ujaen.es)$/;
        if( re.test(email)){
            setEmailError("")
            emailValid = true
        }
        else{
            setEmailError('El email debe ser de la UJA');  
        }
        var pss=/^(?!.* )(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
        var passwordValid = false;
        if( pss.test(password)){
            setPasswordError("")
            passwordValid = true
        }
        else{
            setPasswordError('La contraseña debe tener 8 caracteres, 1 numero, 1 simbolo, 1 min, 1 mayus');  
        }
        if(passwordValid==false||emailValid==false){
          console.log("no puede iniciar sesion")
        }
        else{
          console.log("si puede iniciar sesion")
        }
    console.log('Email:', email);
    console.log('Password:', password);
  };

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
        <TouchableOpacity style={styles.button} onPress={handleSingIn}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={goToSignUp}>
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