import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const backgroundImage = require('../images/tec.jpeg');

const ResultsScreen = ({ route }) => {
  const { achieved = 5, numQuestions = 10 } = route;  // Agrega newData a las props

  const { idAsignatura , idExamen , preguntasExamen , score} = route.params;
console.log({ idAsignatura , idExamen , preguntasExamen , score});
  const [data, setData] = useState([
    { "id": 1, "question": "Cual es el dispositivo mas utilizado", "correct": true },
    { "id": 2, "question": "Cual es el dispositivo mas utilizado", "correct": false }
  ]);

  // let totalCorrectas = 0;
  // let cantPreguntas = 0;
let [totalCorrectas, setTotalCorrectasotalCorrectas] = useState(0);
let [cantPreguntas, setCantPreguntas] = useState(0);

  // Agrega esta función para actualizar data con nuevos datos
  const updateData = (newData) => {
    console.log(newData);
      // Variable para acumular la cantidad de calificaciones correctas
  
    const updatedData = newData.map(item => {
      // Verifica si la calificación es mayor a 1 y actualiza la variable totalCorrectas
      if (item.calificacionPregunta > 1) {
        totalCorrectas += 1;
      }
      
      cantPreguntas += 1;
      return {
        id: item.idPregunta,
        question: item.enunciadoPregunta,
        calificacionPregunta: item.calificacionPregunta,
        justificacion: item.justificacion,
        respuestaAlmacenada: item.respuestaAlmacenada,
        cuerpoPregunta: item.cuerpoPregunta,
        tipoPregunta: item.tipoPregunta,
      };
    });
    console.log(cantPreguntas , totalCorrectas)
    setData(updatedData);
    // setCantPreguntas(cantPreguntas);
    // setTotalCorrectas(totalCorrectas);
  }


  // Llama a updateData cuando recibas nuevos datos
  useEffect(() => {
    if (preguntasExamen) {
      updateData(preguntasExamen);
    }
  }, [preguntasExamen]);

  useEffect(() => {
    setCantPreguntas(cantPreguntas)
    setTotalCorrectasotalCorrectas(totalCorrectas)
  }, [data])

  
  console.log(cantPreguntas,totalCorrectas)

  return (
    <View style={styles.passedQuestionSection}>

     <View style={styles.header}>
        <Text style = {styles.headerText}>
            Tu calificaccion es {score}
        </Text>
        <Text style={styles.score}>
            {totalCorrectas}/{cantPreguntas}
        </Text>
        {totalCorrectas > cantPreguntas / 2 && <Text style = {styles.headerText}>
            Enhorabuena!!
        </Text>}
      </View>

      <View style={styles.separator} />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.passedQuestionItem}>
            <View style = {styles.questionDetail}>
            <Text>({item.id})</Text>
            <Text style = {styles.question}>{item.question}</Text>
            </View>
            <View style={styles.check}>
              {item.calificacionPregunta == 2 ?  <Icon name="check" size={30} color="green" /> : (item.calificacionPregunta == -2 ? <Icon name="times" size={30} color="red" /> : <Icon name="question" size={30} color="gray" />)
              }
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
          <View style={styles.floatingContainer}>
      {/* <TouchableOpacity style={styles.shareButton}>
        <Icon name="share-alt" size={24} color="white" />
      </TouchableOpacity> */}
     <View>
        {/* <TouchableOpacity style={styles.rectangularButton}>
            <Text style={styles.buttonText}>Ver tabla de puntaje</Text>
        </TouchableOpacity> */}
        
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