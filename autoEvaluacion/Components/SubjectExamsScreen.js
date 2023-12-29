import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const SubjectExamsScreen = () => {
  // Dummy data for passed exams
  const passedExamsData = [
    { id: '1', nombre:"Nombre Examen" , score: 80, type: 'Opcion multiple', date: '2023-01-15' },
    { id: '2', nombre:"Nombre Examen", score: 90, type: 'Verdadero o falso', date: '2023-02-10' },
    { id: '3', nombre:"Nombre Examen",score: 75, type: 'Abierta', date: '2023-03-05' },
  ];

return (
    <View style={styles.passedExamsSection}>
      <ImageBackground 
        source = {{uri: '../images/tec.jpeg'}}
        style = {styles.headerImage}
      >
        <TouchableOpacity>
          {/* return icon  */ }
        </TouchableOpacity>
      <Text style={styles.headerText}>Te encuentras entre el top X de estudiantes autoevluados en esta asignatura</Text>
      </ImageBackground>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterList}>
        <TouchableOpacity style={styles.filterItem}>
          <Text>Opcion multiple</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.separator} />

      <FlatList
        data={passedExamsData}
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
  }
});

export default SubjectExamsScreen;
