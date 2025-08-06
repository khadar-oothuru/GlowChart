import React from 'react';
import { Text, StyleSheet, View, TextStyle } from 'react-native';

interface LogoProps {
  style?: TextStyle | TextStyle[];
  taglineStyle?: TextStyle | TextStyle[];
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ style, taglineStyle, showTagline = true }) => (
  <View style={styles.container}>
    <Text style={[styles.brandName, style]}>Viorra</Text>
    {showTagline && (
      <Text style={[styles.tagline, taglineStyle]}>Your Beauty, Delivered.</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
});

export default Logo;
