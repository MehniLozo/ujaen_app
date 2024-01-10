import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';

const EvaluationConfigScreen = () => {
  const navigation = useNavigation();

  const question =  "Cual es el dispositivo mas utilizando?"
  
  const goToQuest = () => {
    navigation.navigate('Question', {options:null,question,typeQuest: 1, currentQuestion:1,totalQuestions:10,hasNext:true,hasPrec:false});
  };

  const [evaluationName, setEvaluationName] = useState('');
  const [questionType, setQuestionType] = useState('opcionMultiple');
  const [numberOfQuestions, setNumberOfQuestions] = useState('');

  const questionTypes = ['opcionMultiple', 'verdaderoFalso', 'abierta', 'mixta'];

  return (
    <View style={styles.container}>
     <TextInput
        style={styles.input}
        placeholder="Nombre de autoevaluación"
        value={evaluationName}
        onChangeText={(text) => setEvaluationName(text)}
      />
    <Text>Tipo de preguntas</Text>
      <Picker
        selectedValue={questionType}
        onValueChange={(itemValue) => setQuestionType(itemValue)}
        style={styles.picker}
      >
        {questionTypes.map((type) => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Cantidad de preguntas"
        keyboardType="numeric"
        value={numberOfQuestions}
        onChangeText={(text) => setNumberOfQuestions(text)}
      />
      <TouchableOpacity style={styles.startButton} onPress = {goToQuest} >
        <Text style={styles.startButtonText}>Iniciar autoevaluación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  header:{
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 16,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EvaluationConfigScreen;