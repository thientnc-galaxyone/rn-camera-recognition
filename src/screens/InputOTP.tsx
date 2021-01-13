import React from 'react';
import {StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import {Toast, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {primaryColor, borderColor} from '@root/colors';
import {
  KeyboardAvoidingView,
  CountdownButton,
  OTPCodeInput,
} from '@root/components';
import {Routes} from '@root/navigators/Routes';
import {SUBMIT_OPT_TIMEOUT} from '@root/configs';
import {useStores} from '@root/stores';

const InputOTP = () => {
  const {navigate, goBack} = useNavigation();
  const {dataStore} = useStores();
  const changeNumberPress = () => {
    dataStore.updatePhoneNumber('');
    goBack();
  };
  const onFulfill = (code: string) => {
    console.log('onFulfill, code: ', code);
    navigate(Routes.loading.name);
    setTimeout(() => {
      navigate(Routes.home.name);
      Toast.show({text: 'OPT code is submitted successfully', type: 'success'});
    }, SUBMIT_OPT_TIMEOUT);
  };

  return (
    <KeyboardAvoidingView>
      <View>
        <Text style={{textAlign: 'center'}}>
          {'Input your OPT code sent via SMS'}
        </Text>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          {dataStore.phoneNumber}
        </Text>
        <OTPCodeInput autoFocus numberOfCode={6} onFulfill={onFulfill} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={changeNumberPress}>
          <Text style={styles.text}>{'Change number'}</Text>
        </TouchableOpacity>
        <CountdownButton title={'Resend OPT'} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Platform.select({ios: 0, android: 24}),
    alignSelf: 'stretch',
  },
  button: {paddingVertical: 8},
  buttonDisabled: {backgroundColor: borderColor},
  text: {color: primaryColor},
});
