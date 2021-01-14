import React, {ReactElement} from 'react';
import {observer, Observer} from 'mobx-react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Button, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {primaryColor} from '@root/colors';
import {Routes} from '@root/navigators/Routes';
import {useStores, FaceData} from '@root/stores';

const DataList = () => {
  const {dataStore} = useStores();
  const ListFace = () => {
    return dataStore.registeredFaces.map((data: FaceData) => {
      return (
        <React.Fragment key={data.id}>
          <View style={{height: 48, flexDirection: 'row'}}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                borderWidth: 1,
                borderColor: 'grey',
              }}>
              <Image
                style={{flex: 1, borderRadius: 48}}
                source={{uri: data.uri}}
                resizeMode="contain"
              />
            </View>
            <View style={{marginLeft: 8}}>
              <Text>{data.id}</Text>
              <Text>{data.name}</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              borderColor: 'grey',
              borderWidth: 1,
              marginVertical: 8,
            }}
          />
        </React.Fragment>
      );
    });
  };
  return <Observer>{ListFace}</Observer>;
};

const Home = observer(() => {
  const {navigate} = useNavigation();
  const {dataStore} = useStores();
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <DataList />
      </ScrollView>
      <Button
        style={styles.button}
        onPress={() => navigate(Routes.registerFace.name)}>
        <Text>Register Face</Text>
      </Button>
      <View style={{height: 16}} />
      <Button
        style={styles.button}
        disabled={dataStore.registeredFaces.length < 1}
        onPress={() => navigate(Routes.checkinFace.name)}>
        <Text>Check in</Text>
      </Button>
    </View>
  );
});

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: 16,
    marginBottom: 32,
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
