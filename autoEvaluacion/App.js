import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer style={styles.container}>
    <StatusBar backgroundColor = '#006D38' />
  <Stack.Navigator initialRouteName="Home">
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
