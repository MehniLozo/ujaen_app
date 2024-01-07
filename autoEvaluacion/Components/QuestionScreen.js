import React, { useState } from 'react';
//import Choice from './QuestionTypes/Choice'
import {View, Text, StyleSheet} from 'react-native';
import ArrowButton from '../utils/ArrowButton';
import Choice from './QuestionTypes/Choice';
import ParagForm from './QuestionTypes/ParagForm';

const question =  "Cual es el dispositivo mas utilizando?"
// const QuestionScreen = (questionNum = 1,questType = "choice",quest =question ,responseContent=choices) => {
const QuestionScreen = ({options,typeQuest, question, currentQuestion,totalQuestions,hasNext,hasPrec}) => {
  
  return(

    <View  style = {styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>
          {currentQuestion}/{totalQuestions}
        </Text>
        <Text style={styles.question}>{question}</Text>
      </View>

      {typeQuest === 1 ? (
        <Choice options={options} />
      ) : (
        <ParagForm />
      )}
        <View style = {styles.arrowButtonContainer}>
        {hasPrec && <ArrowButton direct="arrow-left" />}
        {hasNext && <ArrowButton direct = "arrow-right"/>}
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
})

export default QuestionScreen;