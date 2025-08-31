import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

interface OnboardShellProps {
  carouselContainer: React.ReactNode;
  title: string;
  description: string;
  nextButtonPress: () => void;
  backgroundImage: any;  // Changed type to `any` for flexible image handling
  activeDotIndex: number;
  btnText: string; // Added btnText prop
}

const OnboardShell: React.FC<OnboardShellProps> = ({
  carouselContainer,
  title,
  description,
  nextButtonPress,
  backgroundImage,
  activeDotIndex,
  btnText = 'NEXT', // Default value for btnText
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Snapped</Text>
      <View style={styles.carouselContainer}>
        {carouselContainer}
        
      </View>

      <ImageBackground
        style={styles.bgImage}
        source={typeof backgroundImage === 'string' ? { uri: backgroundImage } : backgroundImage}  // Check the backgroundImage type
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.pagination}>
        <View
          style={[styles.dot, activeDotIndex === 1 ? styles.activeDot : null]}
        />
        <View
          style={[styles.dot, activeDotIndex === 2 ? styles.activeDot : null]}
        />
        <View
          style={[styles.dot, activeDotIndex === 3 ? styles.activeDot : null]}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={nextButtonPress}>
        <Text style={styles.nextButtonText}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    marginTop: 61,
    marginBottom: 20,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 100,
    marginBottom: 20,
    zIndex: 3,
  },
  textContainer: {
    marginTop: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'EthicNew-Medium',
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '400',
    marginBottom: 10,
    color: '#000',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  pagination: {
    marginTop: 38,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 46,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000000',
    opacity: 0.2,
    marginHorizontal: 6,
  },
  activeDot: {
    width: 18,
    opacity: 1,
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

export default OnboardShell;
