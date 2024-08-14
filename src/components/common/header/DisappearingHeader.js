// CustomHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DisappearingHeader = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'blue',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
});

export default DisappearingHeader;
