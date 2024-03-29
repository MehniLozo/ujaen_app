import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet,Dimensions, TextInput, ProgressBarAndroid , Modal , Button} from 'react-native';
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InitialScreen = () => {
  
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);
  let [quizData, setQuizData] = useState([]);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');

  // Calcula el tamaño del icono proporcionalmente al ancho de la pantalla
  const iconSize = width * 0.1;
  const iconSizeB = width * 0.05;

  
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


  const fetchData2 = async (name) => {
    try {
      let respuesta = await Promise.resolve(apisHandles.AgregarAsignatura( name ));
      console.log(respuesta)
      // Verifica si la respuesta tiene éxito
    if (respuesta && respuesta.success) {
      console.log('Asignatura agregada con éxito');
      console.log('ID de la asignatura:', respuesta.asignatura.idAsignatura);
      return respuesta.asignatura;
    }else{
      console.log(`Error al crear la asignatura ${name}`)
    }
    } catch (error) {
      console.log("Error en FetchData 2");
    }
  }


  const addSubject = async () => {
    if (newSubject.trim() !== '') {
      const resultado = await fetchData2(newSubject);
      if (resultado){
        console.log(resultado)
        quizData = [...quizData, { id: resultado.idAsignatura, subject: resultado.nombreAsignatura, image: require('../images/tec.jpeg')}];
        setShowPopup(false);
        setFilteredData(quizData);
        setQuizData(quizData);
        
        
    }
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

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      // Cada 10 segundos, incrementa la rotación en 45 grados
      setRotation((prevRotation) => prevRotation + 45);
    }, 2000);

    return () => {
      // Limpia el intervalo al desmontar el componente
      clearInterval(rotationInterval);
    };
  }, []);


  const EliminarAsignatura = async (asignatura) => {
    try{
    // console.log("Eliminando la asignatura: ", asignatura.subject);
    await apisHandles.EliminarAsignatura(asignatura.id)
    console.log(22222222);
        quizData = quizData.filter(objeto => objeto.id !== asignatura.id);  
        console.log(quizData)
        setFilteredData(quizData);
        setQuizData(quizData);
    
  }
  catch (error){
    console.log("Error en el fetch eliminar asignaura en front")
  }
  }

  const renderQuizCard = ({ item }) => (
    <TouchableOpacity
      style={styles.quizCard}
      onPress={() => goToExams(item.id, item.subject)}
    >
      <Image source={item.image} style={styles.quizImage} />
      <View style={styles.container}>
        <Text style={styles.quizText}>{item.subject}</Text>
        <TouchableOpacity
          style={styles.check}
          onPress={() => {
            EliminarAsignatura(item);
          }}
        >
          <Icon name="times" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const [rotation, setRotation] = useState(0);




  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.icon} onPress={toggleMenu}>
        <Icon name="bars" size={30} color="#888" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileIcon} onPress={() => console.log('Profile icon clicked')}>
          <Text style={styles.greetingText}>Hola Aziz!</Text>
          <Icon name="user" size={30} color="#888" />
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

      <TouchableOpacity
        style={[styles.floatingButton, { transform: [{ rotate: `${rotation}deg` }] }]}
        onPress={() => setShowPopup(true)}
      >
        <Icon name="pencil" size={20} color="white" backgroundColor="green" />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={showPopup}>
        <View style={styles.popup}>
          <TextInput
            style={styles.popupInput}
            placeholder="Ingrese el nombre de la asignatura"
            placeholderTextColor="white"
            value={newSubject}
            onChangeText={(text) => setNewSubject(text)}
          />
          <View style={styles.popupButtons}>
            <Button title="Cancelar"  color="#006D38" onPress={() => setShowPopup(false)} />
            <Button title="Agregar"  color="#006D38"  onPress={addSubject} />
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
    padding: 0,
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
    position: 'fixed',
    bottom: 100,
    left: 40,
    backgroundColor: '#006D38',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
    check: {
    alignItems: 'flex-end',
    position: "absolute",
    right: 10,
    top: 10,
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
    backgroundColor: '#006D38',
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
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'white',
    marginBottom: 10,
  },

    popupButtons: {
    flexDirection: 'row',
    
    justifyContent: 'space-around',
    width: '80%',
  },
});
export default InitialScreen;
