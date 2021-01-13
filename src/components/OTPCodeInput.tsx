import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StyleProp,
  View,
  TextInput,
  NativeSyntheticEvent,
} from 'react-native';
import {primaryColor, borderColor} from '@root/colors';
import _ from 'lodash';

type OTPCodeInputProps = {
  autoFocus?: boolean;
  style?: StyleProp<{}>;
  numberOfCode: number;
  onCodeChange?: (code: string) => void;
  onFulfill?: (code: string) => void;
};

type StateData = {
  codeArr: Array<string>;
  currentIndex: number;
};

const OTPCodeInput = ({
  style,
  autoFocus,
  numberOfCode,
  onCodeChange,
  onFulfill,
}: OTPCodeInputProps) => {
  const initState: StateData = {
    codeArr: Array(numberOfCode).fill(''),
    currentIndex: 0,
  };
  const [state, setState] = useState<StateData>(initState);
  const [codeInputRefs, setCodeInputRefs] = useState<any[]>([]);

  useEffect(() => {
    setCodeInputRefs((refs) =>
      Array(numberOfCode)
        .fill(null)
        .map((_, i) => refs[i] || React.createRef()),
    );
  }, [numberOfCode]);

  const onFocus = (index: number) => {
    const newCodeArr = [...state.codeArr];
    const currentEmptyIndex = _.findIndex(newCodeArr, (c) => !c);

    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return setFocus(currentEmptyIndex);
    }

    for (const i in newCodeArr) {
      if (Number(i) >= index) {
        newCodeArr[i] = '';
      }
    }

    setState({
      codeArr: newCodeArr,
      currentIndex: index,
    });
    onCodeChange?.(newCodeArr.join(''));
  };

  const onInputCode = (character: string, index: number) => {
    const {codeArr, currentIndex} = state;
    const text = character.replace(/[^A-Za-z0-9]/i, '');
    const newCodeArr = [...codeArr];

    newCodeArr[index] = text;

    if (index === numberOfCode - 1) {
      const fullCode = newCodeArr.join('');
      onFulfill?.(fullCode);
      onCodeChange?.(fullCode);
      blur(currentIndex);
    } else {
      setFocus(currentIndex + 1);
    }

    setState({
      codeArr: newCodeArr,
      currentIndex: currentIndex + 1,
    });
  };

  const setFocus = (index: number) => {
    codeInputRefs[index].current.focus();
  };

  const blur = (index: number) => {
    codeInputRefs[index].current.blur();
  };

  const onKeyPress = (e: NativeSyntheticEvent<any>) => {
    if (e.nativeEvent.key === 'Backspace') {
      const {currentIndex, codeArr} = state;
      const newCodeArr = [...codeArr];
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      for (const i in newCodeArr) {
        if (Number(i) >= nextIndex) {
          newCodeArr[i] = '';
        }
      }
      onCodeChange?.(newCodeArr.join(''));
      setFocus(nextIndex);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {Array(numberOfCode)
        .fill(null)
        .map((_, id) => {
          return (
            <TextInput
              key={id}
              ref={codeInputRefs[id]}
              style={[
                styles.codeInput,
                state.currentIndex === id && styles.codeInputFilled,
                !!state.codeArr[id] && styles.codeInputFilled,
              ]}
              underlineColorAndroid="transparent"
              selectionColor={primaryColor}
              keyboardType="name-phone-pad"
              returnKeyType="done"
              autoFocus={autoFocus && id === 0}
              onFocus={() => onFocus(id)}
              value={state.codeArr[id] ? state.codeArr[id] : ''}
              onChangeText={(text) => onInputCode(text, id)}
              onKeyPress={(e) => onKeyPress(e)}
              maxLength={1}
            />
          );
        })}
    </View>
  );
};

export default OTPCodeInput;

const styles = StyleSheet.create({
  codeInputFilled: {
    borderBottomColor: primaryColor,
  },
  codeInput: {
    textAlign: 'center',
    borderBottomColor: borderColor,
    width: 40,
    marginRight: 16,
    fontSize: 20,
    height: 44,
    borderBottomWidth: 2,
  },
  textDisabled: {color: borderColor, paddingVertical: 8},
  text: {color: primaryColor},
  container: {
    // flex: 1,
    // alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 48,
    // paddingBottom: 24,
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
