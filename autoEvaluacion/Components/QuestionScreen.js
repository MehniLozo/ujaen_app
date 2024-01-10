import React, { useState } from 'react';
//import Choice from './QuestionTypes/Choice'
import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import ArrowButton from '../utils/ArrowButton';
import Choice from './QuestionTypes/Choice';
import ParagForm from './QuestionTypes/ParagForm';
import { useNavigation } from '@react-navigation/native';

// const QuestionScreen = (questionNum = 1,questType = "choice",quest =question ,responseContent=choices) => {
//const QuestionScreen = ({options,typeQuest, question, currentQuestion,totalQuestions,hasNext,hasPrec}) => {
const QuestionScreen = ({route}) => {

  const { options, question, typeQuest, currentQuestion, totalQuestions, hasNext, hasPrec } = route.params; 
  const navigation = useNavigation();

  const secondQuest =  "Describe el entorno android"
  
  const goToFollow = () => {
    navigation.navigate('Question', {options:null,question:secondQuest,typeQuest: 2, currentQuestion:5,totalQuestions:5,hasNext:false,hasPrec:true});
  };
  const goToPrec = () => {
    navigation.navigate('Question', {options,question,typeQuest: 1, currentQuestion:1,totalQuestions:5,hasNext:true,hasPrec:false});
  }
  const goToResult = () => {
    navigation.navigate('Results');
  }

  return(

    <View  style = {styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
        <Text style={styles.questionNumber}>
          {currentQuestion}/{totalQuestions}
        </Text>
        </View>
        <Text style={styles.question}>{question}</Text>
      </View>

      {typeQuest === 1 ? (
        <Choice options={options} />
      ) : (
        <ParagForm />
      )}
        <View style={styles.buttonContainer}>
        {currentQuestion > totalQuestions /2 && <TouchableOpacity
            style={styles.customButton}
            underlayColor="darkgreen" 
            onPress={goToResult}
            activeOpacity={0.6}
          >
            <Text style={styles.buttonText}>Finalizar</Text>
             </TouchableOpacity>}
        </View> 
        <View style = {styles.arrowButtonContainer}>
        {hasPrec ? (<TouchableOpacity onPress={goToPrec} activeOpacity={0.6} >
          <ArrowButton direct="arrow-left" />
          </TouchableOpacity>): <View></View> }
        {hasNext && 
        (<Pressable onPress={goToFollow}> 
            <ArrowButton direct = "arrow-right"/> 
          </Pressable>)
        }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
  },
  header:{
      backgroundColor: 'green',
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
      justifyContent: 'center',
      alignItems: 'center' 
  },
  headerContent:{
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  question:{
    color:'white'
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "white"
  },
  arrowButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  customButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default QuestionScreen;