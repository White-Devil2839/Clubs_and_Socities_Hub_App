import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { DataProvider } from './src/context/DataContext';
import { MembershipProvider } from './src/context/MembershipContext';
import AppNavigator from './src/navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  useEffect(() => {
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log("AsyncStorage cleared on app start");
      } catch (err) {
        console.log("Error clearing AsyncStorage:", err);
      }
    };

    clearStorage();
  }, []); 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MembershipProvider>
        <AuthProvider>
          <DataProvider>
            <StatusBar style="light" />
            <AppNavigator />
          </DataProvider>
        </AuthProvider>
      </MembershipProvider>
    </GestureHandlerRootView>
  );
}
