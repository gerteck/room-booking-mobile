import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { router } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Room Booking</Text>
      
      <TextInput
        mode="outlined"
        label="Email"
        style={styles.input}
        autoCapitalize="none"
      />
      
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        style={styles.input}
      />
      
      <Button 
        mode="contained" 
        onPress={() => router.push('/book-room-screen')}
        style={styles.button}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
