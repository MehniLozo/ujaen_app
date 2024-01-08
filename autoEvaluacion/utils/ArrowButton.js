import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ArrowButton = ({direct}) => {
   return (
    <View style={{ alignItems: 'flex-end', paddingRight: 20 }}>
      <TouchableOpacity onPress={() => console.log('Button pressed')}>
        <Icon name={direct} size={30} color="#808080" />
      </TouchableOpacity>
    </View>
  );
};

export default ArrowButton;