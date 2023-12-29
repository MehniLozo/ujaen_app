import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const ThemeList = ({ subject, onClose }) => {
  // Dummy data for themes (replace it with your actual data)
  const [selectedThemes, setSelectedThemes] = useState([]);
  const themesData = [
    { id: '1', name: 'Theme 1' },
    { id: '2', name: 'Theme 2' },
    { id: '3', name: 'Theme 3' },
  ];

  const toggleThemeSelection = (themeId) => {
    setSelectedThemes((prevSelectedThemes) => {
      if (prevSelectedThemes.includes(themeId)) {
        return prevSelectedThemes.filter((id) => id !== themeId);
      } else {
        return [...prevSelectedThemes, themeId];
      }
    });
  };
  const isThemeSelected = (themeId) => selectedThemes.includes(themeId);
  
  return (
    <View style = {styles.container}>
      <View style = {styles.header}>
        <Text style={styles.headerText}> Selecciona los temas que quieres probar </Text>
      </View>
      <FlatList 
        data = {themesData}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.themeItem}
            onPress={() => toggleThemeSelection(item.id)}
          >
          <View style={styles.checkboxContainer}>
            {isThemeSelected(item.id) && <View style={styles.checkbox} />}
          </View>
          <Text style={styles.themeText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        />
        <TouchableOpacity style = {styles.floatingButton}>
          <Text style={styles.buttonText}>Configurar Autoevaluacion </Text>
        </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:16,
    backgroundColor: '#fff',
  },
  header:{
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  themeItem: {
    flexDirecion: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 12,
    height: 12,
    // backgroundColor: 'blue', 
    borderRadius: 2,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'green', 
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
    color: 'green',
    textAlign: 'center',
  },
  themeText:{
    fontSize: 16,
  },
});

export default ThemeList;
