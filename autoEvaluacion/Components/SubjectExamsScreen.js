import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';

const backgroundImage = require('../images/tec.jpeg');

const SubjectExamsScreen = () => {
  // Dummy data for passed exams
  const passedExamsData = [
    { id: '1', nombre:"Nombre Examen" , score: 80, type: 'Opcion multiple', date: '2023-01-15' },
    { id: '2', nombre:"Nombre Examen", score: 90, type: 'Verdadero o falso', date: '2023-02-10' },
    { id: '3', nombre:"Nombre Examen",score: 75, type: 'Abierta', date: '2023-03-05' },
  ];

  const [selectedFilter, setSelectedFilter] = useState(null);
  const filterOptions = ['Opcion multiple', 'Verdadero o falso', 'Abierta'];
  const [filteredExams, setFilteredExams] = useState(passedExamsData);
  
  useEffect(() => {
    if (selectedFilter) {
      const updatedFilteredExams = passedExamsData.filter(
        (exam) => exam.type === selectedFilter
      );
      setFilteredExams(updatedFilteredExams);
    } else {
      setFilteredExams(passedExamsData); 
    }
  }, [selectedFilter]);

return (
    <View style={styles.passedExamsSection}>
      <ImageBackground 
        source = {backgroundImage}
        style = {styles.headerImage}
      >
        <TouchableOpacity>
          {/* return icon  */ }
        </TouchableOpacity>
      <Text style={styles.headerText}>Te encuentras entre el top X de estudiantes autoevluados en esta asignatura</Text>
      </ImageBackground>

      <View style={styles.filterList}>
        {filterOptions.map((filter,index) => (
          <TouchableOpacity 
            key = {index}
            style={[
              styles.filterItem,
              selectedFilter === filter && 
              styles.selectedFilterItem
            ]}
            onPress={() => {setSelectedFilter(prevFilter => prevFilter === filter ? null : filter)}}
            >
            <Text>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.separator} />

      <FlatList
        data={filteredExams}
        renderItem={({ item }) => (
          <View style={styles.passedExamItem}>
            <View style = {styles.examDetail}>
            <Text>{item.nombre}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Date: {item.date}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Score: {item.score}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity 
        style={styles.floatingButton} >
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
  backgroundColor: '#8BC34A',
  alignItems: 'center',
  justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default SubjectExamsScreen;
