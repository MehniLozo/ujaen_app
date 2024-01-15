import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, TextInput, ProgressBarAndroid , Modal , Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BurgerContent from './BurgerContent';
import { useNavigation } from '@react-navigation/native';
import { apisHandles } from '../APIs-handle';
/*import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BMenu from './components/BMenu';
*/
// import PassedExamsList from './PassedExams'; 
//import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';



// let quizData = [
//   { id: '1', subject: 'Math',  image: require('../images/tec.jpeg') },
//   { id: '2', subject: 'Science', image: require('../images/tec.jpeg') },
//   { id: '3', subject: 'Large Language Models LLMs',image: require('../images/tec.jpeg') },
//   { id: '4', subject: 'Management', image: require('../images/tec.jpeg') },
// ];
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
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      let respu = await Promise.resolve(apisHandles.obtenerAsignaturasUsuario());
      console.log(respu)
      const data = respu.map((asignatura) => ({
        id: asignatura.idAsignatura,
        subject: asignatura.nombreAsignatura,
        image: require('../images/tec.jpeg'),
      }));
      setQuizData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error al obtener las asignaturas del usuario:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goToExams = (id , subject) => {
    console.log(id,subject)
    navigation.navigate('SubjectsExams',{ id, subject });
  };
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    const newFilteredData = quizData.filter(item => item.subject.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredData(newFilteredData);
  }, [searchText, quizData]);

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
    onPress = {() => goToExams(item.id, item.subject)}>
      <Image source={item.image} style={styles.quizImage} />
      <Text style={styles.quizText}>{item.subject}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.icon} onPress={toggleMenu}>
          <Text>☰</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileIcon} onPress={() => console.log('Profile icon clicked')}>
          <Text style={styles.greetingText}>Hola Aziz!</Text>
          <Icon name="user" size={60} color="#888" />
        </TouchableOpacity>
      </View>

      {isMenuVisible && <Modal 
        isVisible={isMenuVisible}
        onBackdropPress={closeMenu}
        swipeDirection="left"
        onSwipeComplete={closeMenu}
        style={styles.burgerModal}
      >
        <BurgerContent onClose={closeMenu} />
      </Modal>}

      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderQuizCard}
        keyExtractor={(item) => item.id}
        style={styles.cardContainer}
      />

      <TouchableOpacity style={styles.floatingButton} onPress={() => setShowPopup(true)}>
        {/*<Text style={styles.buttonText}>+</Text>*/}
         <Icon name="pencil" size={20} color="white" backgroundColor="green"/>
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
            <Button title="Cancel"  color="#8BC34A" onPress={() => setShowPopup(false)} />
            <Button title="Add"  color="#8BC34A"  onPress={addSubject} />
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
  burgerModal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal:16,
    height: 60, 
  },
  icon: {
    padding: 10,
  },
  profileIcon:{
    flexDirection: 'row', 
    alignItems: 'center',
  },
  greetingText: {
    color: 'grey', 
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 30,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f7f7f7',
  },
  searchIcon:{
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,   
  },
  cardContainer: {
    padding: 20,
    
  },
  quizCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    width: '90%',
    alignSelf:'center'
  },
  quizImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  quizText: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },

    floatingButton: {
    color:"green",
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
    backgroundColor: '#8BC34A',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  popupInput: {
    height: 30,
    width:'80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
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
