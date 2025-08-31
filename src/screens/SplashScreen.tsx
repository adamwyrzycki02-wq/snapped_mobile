import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Prevent the splash screen from auto-hiding until the fonts are loaded
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Onboarding1'), 1200);
    loadFonts();
    return () => clearTimeout(t);
  }, [navigation]);

  const loadFonts = async () => {
    await Font.loadAsync({
      'EthicNew-Medium': require('../../assets/fonts/EthicNew-Medium.ttf'),
      'EthicNew-Italic': require('../../assets/fonts/EthicNew-Italic.ttf'), 
    });
    setFontsLoaded(true); // Update the state once fonts are loaded
  };

  if (!fontsLoaded) {
    return null; // Return nothing or a placeholder while fonts are loading
  }

  return (
    <ImageBackground style={styles.container} source={require('../../assets/splash.png')} resizeMode="cover">
      <View style={styles.center}>
        <Text style={styles.snappedText}>Snapped<Text style={styles.italic}>AI</Text></Text>
        <Text style={styles.title}>Snap{"\n"}<Text style={styles.italic}>Compare</Text>{"\n"}Save</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f3b7a' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
   snappedText: {
    fontSize: 19,
    fontFamily: 'EthicNew-Medium', // Ensure the font family name matches
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    position: 'absolute',
    top: 79,
    padding: 5,
    letterSpacing: 0.5,
    lineHeight: 24,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 63,
    fontFamily: 'EthicNew-Medium', // Ensure font name matches
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 81,
    letterSpacing: -1.5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  italic: {
    fontFamily: 'EthicNew-Italic',
  }
});
