import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const backgroundImage = require('../images/tec.jpeg');

const data = [{"id":1,"question":"Cual es el dispositivo mas utilizado","correct": true},
{"id":2,"question":"Cual es el dispositivo mas utilizado","correct": false}
];
const ResultsScreen = ({route}) => {
  const {achieved=5,numQuestions=10} = route
return (
    <View style={styles.passedQuestionSection}>

     <View style={styles.header}>
        <Text style = {styles.headerText}>
            Tu calificaccion es 
        </Text>
        <Text style={styles.score}>
            {achieved}/{numQuestions}
        </Text>
        {achieved >= numQuestions / 2 && <Text style = {styles.headerText}>
            Enhorabuena!!
        </Text>}
      </View>

      <View style={styles.separator} />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.passedQuestionItem}>
            <View style = {styles.questionDetail}>
            <Text>Preguna {item.id}</Text>
            <Text style = {styles.question}>{item.question}</Text>
            </View>
            <View style={styles.check}>
              {item.correct?  <Icon name="check" size={30} color="green" /> : 
              <Icon name="times" size={30} color="red" />}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
          <View style={styles.floatingContainer}>
      <TouchableOpacity style={styles.shareButton}>
        <Icon name="share-alt" size={24} color="white" />
      </TouchableOpacity>
     <View>
        <TouchableOpacity style={styles.rectangularButton}>
            <Text style={styles.buttonText}>Ver tabla de puntaje</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.rectangularButton}>
            <Text style={styles.buttonText}>Ir inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
   </View>
  );
};
const styles = StyleSheet.create({
  passedQuestionSection: {
    // marginTop: 16,
    flex: 1,
  },
  header:{
      backgroundColor: 'green',
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
      alignItems:'center'
  },
  headerText:{
    color: 'white'
  },
score: {
    color:'white',
    fontWeight: 'bold',  
    fontSize: 20,       
  },
  question: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerImage: {
    width: '100%',
    height: 150,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: '#fff',
  },
  filterList: {
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  selectedFilterItem:{
    backgroundColor: '#8BC34A',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  passedExamsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  passedQuestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  questionDetail: {
    flex: 1,
  },
  check: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontWeight: 'bold',
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 16,                  
    right: 16,                   
  },
  shareButton: {
    backgroundColor: 'grey',
    borderRadius: 50,            
    width: 50,                   
    height: 50,                  
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
   rectangularButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ResultsScreen;