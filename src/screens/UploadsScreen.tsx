import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { listSearches, UploadsResult } from '../services/api';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function UploadsScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Uploads'>) {
  const [items, setItems] = useState<UploadsResult[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(null); // To track the selected item's ID

  useEffect(() => {
    (async () => {
      const res = await listSearches();
      setItems(res.searches);
    })();
  }, []);

  const render = ({ item }: { item: UploadsResult }) => (
    <Pressable 
      style={[styles.card, currentId === item.id && styles.selectedCard]} // Apply selected style conditionally
      onPress={() => setCurrentId(item.id)} // Set the selected item's ID
    >
      <Image source={{ uri: item.image_path }} style={styles.thumb} />
      <Text style={styles.metaResult}>{item.results.length} Results</Text>
      <Text style={styles.meta}>{new Date(item.search_time).toDateString()}</Text>      
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingBottom: 80 }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 22, fontFamily: 'EthicNew-Medium', fontWeight: '600' }}>My Uploads</Text>
      </View>
      
      {items.length > 0 ? (
        <View style={{position: 'relative'}}>
          <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 }}>
            <Text style={{ fontSize: 14, color: '#000', fontWeight: '500' }}>Uploads</Text>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }} onPress={() => navigation.navigate('Permission')}>
              <Ionicons name="add" size={14} color="#13458B" />
              <Text style={{ fontSize: 14, color: '#13458B' }}>Add more</Text>
            </Pressable>
          </View>
          {items.length == 1 ? (
            <Pressable 
              style={[styles.card, currentId === items[0].id && styles.selectedCard, {position: 'absolute', left: 12, top: 50}]} // Apply selected style conditionally
              onPress={() => setCurrentId(items[0].id)} // Set the selected item's ID
            >
              <Image source={{ uri: items[0].image_path }} style={styles.thumb} />
              <Text style={styles.metaResult}>{items[0].results.length} Results</Text>
              <Text style={styles.meta}>{new Date(items[0].search_time).toDateString()}</Text>      
            </Pressable>
          ) : (
            <FlatList 
              data={items} 
              contentContainerStyle={{ padding: 12 }} 
              numColumns={2} 
              columnWrapperStyle={{ gap: 12 }} 
              keyExtractor={(_, i) => String(i)} 
              renderItem={render} 
            />
          )}
          
          
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', height: '70%' }}>
          <Image source={require('../../assets/my_uploads/Empty_Inbox.png')} />
          <Text style={{ marginTop: 24, fontSize: 24, fontFamily: 'EthicNew-Medium', fontWeight: '600' }}>No Screenshots yet.</Text>
          <Text style={{ marginTop: 6, fontSize: 16, fontWeight: '400' }}>Take or save a photo to start.</Text>
        </View>
      )}

      {items.length > 0 ? (
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Results', { searchId: currentId })}>
          <Text style={styles.nextButtonText}>VIEW RESULT</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Permission')}>
          <Text style={styles.nextButtonText}>START NOW</Text>
        </TouchableOpacity>
      )}
      <LinearGradient colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']} style={styles.gradientOverlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { 
    paddingTop: 79,
    paddingBottom: 20,
    alignItems: 'center',
    width: '100%',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  card: { 
    width: '48%', 
    backgroundColor: '#f8fafc', 
    borderRadius: 12, 
    padding: 6,
    marginBottom: 12 
  },
  selectedCard: {
    borderColor: '#13458B', // Blue border for the selected item
    borderWidth: 2, // Border width for selected item
  },
  thumb: { 
    width: '100%', 
    height: 140, 
    borderRadius: 10 
  },
  meta: { 
    marginTop: 6, 
    color: '#6b7280', 
    fontSize: 12 
  },
  metaResult: { 
    marginTop: 6, 
    color: '#000', 
    fontSize: 14, 
    fontWeight: '500' 
  },
  nextButton: {
    backgroundColor: '#13458B',
    paddingVertical: 15,
    borderRadius: 90,
    width: "90%",
    bottom: 30,
    position: 'absolute',
    zIndex: 2,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 200,
    zIndex: 1,
  },
});
