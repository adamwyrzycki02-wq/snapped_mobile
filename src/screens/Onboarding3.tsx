import React, { useEffect, useMemo, useRef } from 'react';
import OnboardShell from '../components/OnboardShell';
import { View, StyleSheet, Animated, Image, Text, Easing, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

interface Onboarding3Props extends NativeStackScreenProps<any, 'Onboarding3'> {}

const ITEM_H = 180;   // card height
const GAP    = 12;    // vertical gap
const SPEED  = 9000;  // ms for one full column loop (tweak to taste)  
const images = [
  require('../../assets/onboarding3/card1.jpg'),
  require('../../assets/onboarding3/card2.jpg'),
  require('../../assets/onboarding3/card3.jpg'),
  require('../../assets/onboarding3/card4.jpg'),
];

const Onboarding3: React.FC<Onboarding3Props> = ({ navigation }) => {

  const leftY  = useRef(new Animated.Value(0)).current;
  const rightY = useRef(new Animated.Value(0)).current;


  // duplicate lists so the end touches the start seamlessly
  const loopImages = useMemo(() => [...images, ...images], []);
  const columnHeight = (ITEM_H + GAP) * images.length; // one set (not duplicated)

  useEffect(() => {
    // Left column loop
    Animated.loop(
      Animated.timing(leftY, {
        toValue: columnHeight,
        duration: SPEED,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true }
    ).start();

    // Right column loop (start halfway offset)
    rightY.setValue(columnHeight / 2);
    Animated.loop(
      Animated.timing(rightY, {
        toValue: columnHeight + columnHeight / 2, // travel the same distance
        duration: SPEED,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true }
    ).start();
  }, [columnHeight, leftY, rightY]);

  const handleNext = () => {
    navigation.navigate('Home');
  };

  const leftTranslate = leftY.interpolate({
    inputRange: [0, columnHeight],
    outputRange: [0, -columnHeight],
  });

  const rightTranslate = rightY.interpolate({
    inputRange: [0, columnHeight],
    outputRange: [0, -columnHeight],
    extrapolate: 'extend',
  });

  return (
    <OnboardShell
      carouselContainer={
        <View style={styles.mainContainer}>
          <View style={styles.wrapper}>
            <LinearGradient 
                colors={[ 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)', ]}
                style={styles.gradientTop}
            />
            {/* Left column */}
            <View style={styles.column}>
              <Animated.View style={{ transform: [{ translateY: leftTranslate }] }}>
                {loopImages.map((src, i) => (
                  <Card key={`L-${i}`} source={src} />
                ))}
              </Animated.View>
            </View>

            {/* Right column (50% vertical offset) */}
            <View style={styles.column}>
              <Animated.View style={{ transform: [{ translateY: Animated.subtract(rightTranslate, 70) }] }}>
                {loopImages.map((src, i) => (
                  <Card key={`R-${i}`} source={src} />
                ))}
              </Animated.View>
            </View>
            <LinearGradient 
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                style={styles.gradientBottom}
            />
          </View>
          <View style={styles.backCard1}></View>
          <View style={styles.backCard2}></View>
          <View style={styles.mainCard}>
            <Image
              source={require('../../assets/onboarding3/item.jpg')}
              style={styles.cardImage} // Use animated width and height
            />
            <View style={styles.cardDescription}>
              <Text style={styles.cardTitle}>
                Polaroid Sunglasses
              </Text>
              <Text style={styles.cardPrice}>
                $200
              </Text>
            </View>
          </View>
        </View>
      }
      title="Designer or Dupe"
      description={"Shop the original or its budget-\nfriendly twin."}
      nextButtonPress={handleNext}
      backgroundImage={require('../../assets/onboarding3/background.png')}
      activeDotIndex={3}
      btnText='GET STARTED'
    />
  );
};

function Card({ source }: { source: any }) {
  return (
    <View style={{ height: ITEM_H, marginBottom: GAP, borderRadius: 6 }}>
      <Image source={source} style={{ width: '100%', height: '80%', borderRadius: 6 }} resizeMode="cover" />
      <Text style={{ fontWeight: '700', fontSize: 12 }}>Polaroid Sunglasses</Text>
      <Text style={{ fontSize: 11 }}>$200</Text>
      <Text style={{ fontSize: 9, color: 'rgba(0, 0, 0, 0.6)' }}>Brand</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',    
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    flexDirection: 'row',
    gap: 14,
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 6,
    width: '70%',
    height: 325,          // visible window (adjust as needed)
    overflow: 'hidden',
  },
  column: {
    flex: 1,              // two equal halves
    overflow: 'hidden',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 124,
    zIndex: 4,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 124,
    zIndex: 4,
  },
  backCard1: {
    position: 'absolute',
    width: 167,
    height: 47,
    backgroundColor: '#ffffff',
    borderRadius: 9,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1,
  },
  backCard2: {
    position: 'absolute',
    width: 147,
    height: 47,
    backgroundColor: '#ffffff',
    borderRadius: 9,
    bottom: -40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1,
  },
  mainCard: {
    position: 'absolute', // Ensure it's positioned absolutely
    width: 195,
    height: 65,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    bottom: -30,
    flexDirection: 'row',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    // Elevation for Androids
    elevation: 5,
    zIndex: 2,
  },
  cardImage: {
    width: 46,
    height: 46,
    borderRadius: 4,
  },
  cardDescription: {
    flex: 1,
    marginLeft: 6,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardPrice: {
    fontSize: 11,
    fontWeight: '400',
  },

});

export default Onboarding3;
