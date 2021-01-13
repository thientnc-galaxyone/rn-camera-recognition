import React, {PropsWithChildren} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
// import {useHeaderHeight} from '@react-navigation/stack';
import {useSafeArea} from 'react-native-safe-area-context';

const KeyboardAvoidingView = ({children}: PropsWithChildren<{}>) => {
  // const headerHeight = useHeaderHeight();
  const isIOS13 = Platform.OS === 'ios' && parseInt(Platform.Version.toString(), 10) > 12;
  const {bottom} = useSafeArea();
  const Container = Platform.select<any>({
    ios: RNKeyboardAvoidingView,
    android: View,
  });
  const modal = false;
  return (
    <Container
      behavior="padding"
      keyboardVerticalOffset={
        Platform.OS === 'ios'
          ? 8 + (modal && isIOS13 ? (bottom || 16) + 16 : 0)
          : 4
      }
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>{children}</View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default KeyboardAvoidingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    justifyContent: 'space-between',
  },
});
