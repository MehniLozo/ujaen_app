import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, TextInput, ProgressBarAndroid , Modal , Button} from 'react-native';
/*import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BMenu from './components/BMenu';
*/
// import PassedExamsList from './PassedExams'; 
//import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';


let quizData = [
  { id: '1', subject: 'Math',  image: require('../images/tec.jpeg') },
  { id: '2', subject: 'Science', image: require('../images/tec.jpeg') },
  { id: '3', subject: 'Large Language Models LLMs',image: require('../images/tec.jpeg') },
  { id: '4', subject: 'Management', image: require('../images/tec.jpeg') },
];
/*
const DrawerContent = () => (
  <View style={styles.drawerContent}>
    <TouchableOpacity style={styles.drawerButton}>
      <Text>Button 1</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.drawerButton}>
      <Text>Button 2</Text>
    </TouchableOpacity>
  </View>
);
*/

const InitialScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [newSubject, setNewSubject] = useState('');


  useEffect(() => {
    const newFilteredData = quizData.filter(item => item.subject.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredData(newFilteredData);
  }, [searchText]);

  const addSubject = () => {
    if (newSubject.trim() !== '') {

      quizData = [...quizData, { id: (quizData.length + 1).toString(), subject: newSubject, image: require('../images/tec.jpeg')}];
      setNewSubject('');
      setShowPopup(false);

      setFilteredData(quizData.filter(item => item.subject.toLowerCase().includes(searchText.toLowerCase())));
    }
  };


  const examsData = [
    { id: '1', subject: 'Math', image: require('../images/tec.jpeg') },
    { id: '2', subject: 'Science', image: require('../images/tec.jpeg') },
    { id: '3', subject: 'Large Language Models LLMs', image: require('../images/tec.jpeg') },
    { id: '4', subject: 'Management', image: require('../images/tec.jpeg') },
  ];

  const handleThemePress = (themeId) => {
    setSelectedThemeId(themeId);
  };


  const renderQuizCard = ({ item }) => (
    <TouchableOpacity style={styles.quizCard}
    onPress = {() => handleThemePress(item.id)}>
      <Image source={item.image} style={styles.quizImage} />
      <Text style={styles.quizText}>{item.subject}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.icon} onPress={() => console.log('Burger menu clicked')}>
          {/* Add your burger menu icon here */}
          <Text>☰</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => console.log('Profile icon clicked')}>
          {/* Add your profile icon here */}
          <Text>Welcome</Text>
        </TouchableOpacity>
        <Text style={styles.greetingText}>Hello Aziz</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Quiz Cards */}
      <FlatList
        data={filteredData}
        renderItem={renderQuizCard}
        keyExtractor={(item) => item.id}
        style={styles.cardContainer}
      />

      <TouchableOpacity style={styles.floatingButton} onPress={() => setShowPopup(true)}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

     <Modal animationType="slide" transparent={true} visible={showPopup}>
        <View style={styles.popup}>
          <TextInput
            style={styles.popupInput}
            placeholder="Enter Subject Name"
            value={newSubject}
            onChangeText={(text) => setNewSubject(text)}
          />
          <View style={styles.popupButtons}>
            <Button title="Cancel" onPress={() => setShowPopup(false)} />
            <Button title="Add" onPress={addSubject} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    padding: 10,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
  cardContainer: {
    padding: 16,
  },
  quizCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  quizImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  quizText: {
    padding: 10,
    fontSize: 16,
  },

    floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

    buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

    popup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },

    popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default InitialScreen;
