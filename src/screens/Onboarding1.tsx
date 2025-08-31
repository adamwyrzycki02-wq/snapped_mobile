import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import OnboardShell from '../components/OnboardShell'; // Import OnboardShell
import { LinearGradient } from 'expo-linear-gradient';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';



interface Onboarding1Props extends NativeStackScreenProps<any, 'Onboarding1'> {}

const Onboarding1: React.FC<Onboarding1Props> = ({ navigation }) => {
  const [imageIndex, setImageIndex] = useState(1);
  const [ready, setReady] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const scrollX = useRef(new Animated.Value(0)).current;
  const maskX = useRef(new Animated.Value(0)).current;
  const maskY = useRef(new Animated.Value(0)).current;
  const maskW = useRef(new Animated.Value(0)).current;
  const maskH = useRef(new Animated.Value(0)).current;
  const masks = [
    { x: 46, y: 93, width: 169, height: 160 },
    { x: 74, y: 82, width: 106, height: 209 },
    { x: 57, y: 99, width: 102, height: 113 },
  ];

  SplashScreen.preventAutoHideAsync().catch(() => {});

  const imageArray = [
    require('../../assets/onboarding1/image1.png'),
    require('../../assets/onboarding1/image2.png'),
    require('../../assets/onboarding1/image3.png'),
    require('../../assets/onboarding1/image1.png'),
    require('../../assets/onboarding1/image2.png'),
    require('../../assets/onboarding1/image3.png'),
  ];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await Asset.loadAsync(imageArray);
        if (!cancelled) {
          setReady(true);
          await SplashScreen.hideAsync();
        }
      } catch {
        // even if it fails, still continue
        setReady(true);
        await SplashScreen.hideAsync();
      }
    })();
    return () => { cancelled = true; };
  }, []);


  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => {
      setImageIndex(prev => (prev % (imageArray.length - 1)) + 1);
    }, 1500);
    return () => clearInterval(id);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    if (imageIndex === 5) {
      scrollX.setValue(-215);
      setImageIndex(2);
      return;
    }

    const nextMask = masks[(imageIndex - 1) % 3];
    Animated.parallel([
      Animated.timing(scrollX, {
        toValue: imageIndex * -287 + screenWidth / 2 - 133.5,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(maskX, { toValue: nextMask.x, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      Animated.timing(maskY, { toValue: nextMask.y, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      Animated.timing(maskW, { toValue: nextMask.width, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      Animated.timing(maskH, { toValue: nextMask.height, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
    ]).start();
  }, [imageIndex, ready]);

  if (!ready) return null; // keep splash on until ready

  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <OnboardShell
      carouselContainer={
        <View style={styles.all}>
          <Animated.View
            style={[styles.carousel, { transform: [{ translateX: scrollX }] }]}
          >
            {imageArray.map((image, index) => (
              <Animated.Image key={index} source={image} style={styles.carouselImage} />
            ))}
          </Animated.View>
          <View style={styles.buler}>
            <Animated.View style={[styles.innerTop, { height: Animated.add(maskY, 0.1) }]}></Animated.View>
            <Animated.View style={[styles.innerBottom, { height: Animated.subtract(320, Animated.add(maskY, maskH)) }]} />
            <Animated.View style={[styles.innerLeft, { width: maskX, height: maskH, marginTop: maskY }]} />
            <Animated.View style={[styles.innerRight, { marginTop: maskY, height: maskH, width: Animated.subtract(267, Animated.add(maskX, maskW)) }]} />
            <Animated.View
              style={[styles.border, { top: maskY, left: maskX, width: Animated.subtract(maskW, 6), height: maskH }]}
            >
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
            </Animated.View>            
          </View>
          <LinearGradient colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']} style={styles.gradientOverlay} />
        </View>
      }
      title="Snap It"
      description={"Stop guessing. Get instant matches\nfor exactly what you want."}
      nextButtonPress={handleNext}
      backgroundImage={require('../../assets/onboarding1/background.png')}
      activeDotIndex={1}
    />
  );
};

const styles = StyleSheet.create({
  all: {
    position: 'relative',
    marginBottom: 10,
  },
  carousel: {
    flexDirection: 'row', // Arrange images horizontally
    zIndex: 1,
    position: 'relative',
  },
  buler: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -133 }],
    width: 267,
    height: 326,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 2,
    overflow: 'hidden',
  },
  border: {    
    position: 'absolute',
    backgroundColor: 'transparent',  
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: 'white',
    borderTopLeftRadius: 5,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: 'white',
    borderTopRightRadius: 5,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: 'white',
    borderBottomLeftRadius: 5,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: 'white',
    borderBottomRightRadius: 5,
  },
  innerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 93,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
  innerBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 67,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
  innerLeft: {
    position: 'absolute',
    marginTop: 93,
    left: 0,
    width: 46,
    height: 160,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
  innerRight: {
    position: 'absolute',
    marginTop: 93,
    right: 0,
    width: 46,
    height: 160,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 100,
    zIndex: 3,
  },
  carouselImage: {
    width: 267,
    height: 326,
    marginRight: 20,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },
});

export default Onboarding1;
