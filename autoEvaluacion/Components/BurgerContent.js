// DrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BurgerContent = ({ onClose }) => {
  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity style={styles.drawerItem} onPress={() => console.log('Item 1 clicked')}>
        <Text>Notficaciones</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => onClose()}>
        <Text>Mi Universidad</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 0.5,
    backgroundColor: '#fff',
    paddingTop: 50,  
    paddingLeft: 20,
  },
  drawerItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default BurgerContent;
