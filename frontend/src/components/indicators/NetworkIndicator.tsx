import React from 'react';
import { View, Text } from 'react-native';

const NetworkIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Wi-Fi disconnected</Text>
    </View>
  );
};

export default NetworkIndicator;