import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import Onboarding1 from './screens/Onboarding1';
import Onboarding2 from './screens/Onboarding2';
import Onboarding3 from './screens/Onboarding3';
import HomeScreen from './screens/HomeScreen';
import PermissionScreen from './screens/PermissionScreen';
import PickerScreen from './screens/PickerScreen';
import CropScreen from './screens/CropScreen';
import LoadingScreen from './screens/LoadingScreen';
import ResultsScreen from './screens/ResultsScreen';
import UploadsScreen from './screens/UploadsScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Home: undefined;
  Permission: undefined;
  Picker: undefined;
  Crop: { cloudinaryUrl: string; cloudinaryPublicId: string; iWidth: number; iHeight:number  } | undefined;
  Loading: { originalCloudinaryUrl?: string; originalCloudinaryPublicId?: string, cloudinaryUrl?: string; cloudinaryPublicId?: string; } | undefined;
  Results: { searchId: number };
  Uploads: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: '#ffffff' }
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Permission" component={PermissionScreen} />
        <Stack.Screen name="Picker" component={PickerScreen} />
        <Stack.Screen name="Crop" component={CropScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Uploads" component={UploadsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
