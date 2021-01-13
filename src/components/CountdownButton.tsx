import React, {useEffect, useState} from 'react';
import {StyleSheet, StyleProp, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {primaryColor, borderColor} from '@root/colors';
import {RESEND_OPT_TIMEOUT} from '@root/configs';

type CountdownButtonProps = {
  title: string;
  style?: StyleProp<{}>;
};

const CountdownButton = ({title, style}: CountdownButtonProps) => {
  const [countdown, setCountdown] = useState(RESEND_OPT_TIMEOUT);
  const onPress = () => {
    setCountdown(RESEND_OPT_TIMEOUT);
  };

  useEffect(() => {
    if (countdown < 1) return;

    const id = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [countdown]);

  if (countdown > 0) {
    return (
      <Text style={styles.textDisabled}>{`${title} (${countdown}s)`}</Text>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CountdownButton;

const styles = StyleSheet.create({
  textDisabled: {color: borderColor, paddingVertical: 8},
  text: {color: primaryColor},
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
    borderColor: 'red',
    borderWidth: 1,
    alignSelf: 'stretch',
  },
  button: {paddingVertical: 8},
  buttonDisabled: {backgroundColor: borderColor},
});
