import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';
import { listSearches } from '../services/api';


export default function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
      (async () => {
        const res = await listSearches();
        setCount(res.total);
      })();
    }, []);

  return (
    <ImageBackground 
      style={styles.container}
      source={require('../../assets/home/background.png')}
      resizeMode="cover"
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.logo}>Snapped</Text>
        <Pressable style={styles.primary} onPress={() => navigation.navigate('Permission')}>
          <Ionicons name="add" size={24} color="#13458B" />
          <Text style={styles.primaryText}>UPLOAD A NEW IMAGE</Text>
        </Pressable>
        <Text style={styles.description}>Find the <Text style={styles.animatedText}>original</Text></Text>
      </View>
      <Pressable style={styles.footer} onPress={() => navigation.navigate('Uploads')}>
        <Text style={{ fontSize: 14, fontWeight: '600' }}>MY UPLOADS</Text>
        <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>{count} UPLOADS</Text>
      </Pressable>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#5E81B0'
  },
  logo: { 
    fontSize: 50,
    fontWeight: '600',
    marginBottom: 32,
    fontFamily: "EthicNew-Medium",
    color: '#fff'
  },
  primary: { 
    backgroundColor: '#ffffffff',
    paddingVertical: 23,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 26,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#6894D2'
  },
  primaryText: { 
    color: '#13458B',
    fontWeight: '600',
    fontSize: 16
  },
  description: {
    fontFamily: 'EthicNew-Medium',
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    marginTop: 32,
  },
  animatedText: {
    fontFamily: 'EthicNew-Italic',
  },
  footer: { 
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingRight: 24,
    paddingBottom: 50,
    paddingLeft: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
