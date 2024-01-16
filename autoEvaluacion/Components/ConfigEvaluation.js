import React, { useState , useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { apisHandles } from '../APIs-handle';

const EvaluationConfigScreen = ({route}) => {
  const navigation = useNavigation();



const {idAsignatura , nombreAsignatura} = route.params;

console.log({idAsignatura , nombreAsignatura});

const [loading, setLoading] = useState(false);
  const question =  "Cual es el dispositivo mas utilizando?";
  
  const goToQuest = () => {
    navigation.navigate('Question', {options:null,question,typeQuest: 1, currentQuestion:1,totalQuestions:10,hasNext:true,hasPrec:false});
  };
useEffect(( ) => {
  setQuestionType('')
},[])
 
  const [evaluationName, setEvaluationName] = useState('');
  const [questionType, setQuestionType] = useState('alternativa');
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [theme, setTheme] = useState('');
  const questionTypes = ['Alternativas', 'Verdadero o falso'];

  const handleStartEvaluation =async  () => {
    try{
      setLoading(true);
      const currentDate = new Date();

     /* let resp = await Promise.resolve(apisHandles.crearExamen({
        nombreAsignatura:"programación",
        nombreExamen:evaluationName,
        temaExamen: theme,
        tipoPreguntaExamen: questionType}));*/
        if((evaluationName !== '') && (theme !== '')){
      let resp = await Promise.resolve(apisHandles.crearExamen(
        nombreAsignatura,
        evaluationName,
         theme,
         questionType,
         numberOfQuestions,
         ));
        
      let coleccionPreguntas = await apisHandles.obtenerPreguntasExamen(idAsignatura, resp);
      console.log(coleccionPreguntas)
      console.log("Respuesta de crear examen interfaz: ", resp);
      if(resp) goToQuest()
      setLoading(false);
    }
    }catch(error) {
      console.error(error)
      setLoading(false);
    }
  }
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
        onValueChange={(itemValue) => { console.log(itemValue); setQuestionType((itemValue == 'Verdadero o falso') ? ('vf') : ('alternativa') )}}
        style={styles.picker}
      >
    <Picker.Item label="Selecciona un valor" value="" />
          {questionTypes.map((type) => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Cantidad de preguntas"
        keyboardType="numeric"
        value={numberOfQuestions}
        onChangeText={(text) => setNumberOfQuestions(parseInt(text, 10))}
      />
      <TextInput
        style={styles.input}
        placeholder ={`¿Qué tema de la asignatura ${nombreAsignatura} abordarás en la prueba?`}
        value={theme}
        onChangeText={(text) => setTheme(text)}
      />
      {loading ? (
        // Muestra un indicador de carga mientras la función se está ejecutando
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
      <TouchableOpacity style={styles.startButton} onPress = {handleStartEvaluation} >
        <Text style={styles.startButtonText}>Iniciar autoevaluación</Text>
      </TouchableOpacity>
      )}
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