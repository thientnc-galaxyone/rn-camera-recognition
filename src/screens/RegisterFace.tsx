import React, {useState} from 'react';
import {StyleSheet, View, Image, TextInput, ScrollView} from 'react-native';
import {Button, Text, Toast} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {primaryColor} from '@root/colors';
import {Routes} from '@root/navigators/Routes';
import {Camera, KeyboardAvoidingView} from '@root/components';
import {useStores} from '@root/stores';

type ResultViewProps = {
  uri: string;
};
const ResultView = ({uri}: ResultViewProps) => {
  const {navigate} = useNavigation();
  const {dataStore} = useStores();
  const [name, setName] = useState('');
  const submit = () => {
    if (dataStore.isDuplicatedName(name)) {
      Toast.show({
        text: `${name} has already registered!!!`,
        type: 'danger',
      });
      return;
    }
    navigate(Routes.loading.name);
    setTimeout(() => {
      dataStore.addFaceData({uri, name});
      navigate(Routes.home.name);
    }, 2000);
  };
  return (
    <KeyboardAvoidingView>
      <ScrollView
        style={{alignSelf: 'stretch'}}
        keyboardShouldPersistTaps="handled">
        <Image style={{height: 300}} source={{uri}} resizeMode="contain" />
        <View style={{flex: 1, paddingHorizontal: 32, marginTop: 32}}>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Type name to save"
            autoFocus
            selectionColor={primaryColor}
            onChangeText={(text) => {
              setName(text);
            }}
            underlineColorAndroid="transparent"
            onSubmitEditing={submit}
          />
          <Button style={styles.button} onPress={submit}>
            <Text>SAVE</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const RegisterFace = () => {
  const [uri, setUri] = useState('');
  const onTakePicture = (_uri: string | null) => {
    console.log(_uri);
    setUri(_uri || '');
  };

  if (uri) {
    return <ResultView uri={uri} />;
  }
  return (
    <View style={styles.container}>
      <Camera onTakePicture={onTakePicture} />
    </View>
  );
};

export default RegisterFace;

const styles = StyleSheet.create({
  input: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  textButton: {
    borderColor: 'red',
    borderWidth: 1,
    // alignSelf: 'center',
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: primaryColor,
    borderRadius: 8,
  },
});
