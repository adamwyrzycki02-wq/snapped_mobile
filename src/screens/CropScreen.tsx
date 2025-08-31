import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, PanResponder } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { clipImage } from '../services/api';

export default function CropScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Crop'>) {
  const { cloudinaryPublicId, cloudinaryUrl, iWidth, iHeight } = route.params;
  const [crop, setCrop] = useState({ x: 100, y: 200, width: 200, height: 200 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [maskDimensions, setMaskDimensions] = useState({ width: 0, height: 0 });
  

  // PanResponder to handle drag and update crop state
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      // Capture the starting position when the user clicks on the image
      setStartPos({
        x: gestureState.x0 - 13,
        y: gestureState.y0 - 70,
      });
    },
    onPanResponderMove: (e, gestureState) => {
      // Update width and height as the user drags the crop area
      const width = Math.abs(gestureState.moveX - 13 - startPos.x);
      const height = Math.abs(gestureState.moveY - 70 - startPos.y);

      // Update crop state based on movement
      setCrop({
        x: Math.min(startPos.x, gestureState.moveX),
        y: Math.min(startPos.y, gestureState.moveY),
        width: width,
        height: height,
      });
    },
    onPanResponderRelease: () => {
    },
  });

  const onMaskLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setMaskDimensions({ width, height }); // Store the mask width and height in the state
  };


  const cropApi = async () => {
  try {
    // Get the latest crop state
    const { x, y, width, height } = crop;
    const xInt = x / maskDimensions.width * iWidth; // Ensure x is an integer
    const yInt = y / maskDimensions.height * iHeight; // Ensure y is an integer
    const widthInt = width / maskDimensions.width * iWidth; // Ensure width is an integer
    const heightInt = height / maskDimensions.height * iHeight; // Ensure height is an integer
    const cropParams = {
      image_path: cloudinaryUrl, // Path to the image you want to crop
      x: parseInt(xInt, 10), // x coordinate for the crop area (start from left)
      y: parseInt(yInt, 10), // y coordinate for the crop area (start from top)
      width: parseInt(widthInt, 10), // Width of the crop area
      height: parseInt(heightInt, 10), // Height of the crop area
      cloudinary_public_id: cloudinaryPublicId,
    };

    const response = await clipImage(cropParams);
    navigation.navigate('Loading', {
      originalCloudinaryUrl: cloudinaryUrl,
      originalCloudinaryPublicId: cloudinaryPublicId,
      cloudinaryUrl: response.cloudinary_url,
      cloudinaryPublicId: response.cloudinary_public_id,
    });
  } catch (error) {
    Alert.alert('Error', 'There was an error uploading the image');
  }
};


  return (
    <View style={styles.container}>
      {/* The original image */}
      <Image source={{ uri: cloudinaryUrl }} style={styles.image} resizeMode="stretch" />

      {/* Mask with dark overlay and transparent inner section */}
      <View style={styles.mask} {...panResponder.panHandlers} onLayout={onMaskLayout}>
        <View style={[styles.innerTop, { height: crop.y }]}></View>
        <View style={[styles.innerBottom, { height: maskDimensions.height-crop.y-crop.height+0.2 }]} />
        <View style={[styles.innerLeft, { width: crop.x, height: crop.height, top: crop.y }]} />
        <View style={[styles.innerRight, { top: crop.y, height: crop.height, width: maskDimensions.width-crop.x-crop.width }]} />

        <View
          style={[styles.border, { top: crop.y, left: crop.x, width: crop.width, height: crop.height }]}
        >
          
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
        </View>
      </View>

      {/* Bottom buttons */}
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.primary} onPress={cropApi}><Text style={styles.primaryText}>DONE</Text></TouchableOpacity>
        <TouchableOpacity style={styles.secondary} onPress={() => navigation.goBack()}><Text style={styles.secondaryText}>CANCEL</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 70, marginLeft: 13, marginRight: 13 },
  image: { width: '100%', height: '80%', borderRadius: 8, },
  mask: {
    position: 'absolute',
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginTop: 70
  },
  innerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 93,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  innerBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 67,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  innerLeft: {
    position: 'absolute',
    left: 0,
    width: 46,
    height: 160,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
  innerRight: {
    position: 'absolute',
    right: 0,
    width: 46,
    height: 160,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent', // Make sure the border is transparent
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
    borderTopLeftRadius: 5,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
    borderTopRightRadius: 5,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
    borderBottomLeftRadius: 5,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
    borderBottomRightRadius: 5,
  },
  bottom: { 
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
  primary: { 
    backgroundColor: '#13458B',
    paddingVertical: 20,
    borderRadius: 90,
    alignItems: 'center',
    marginBottom: 12
  },
  primaryText: { color: '#fff', fontWeight: '500', fontSize: 14 },
  secondary: { backgroundColor: '#E4E1E6', paddingVertical: 20, borderRadius: 90, alignItems: 'center' },
  secondaryText: { color: '#000', fontWeight: '500', fontSize: 14 }
});
