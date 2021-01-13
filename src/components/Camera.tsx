import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

const useTakePicture = (callback?: (uri: string | null) => void) => {
  const options = {quality: 0.5, base64: true};
  const takePicture = async (camera: RNCamera) => {
    try {
      const data = await camera.takePictureAsync(options);
      // console.log('takePicture', data);
      callback?.(data.uri);
    } catch (error) {
      callback?.(null);
    }
  };
  return takePicture;
};

type CameraProps = {
  onTakePicture?: (uri: string | null) => void;
};
const Camera = ({onTakePicture}: CameraProps) => {
  const takePicture = useTakePicture(onTakePicture);
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
