import React from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoUJA from '../assets/LogoUJA.png'
import { Svg, Polygon, Rect, Circle } from 'react-native-svg';



const HomeScreen = () => {
  const navigation = useNavigation();


  const goToSignIn = () => {
    navigation.navigate('SingIn');
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
      <TouchableOpacity style={styles.button} onPress={() =>{}}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttony} onPress={goToSignIn}> 
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