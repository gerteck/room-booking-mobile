import React, { useState, useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { router } from 'expo-router';
import { Button, StyleSheet, Text, TouchableOpacity, View, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';

export default function QRScannerScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();

  useEffect(() => {
    if (permission && !permission.granted) {
      // Request permission if not granted
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View />;
  };

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const handleBackButtonPress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        onPress={handleBackButtonPress}
        style={styles.backButton}
      />
      <Text style={styles.title}>Scan a QR Code</Text>
      
      <CameraView 
        style={styles.camera} 
        facing={facing} 
        onBarcodeScanned={(scanningResult : BarcodeScanningResult) => router.push({pathname: '/book-success-screen', params: { scanningResult: scanningResult.data }})}
        >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    position: 'absolute',
    top: 40,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    zIndex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
});
