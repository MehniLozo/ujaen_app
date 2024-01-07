import React, { useState } from 'react';
//import Choice from './QuestionTypes/Choice'
import {View, Text, StyleSheet} from 'react-native';
import ArrowButton from '../utils/ArrowButton';
import Choice from './QuestionTypes/Choice';

const question =  "Cual es el dispositivo mas utilizando?"
// const QuestionScreen = (questionNum = 1,questType = "choice",quest =question ,responseContent=choices) => {
const QuestionScreen = ({options, question, currentQuestion,totalQuestions}) => {
  
  return(

    <View  style = {styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>
          {currentQuestion}/{totalQuestions}
        </Text>
        <Text style={styles.question}>{question}</Text>
      </View>
      <Choice options = {options}/>
      <ArrowButton/>
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
})

export default QuestionScreen;