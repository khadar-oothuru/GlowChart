import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import DownloadImage from '../assets/download.png';

import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import Logo from '../components/Logo';

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F4A6CD" barStyle="dark-content" />
      <View style={styles.imageContainer}>
        <Image
          source={DownloadImage}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} pointerEvents="none">
          <Logo />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          size="large"
          style={styles.getStartedButton}
        />
        <View style={styles.indicatorContainer}>
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3bdb8ff',


  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    marginTop: 0,
    marginBottom: 0,
    width: '100%',
  },
  productImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 0.7, // less tall (was 0.56)
    borderRadius: 0,
    marginTop: 0,
    marginBottom: 0,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 80, // move text lower (closer to button)
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
    paddingHorizontal: 20,
  },
  brandName: {
    fontFamily: 'Italiana',
    fontSize: 60,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -0.32,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.10)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    lineHeight: 64,
  },
  tagline: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
    opacity: 0.95,
    textShadowColor: 'rgba(0,0,0,0.10)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    marginBottom: 0,
    lineHeight: 28,
  },
  bottomContainer: {
    backgroundColor: '#e3bdb8ff',
    paddingBottom: 48, // more space at the bottom for indicators
    paddingTop: 10,
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedButton: {
    width: '65%', // decreased width
    backgroundColor: '#B84953',
    marginBottom: 32, // reduce space below button
    borderRadius: 12,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16, // space between button and indicators
    marginBottom: 0,
    width: '100%',
    gap: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 2,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
    width: 24,
    borderRadius: 12,
  },
});

export default OnboardingScreen;
