import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000AF',
  },
  indicator: {
    paddingVertical: 8,
  },
});

type Props = {
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const LoadingScreen = ({color, style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={color || 'white'} />
    </View>
  );
};

export default LoadingScreen;
