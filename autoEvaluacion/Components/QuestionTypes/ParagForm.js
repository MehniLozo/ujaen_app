import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const ParagForm = () => {
  const [text, setText] = useState('');

  const handleTextChange = (inputText) => {
    setText(inputText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Su respuesta aqui..."
        value={text}
        onChangeText={handleTextChange}
      />
      <Text style={styles.counterText}>
        {text.length}/120
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    fontSize: 16,
  },
  counterText: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right',
    color: '#808080',
  },
});

export default ParagForm;
