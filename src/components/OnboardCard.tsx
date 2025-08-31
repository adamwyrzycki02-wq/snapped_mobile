import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

interface OnboardCardProps {
  image: any;
  price: string;
  textColor?: string;
  top: number; // Add 'top' to props
  timeDelay: number; // Time delay for the animation to start
}

const OnboardCard: React.FC<OnboardCardProps> = ({
  image,
  price,
  textColor = '#000', // Default text color
  top, // Destructure 'top' here
  timeDelay,
}) => {
  const sectionW = useRef(new Animated.Value(0)).current;
  const sectionH = useRef(new Animated.Value(0)).current;
  const imageW = useRef(new Animated.Value(0)).current;
  const titleSize = useRef(new Animated.Value(0)).current;
  const priceSize = useRef(new Animated.Value(0)).current;
  const topF = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
        Animated.parallel([
        Animated.timing(sectionW, {
            toValue: 128,
            duration: 1000,
            useNativeDriver: false, // These don't support native driver
        }),
        Animated.timing(sectionH, {
            toValue: 43,
            duration: 1000,
            useNativeDriver: false,
        }),
        Animated.timing(imageW, {
            toValue: 30,
            duration: 1000,
            useNativeDriver: false,
        }),
        Animated.timing(titleSize, {
            toValue: 8,
            duration: 1000,
            useNativeDriver: false,
        }),
        Animated.timing(priceSize, {
            toValue: 10,
            duration: 1000,
            useNativeDriver: false,
        }),
        Animated.timing(topF, {
            toValue: top,
            duration: 1000,
            useNativeDriver: false, // Animating position requires useNativeDriver: false
        }),
        ]).start();
    }, timeDelay);
  }, [top]); // Dependency array to run effect once

  return (
    <Animated.View style={[styles.card, { top: topF, width: sectionW, height: sectionH }]}>
      <Animated.Image
        source={typeof image === 'string' ? { uri: image } : image}
        style={[styles.cardImage, { width: imageW, height: imageW }]} // Use animated width and height
      />
      <View style={styles.cardDescription}>
        <Animated.Text style={[styles.cardTitle, { color: textColor, fontSize: titleSize }]}>
          Item found
        </Animated.Text>
        <Animated.Text style={[styles.cardPrice, { color: textColor, fontSize: priceSize }]}>
          {price}
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute', // Ensure it's positioned absolutely
    backgroundColor: '#fff',
    borderRadius: 6.24,
    padding: 6.24,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    // Elevation for Androids
    elevation: 5,
  },
  cardImage: {
    borderRadius: 4,
  },
  cardDescription: {
    flex: 1,
    marginLeft: 6,
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: '700',
  },
  cardPrice: {
    fontWeight: '400',
  },
});

export default OnboardCard;
