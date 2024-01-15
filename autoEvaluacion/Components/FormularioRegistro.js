import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const FormularioRegistro = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombreUsuario: '',
    correoElectronico: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  const handleChange = (nombre, valor) => {
    setDatosFormulario({
      ...datosFormulario,
      [nombre]: valor,
    });
  };

  const handleSubmit = () => {
    if (datosFormulario.contraseña === datosFormulario.confirmarContraseña) {
      // Agregar lógica para manejar el registro (por ejemplo, enviar datos al backend)
      console.log('Datos a enviar:', datosFormulario);
    } else {
      console.log('Las contraseñas no coinciden');
      // Agregar lógica para mostrar un mensaje de error al usuario
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Registro</Text>
      <View style={styles.formulario}>
        <TextInput
          style={styles.entrada}
          placeholder="Nombre de usuario"
          value={datosFormulario.nombreUsuario}
          onChangeText={(texto) => handleChange('nombreUsuario', texto)}
        />
        <TextInput
          style={styles.entrada}
          placeholder="Correo electrónico"
          value={datosFormulario.correoElectronico}
          onChangeText={(texto) => handleChange('correoElectronico', texto)}
        />
        <TextInput
          style={styles.entrada}
          placeholder="Contraseña"
          secureTextEntry
          value={datosFormulario.contraseña}
          onChangeText={(texto) => handleChange('contraseña', texto)}
        />
        <TextInput
          style={styles.entrada}
          placeholder="Confirmar Contraseña"
          secureTextEntry
          value={datosFormulario.confirmarContraseña}
          onChangeText={(texto) => handleChange('confirmarContraseña', texto)}
        />
        <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
          <Text style={styles.textoBoton}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formulario: {
    width: '80%',
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  boton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormularioRegistro;
