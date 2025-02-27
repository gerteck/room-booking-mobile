import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#007AFF',
    secondary: '#4CAF50',
  },
};

const stackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: '600',
  },
  headerShadowVisible: false,
}

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" />
      <Stack screenOptions={stackScreenOptions} >
        <Stack.Screen
          name="index"
          options={{
            title: "Mock Login",
            headerShown: false, 
          }}
        />
        <Stack.Screen
          name="book-room-screen"
          options={{
            title: "Book a Room",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="qr-scanner-screen"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="book-success-screen"
          options={{
            title: "Book a Room",
            presentation: 'card',
            headerBackTitle: "",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}