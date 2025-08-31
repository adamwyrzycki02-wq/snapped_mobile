import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { uploadImage } from '../services/api';

export default function PermissionScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Permission'>) {
  const imageSize = {width: 0, height: 0};
  const ask = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      // If permission granted, open image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: 'photo',
        quality: 1,  // Full quality image
      });

      if (!result.canceled) {
        Image.getSize(result.assets[0].uri, (width, height) => {
          imageSize.width = width;   // Update the width
          imageSize.height = height; // Update the height
        });
        handleImageUpload(result.assets[0].uri);  // Call the API to upload the image
      } else {
        Alert.alert('Image selection canceled', 'Please select an image to proceed.');
      }
    } else {
      Alert.alert('Permission denied', 'You need to grant permission to access your media library.');
    }
  };

  // Upload the selected image to the server
  const handleImageUpload = async (uri: string) => {
    try {
      const response = await uploadImage(uri);
      navigation.navigate('Crop', {
        cloudinaryPublicId: response.cloudinary_public_id,
        cloudinaryUrl: response.cloudinary_url,
        iWidth: imageSize.width, // Pass the image size to the Crop screen
        iHeight: imageSize.height,
      });
      
    } catch (error) {
      Alert.alert('Error', 'There was an error uploading the image');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Snapped</Text>
      <View style={styles.carouselContainer}>
        <Image
          source={require('../../assets/permission/main.png')}
          style={{ width: 310, height: 230, borderRadius: 16 }}
          resizeMode="cover"
        />
      </View>
      <ImageBackground
        style={styles.bgImage}
        source={require('../../assets/permission/background.png')}  // Check the backgroundImage type
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Image
          source={require('../../assets/permission/frame.png')}
          style={{ width: 57, height: 57, marginBottom: 24 }}
        />
        <Text style={styles.description}>{'Allow access to your\nscreenshots to find dupes.'}</Text>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={ask}>
        <Text style={styles.nextButtonText}>PICK SCREENSHOTS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    justifyContent: 'space-between'
  },
  brand: {
    marginTop: 81,
    fontSize: 19,
    fontFamily: 'EthicNew-Medium',
    color: '#000',
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.5,
    justifyContent: 'center',
    textAlign: 'center',
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  carouselContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000000',
    opacity: 0.2,
    marginHorizontal: 6,
  },
  nextButton: {
    backgroundColor: '#13458B',
    paddingVertical: 15,
    marginHorizontal: 22,
    borderRadius: 90,
    marginBottom: 30,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});
