import { StatusBar } from 'expo-status-bar';
import React from 'react';
import firebaseConfig from "./config/Firebase.js";
import firebase from 'firebase';
import 'firebase/firestore';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from "./components/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
