import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';

export default function BookSuccessScreen() {
  const { scanningResult } = useLocalSearchParams<{ scanningResult: string }>();

  return (
    <View style={styles.container}>
      {/* Booking Success Message */}
      <Text style={styles.message}>Booking Success!</Text>

      {/* QR Code Data */}
      <View style={styles.qrDataContainer}>
        <Text style={styles.data}>QR Code Data:</Text>
        <Text style={styles.data}>{scanningResult}</Text>
      </View>

      {/* Optional Button for going back or doing something further */}
      <Button mode="contained" onPress={() => router.push('/book-room-screen')} style={styles.button}>
        Go Back
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
    marginTop: '40%',
  },
  qrDataContainer: {
    alignItems: 'center', 
    marginVertical: 20,
  },
  data: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    width: '95%',
    paddingVertical: 15,
    marginTop: 'auto',
    marginBottom: 10
  },
});
