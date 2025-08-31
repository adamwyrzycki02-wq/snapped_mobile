import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import OnboardShell from '../components/OnboardShell'; // Import OnboardShell
import OnboardCard from '../components/OnboardCard';
import { LinearGradient } from 'expo-linear-gradient';

interface Onboarding2Props extends NativeStackScreenProps<any, 'Onboarding2'> {}

const Onboarding2: React.FC<Onboarding2Props> = ({ navigation }) => {

  const maskX = useRef(new Animated.Value(58)).current;
  const maskY = useRef(new Animated.Value(78)).current;
  const maskW = useRef(new Animated.Value(156)).current;
  const maskH = useRef(new Animated.Value(169)).current;

  const masks = [
    { x: 58, y: 78, width: 156, height: 169 },
    { x: 58, y: 128, width: 106, height: 119 },
  ];
  useEffect(() => {
    Animated.parallel([
      Animated.timing(maskX, {
        toValue: masks[1].x,
        duration: 1000, // Adjust the duration to your preference
        useNativeDriver: false,
      }),
      Animated.timing(maskY, {
        toValue: masks[1].y,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(maskW, {
        toValue: masks[1].width,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(maskH, {
        toValue: masks[1].height,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);
  const handleNext = () => {
    navigation.navigate('Onboarding3');
  };

  return (
    <OnboardShell
      carouselContainer={
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <LottieView
              source={require('../../assets/lottie/Finding matches loading.json')}
              autoPlay
              loop
              style={{ width: '100%', height: '100%', transform: [{ scale: 2.7 }], marginLeft: 10, marginBottom: 10 }}
              
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/onboarding2/image1.jpg')}
              style={ styles.image1 }
            />
            <Image
              source={require('../../assets/onboarding2/image2.jpg')}
              style={ styles.image2 }              
            />
            <Image
              source={require('../../assets/onboarding2/image3.png')}
              style={ styles.image3 }
              resizeMode='cover'
            />
            <View style={styles.buler}>
              <Animated.View style={[styles.innerTop, { height: maskY }]}></Animated.View>
              <Animated.View style={[styles.innerBottom, { height: Animated.subtract(319.9, Animated.add(maskY, maskH)) }]} />
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
            
            <View style={styles.cardContainer}>
              <OnboardCard
                image={require('../../assets/onboarding2/card1.png')}
                price="30% off"
                textColor="#0BA322"
                top={0}
                timeDelay={1200}
              />
              <OnboardCard
                image={require('../../assets/onboarding2/card2.png')}
                price="$89"
                top={47}
                timeDelay={1100}
              />
              <OnboardCard
                image={require('../../assets/onboarding2/card3.png')}
                price="80% off"
                top={94}
                timeDelay={1000}
              />
            </View>
          </View>

          <LinearGradient 
              colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
              style={styles.gradientOverlay}
          />
        </View>
      }
      title="Your Closest Match, First"
      description={"We find the most similar items —\ndown to the tiniest details."}
      nextButtonPress={handleNext}
      backgroundImage={require('../../assets/onboarding2/background.png')}
      activeDotIndex={2}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',    
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: 180,
    height: 37,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 70,
    justifyContent: 'center',
    zIndex: 4,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'EthicNew-Medium',
    color: '#000',
    marginLeft: 20,    
    marginRight: 22,
    fontWeight: '500',
  },
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },
  image1: {
    width: 265,
    height: 306,
    borderRadius: 8,
    transform: [{ rotate: '-3.91deg' }, {translateX: -10}],
    opacity: 0.6,
    zIndex: 0,
  },
  image2: {
    width: 265,
    height: 306,
    borderRadius: 8,
    transform: [{ rotate: '3.91deg' }, {translateX: 10}],
    position: 'absolute',
    opacity: 0.6,
    marginTop: 15,
    zIndex: 1,
  },
  image3: {
    width: 267,
    height: 326,
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 3,
    zIndex: 2,
    position: 'absolute',
  },
  buler: {
    position: 'absolute',
    width: 267,
    height: 326,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 3,
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
    bottom: -10,
    left: 0,
    width: '100%',
    height: 124,
    zIndex: 4,
  },
  cardContainer: {
    position: 'absolute',
    top: 250,
    alignItems: 'center',
    zIndex: 5,
  },
});

export default Onboarding2;