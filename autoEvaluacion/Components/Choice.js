import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';


const Choice = ( {options} ) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    //onSelect(option);
  };
  const optionss = ["El telefono movil","El ordenador domestico"]
  return (
    <View>

      {
        optionss.map((option,index) => (
          <View key = {option} style = {styles.optionContainer}> 
                      <CheckBox
                        key={index}
                        title={option}
                        checked={selectedOption === option}
                        onPress={() => setSelectedOption(option)}
                      />
          </View>
        ))
      }
    </View>

  );
};


    {/*<View style={styles.container}>
      <Text style={styles.title}>Choose One</Text>
      {options.map((option) => (
        <View key = {option} style = {styles.optionContainer}>
          <RadioButton value = {option}
            status={selectedOption == option ? 'checked':'unchecked'}
            onPress={() => handleSelect(option)}
            color="green" 
          />
          <Text style={styles.optionText}>{option}</Text>
        </View>
      ))}
    </View>*/}


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
 optionText: {
    fontSize: 16,
    marginLeft: 8,
    color: 'black',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

});

export default Choice;