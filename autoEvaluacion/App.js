import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,LogBox  } from 'react-native';
import SingInScreen from './Components/SingInScreen';
import HomeScreen from './Components/HomeScreen';
import RestartScreen from './Components/RestartScreen';
import TestScreen from './Components/TestScreen';
import ThemeScreen from './Components/ThemeList';
import SubjectExamsScreen from './Components/SubjectExamsScreen';
import QuestionScreen from './Components/QuestionScreen';
import ConfigEvaluation from './Components/ConfigEvaluation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from './Components/InitialScreen';
import SubjectExamsScreen from './Components/SubjectExamsScreen';
import ResultsScreen from './Components/ResultsScreen';
import QuestionScreen from './Components/QuestionScreen';
import ThemeList from './Components/ThemeList';
import EvaluationConfigScreen from './Components/ConfigEvaluation';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer style={styles.container}>
    <StatusBar backgroundColor = '#006D38' />
  <Stack.Navigator initialRouteName="Subjects">
    <Stack.Screen style={styles.container} options={{ title: '', headerStyle: {
            backgroundColor: '#006D38'},headerTitleStyle: {
              color: 'white'
            },headerTintColor: 'white' }} name="Home" component={HomeScreen} />
    <Stack.Screen  options={{ title: 'Inicio de Sesion', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} style={styles.container} name="SingIn" component={SingInScreen} />
    <Stack.Screen  options={{ title: 'Inicio de Sesion', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} style={styles.container} name="Theme" component={ThemeScreen} />
    <Stack.Screen  options={{ title: 'Inicio de Sesion', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} style={styles.container} name="SubjectExam" component={SubjectExamsScreen} />
    <Stack.Screen  options={{ title: 'Inicio de Sesion', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} style={styles.container} name="QuestionScreen" component={QuestionScreen} />
    <Stack.Screen  options={{ title: 'Inicio de Sesion', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} style={styles.container} name="ConfigEvaluation" component={ConfigEvaluation} />
    <Stack.Screen  options={{ title: 'Recuperacion', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} name="Restart" component={RestartScreen} />
    <Stack.Screen  options={{ title: 'Evaluacion',headerLeft: null, headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} name="Test" component={TestScreen} />
    <Stack.Screen 
      options={{ title: 'Subjects', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} name="Subjects" component={InitialScreen}
    />
    <Stack.Screen 
      options={{ title: 'SubjectsExams', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} name="SubjectsExams" component={SubjectExamsScreen}
    />
    <Stack.Screen 
      options={{ title: 'Selecciona los temas que quieres probar ', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} name="Themes" component={ThemeList}
    />
    <Stack.Screen 
      options={{ title: 'Configura tu evaluacion ', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} name="EVConfig" component={EvaluationConfigScreen}
    />
    <Stack.Screen 
      options={{ title: 'Question', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} name="Question" component={QuestionScreen}
    />
    <Stack.Screen 
      options={{ title: 'results', headerStyle: {
            backgroundColor: '#006D38'
         },headerTitleStyle: {
          color: 'white'
        },headerTintColor: 'white' }} name="Results" component={ResultsScreen}
    />
  </Stack.Navigator>
  
  </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
