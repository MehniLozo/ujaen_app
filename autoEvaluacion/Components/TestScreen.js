import React, { useState,useEffect  } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
const EvaluationScreen = () => {
  const questions = [
    {
      id: 1,
      question: '¿Que es react-native?',
      options: ['Framework', 'Libreria', 'Lenguaje de programacion', 'Compilador ofical de Android'],
      respuesta:0,
    },
    {
      id: 2,
      question: '¿Que es react?',
      options: ['Framework', 'Libreria', 'Lenguaje de programacion', 'Solamente JSX'],
      respuesta:1,
    },
    {
      id: 3,
      question: 'Describa en pocas palabras, ¿Que es JSX?',
      isTextInput: true,
      respuesta:"es una extensión de JavaScript, junto con DOM",
    },
    {
        id: 4,
        question: '¿Cual es el SO mas utilizado para moviles?',
        options: ['iOS', 'Windos phone', 'Android', 'Linux'],
        respuesta:2,
      },
      {
        id: 5,
        question: 'Describa en pocas palabras, ¿Como surgio Andorid?',
        isTextInput: true,
        respuesta:"sistema operativo de camara",
      },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [textInputValue, setTextInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [selectedIndexes, setSelectedIndexes] = useState(Array(questions.length).fill(null));
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const updateSelectedAnswers = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answer;
    setSelectedAnswers(newSelectedAnswers);
    console.log(newSelectedAnswers)
  };
  const updateSelectedIndexes = (index) => {
    const newSelectedIndexes = [...selectedIndexes];
    newSelectedIndexes[currentQuestion] = index;
    setSelectedIndexes(newSelectedIndexes);
    console.log(newSelectedIndexes)
  };
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    Alert.alert(
        'Confirmar',
        '¿Estás seguro de que deseas terminar la evaluación?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: () => {
              var correct=0;
              for( var i=0;i<questions.length;i++){
                if(selectedIndexes[i]== questions[i].respuesta &&selectedIndexes[i]!=null &&  !questions[i].isTextInput){
                  correct+=1;
                  console.log("entro en el if")
                }
                else if(questions[i].isTextInput){
                  
                }
              }
              console.log('Evaluación terminada');
              console.log('Respuestas:', selectedAnswers);
              console.log('Correctas', correct);
            },
          },
        ],
        { cancelable: true }
      );
  };
  const handleOptionSelect = (option,index) => {
    setSelectedOption(option);
    updateSelectedAnswers(option);
    updateSelectedIndexes(index);
  };
  const handleOptionWrite = (option) => {
    setTextInputValue(option);
    updateSelectedAnswers(option);
  };
  const renderOptions = (options) => {
    return options.map((option, index) => (
        <View style={styles.radioGroup}> 
        <View style={styles.radioButton}> 
        <RadioButton style={{display: 'flex', justifyContent: 'center'}}
         key={index}
                        value={option}
                        status={selectedAnswers[currentQuestion] === option ?  
                                'checked' : 'unchecked'} 
                        onPress={() => handleOptionSelect(option,index)}
                        color="#007BFF"
                    /> 
                    <Text style={styles.radioLabel}> 
                        {option}
                    </Text> 
      </View>
      </View>
    ));
  };

  const renderQuestion = () => {
    const currentQ = questions[currentQuestion];
    if (currentQ.isTextInput) {
      return (
        <>
        <Text style={styles.question}>{currentQ.question}</Text>
        <View style={styles.textInputContainer}>
        <TextInput
            style={styles.textInput}
            multiline={true}
            placeholder="Escribe tu respuesta"
            onChangeText={(text) => handleOptionWrite(text)}
            value={selectedAnswers[currentQuestion]}
          />
        </View>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.question}>{currentQ.question}</Text>
          {currentQ.options && currentQ.options.length > 0 && renderOptions(currentQ.options)}
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderQuestion()}
      {(currentQuestion > 0 ) && (
      <TouchableOpacity
        style={[styles.floatingButton, { left: 16 }]}
        onPress={handlePrevious}
        disabled={currentQuestion === 0}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>)}
      {(currentQuestion >= Math.floor(questions.length / 2) || currentQuestion === questions.length - 1) && (
        <TouchableOpacity
          style={[styles.floatingButton, styles.finishButton]}
          onPress={handleFinish}
        >
          <Text style={styles.buttonText}>Terminar</Text>
        </TouchableOpacity>
      )}
       {(currentQuestion < Math.floor(questions.length-1) ) && (
      <TouchableOpacity
        style={[styles.floatingButton, { right: 16 }]}
        onPress={ handleNext}
      >
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0,
  },
  question: {
    flex: 1,
    fontSize: 20,
    maxHeight:70,
    minHeight:70,
    alignItems: 'flex-end', 
    textAlign: 'center',
    justifyContent: 'flex-end', 
    backgroundColor: '#006D38', 
    color:'white',
    width:'100%',
    marginBottom: 0,
  },
  radioGroup: { 
    flex: 1,
    flexDirection: 'row', 
    textAlign: 'center',
    maxHeight:60,
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
    marginTop: 3, 
    borderRadius: 8, 
    backgroundColor: 'transparent', 
    padding: 10, 
    elevation: 0,  
}, 
radioButton: { 
    flex: 1,
    width:'100%',
    flexDirection: 'row', 
    textAlign: 'center',
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
}, 
radioLabel: { 
    marginLeft: 8, 
    fontSize: 16, 
    textAlign: 'center',
    alignItems: 'flex-start',
    color: '#333', 
}, 
  textInputContainer: {
    width: '100%',
    marginBottom: 16,
    padding: 20,
  },
  textInput: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#006D38',
  },
  finishButton: {
    right: 'auto',
    left: 'auto',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:20,
  },
});

export default EvaluationScreen;