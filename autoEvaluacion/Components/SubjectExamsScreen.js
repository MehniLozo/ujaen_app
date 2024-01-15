import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apisHandles } from '../APIs-handle';

const backgroundImage = require('../images/tec.jpeg');

const SubjectExamsScreen = ({ route }) => {     //  NEW
  // Dummy data for passed exams
  const navigation = useNavigation(); //    NEW
  const idAsignatura = route.params.id;   //NEW
  const nombreAsignatura = route.params.subject;   //NEW

  //  console.log(idAsignatura , nombreAsignatura)
  
   const fetchData = async () => {
    try {
      const respu = await apisHandles.ObtenerExamenesAsignatura(nombreAsignatura);
      
      const data = respu.map((examen) => ({
        score: examen.calificacionExamen,
        estado: examen.estado,
        date: examen.fecha,
        id: examen.idExamen,
        nombre: examen.nombreExamen,
        preguntasExamen: examen.preguntasExamen,
        temaExamen: examen.temaExamen,
        type: examen.tipoPreguntaExamen,
      }));
      setPassedExamsData(data);
      setFilteredExams(data);
    } catch (error) {
      console.error('Error al obtener los examenes de la asignatura:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  
  const goToQuestions = (idExamen, preguntasExamen) => {
    //  ELEGIR LOS ATRIBUTOS QUE DESEA PASARLE A LA SIGUIENTE VENTANA (COMPONENTE) QUE DEBE SER DE REVISAR PREGUNTAS DEL EXAMEN YA REALIZADO
    navigation.navigate('Results', { idAsignatura , idExamen , preguntasExamen } );   //  SUSTITUIR THEMES POR LA VENTANA QUE CORRESPONDA A PREGUNTAS
  };

  //  ESTA PUEDE SER UNA VENTANA PARA RESOLVER LA PRUEBA
  const goToResolve = (idExamen, preguntasExamen) => {
    //  ELEGIR LOS ATRIBUTOS QUE DESEA PASARLE A LA SIGUIENTE VENTANA (COMPONENTE) QUE DEBE SER DE RESOLVER PREGUNTAS DEL EXAMEN  SIN HACER
    navigation.navigate('Test', { idAsignatura , idExamen , preguntasExamen } );   //  SUSTITUIR THEMES POR LA VENTANA QUE CORRESPONDA A PREGUNTAS
  };


  const goToThemes = () => {
    navigation.navigate('Themes');
  };

  // let passedExamsData = [
  //   { id: '1', nombre:"Nombre Examen" , score: 80, type: 'Opcion multiple', date: '2023-01-15' },
  //   { id: '2', nombre:"Nombre Examen", score: 90, type: 'Verdadero o falso', date: '2023-02-10' },
  //   { id: '3', nombre:"Nombre Examen",score: 75, type: 'Abierta', date: '2023-03-05' },
  // ];

  const [passedExamsData, setPassedExamsData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const filterOptions = ['Alternativas', 'Verdadero o falso'];
  const [filteredExams, setFilteredExams] = useState(null);
  
  useEffect(() => {
    if (selectedFilter) {
      const updatedFilteredExams = passedExamsData.filter(
        (exam) => exam.type === selectedFilter
      );
      setFilteredExams(updatedFilteredExams);
    } else {
      setFilteredExams(passedExamsData); 
    }
  }, [selectedFilter , passedExamsData]);

return (
  <View style={styles.passedExamsSection}>
    <ImageBackground source={backgroundImage} style={styles.headerImage}>
      <TouchableOpacity>{/* return icon  */}</TouchableOpacity>
      <Text style={styles.headerText}>
        Te encuentras entre el top X de estudiantes autoevaluados en esta
        asignatura
      </Text>
    </ImageBackground>

    <View style={styles.filterList}>
      {filterOptions.map((filter, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.filterItem,
            selectedFilter === filter && styles.selectedFilterItem,
          ]}
          onPress={() => {
            setSelectedFilter((prevFilter) =>
              prevFilter === filter ? null : filter
            );
          }}
        >
          <Text>{filter}</Text>
        </TouchableOpacity>
      ))}
    </View>

    <View style={styles.separator} />

    <FlatList
      data={filteredExams}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.quizCard}
          onPress={() => {( item.estado.includes("Terminado")) ? goToQuestions(item.id, item.preguntasExamen) : goToResolve(item.id , item.preguntasExamen) }} // DEFINIR goToResolve
        >
          <View style={styles.passedExamItem}>
            <View style={styles.examDetail}>
              <Text>{item.nombre}</Text>
              <Text>Type: {item.type}</Text>
              <Text>Date: {item.date}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Score: {item.score}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
    <TouchableOpacity style={styles.floatingButton} onPress={goToThemes}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  </View>
);
};
const styles = StyleSheet.create({
  passedExamsSection: {
    // marginTop: 16,
    flex: 1,
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
  passedExamItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  examDetail: {
    flex: 1,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontWeight: 'bold',
  },
  floatingButton: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#006D38',
  alignItems: 'center',
  justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default SubjectExamsScreen;
