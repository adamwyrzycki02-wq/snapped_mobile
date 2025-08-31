import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { searchProducts } from '../services/api';
import { RootStackParamList } from '../App';

export default function LoadingScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Loading'>) {
  const { originalCloudinaryUrl, originalCloudinaryPublicId, cloudinaryUrl, cloudinaryPublicId } = route.params;


  useEffect(() => {
    let isMounted = true; // prevents setState after unmount
    const run = async () => {
      try {
        // get params if you passed them in: navigation.navigate('Loading', { cropParams: ... })
        const cropParams = {
          image_path: cloudinaryUrl,
          original_image_path: originalCloudinaryUrl,
          is_clipped: true,
          cloudinary_public_id: cloudinaryPublicId,
          cloudinary_url: cloudinaryUrl,
          original_cloudinary_public_id: originalCloudinaryPublicId,
          original_cloudinary_url: originalCloudinaryUrl,
        };
        const response = await searchProducts(cropParams); // <-- awaited safely
        // do something with response, e.g. navigate and pass data forward
        if (isMounted) {
          navigation.navigate('Results', {
            searchId: response.search_id
          } );
        }
      } catch (err) {
        // optionally navigate to an error screen or show a message
      } 
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [navigation]); // or [] if you only want this once
  return (
    <View style={styles.container}>
      <Image source={{ uri: originalCloudinaryUrl }} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
      <View
        style={{ 
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 8,
          marginTop: 80,
          backgroundColor: 'rgba(0,0,0,0.3)'
        }}
      />
      <View
        style={styles.loadingContainer}
      >
        <Image
          source={require('../../assets/loading.gif')}
          style={{ width: 60, height: 60, marginRight: 20, marginBottom: 20 }}/> 
        <Text style={styles.text}>Finding matches...</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 60,
    marginLeft: 13,
    marginRight: 13,
    marginBottom: 13,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { 
    color: '#fff',
    fontSize: 22,
    fontFamily: 'EthicNew-Medium',
    textAlign: 'center',
    fontWeight: '600',
   }
});
