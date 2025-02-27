import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import { WebView } from 'react-native-webview';

export default function BookSuccessScreen() {
  const { scanningResult } = useLocalSearchParams<{ scanningResult: string }>();

  const handleBackButtonPress = () => {
    router.push('/book-room-screen');
  };

  return (
    <View style={styles.container}>
      {/* WebView to display the booking results */}
      <View style={styles.webviewContainer}>
        <WebView
          originWhitelist={['*']} 
          source={{ uri: scanningResult }} // Open the URL from the QR code
          style={styles.webview}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView Error:', nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('HTTP Error:', nativeEvent.statusCode);
          }}
        />
      </View>

      {/* QR Code Data */}
      <View style={styles.qrDataContainer}>
        <Text>QR Code Data:</Text>
        <Text>{scanningResult}</Text>
      </View>

      {/* Back Button */}
      <Button mode="contained" onPress={handleBackButtonPress} style={styles.button}>
        Go Back to Room Listing
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginTop: '10%',
  },
  qrDataContainer: {
    alignItems: 'center', 
    marginVertical: 20,
  },
  webview: {
    zIndex: 9,
    flex: 1,
    width: '100%',
    marginVertical: 10,
  },
  webviewContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  button: {
    width: '95%',
    paddingVertical: 15,
    marginTop: 'auto',
    marginBottom: 10,
  },
});