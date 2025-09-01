import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const logoScale = new Animated.Value(0);
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);
  const gradientOpacity = new Animated.Value(0);

  useEffect(() => {
    const startAnimation = () => {
      // Start with gradient fade in
      Animated.timing(gradientOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Logo animation
      Animated.sequence([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      // Text fade in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        delay: 600,
        useNativeDriver: true,
      }).start();

      // Complete after 2.5 seconds
      setTimeout(() => {
        onComplete();
      }, 2500);
    };

    startAnimation();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: gradientOpacity }]}>
      <LinearGradient
        colors={[Colors.neutral[800], Colors.neutral[700], Colors.neutral[600]]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          {/* Logo */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            <View style={styles.logo}>
              <Ionicons name="wallet" size={60} color={Colors.primary[500]} />
            </View>
          </Animated.View>

          {/* App Name */}
          <Animated.Text style={[styles.appName, { opacity: textOpacity }]}>
            SMB Finance OS
          </Animated.Text>

          {/* Tagline */}
          <Animated.Text style={[styles.tagline, { opacity: textOpacity }]}>
            The Financial Operating System for Global SMBs
          </Animated.Text>

          {/* Loading Indicator */}
          <Animated.View style={[styles.loadingContainer, { opacity: textOpacity }]}>
            <View style={styles.loadingDots}>
              <View style={[styles.dot, styles.dot1]} />
              <View style={[styles.dot, styles.dot2]} />
              <View style={[styles.dot, styles.dot3]} />
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.semantic.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.semantic.text.inverse,
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: Colors.semantic.text.tertiary,
    textAlign: 'center',
    marginBottom: 60,
    paddingHorizontal: 40,
  },
  loadingContainer: {
    marginTop: 40,
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary[500],
    marginHorizontal: 4,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
});

export default SplashScreen; 