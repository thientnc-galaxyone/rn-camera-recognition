import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TextInput, ScrollView} from 'react-native';
import {Button, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {primaryColor} from '@root/colors';
import {Routes} from '@root/navigators/Routes';
import {Camera, KeyboardAvoidingView} from '@root/components';
import {FaceData, useStores} from '@root/stores';

type ResultViewProps = {
  uri: string;
};
const ResultView = ({uri}: ResultViewProps) => {
  const {navigate, goBack} = useNavigation();
  const {dataStore} = useStores();
  const [result, setResult] = useState();
  const [data, setData] = useState<FaceData>(null);

  useEffect(() => {
    setTimeout(() => {
      navigate(Routes.checkinFace.name);
      const _data = dataStore.checkFace(uri);
      setData(_data);
      setResult('Success');
    }, 2000);
  });
  return (
    <KeyboardAvoidingView>
      <ScrollView style={{alignSelf: 'stretch'}}>
        <Image style={{height: 150}} source={{uri}} resizeMode="contain" />
        <View style={{flex: 1, paddingHorizontal: 32, marginTop: 32}}>
          <Text style={{color: 'green'}}>{result}</Text>
          {data && (
            <>
              <Text>{`ID: ${data?.id}`}</Text>
              <Text>{`Name: ${data?.name}`}</Text>
            </>
          )}
          {/* <Button
            style={styles.button}
            onPress={() => {
              navigate(Routes.loading.name);
              setTimeout(() => {
                dataStore.addFaceData({uri, name});
                goBack();
              }, 2000);
            }}>
            <Text>SAVE</Text>
          </Button> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const CheckinFace = () => {
  const [uri, setUri] = useState('');
  const {navigate} = useNavigation();
  const onTakePicture = (_uri: string | null) => {
    navigate(Routes.loading.name);
    console.log(_uri);
    setUri(_uri || '');
    // dataStore.addFaceData({uri});
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

export default CheckinFace;

const styles = StyleSheet.create({
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
