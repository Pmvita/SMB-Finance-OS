import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoginScreenProps {
  onLogin: (isDevMode: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDevMode, setShowDevMode] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', `Logged in with ${provider}`);
      onLogin(false);
    }, 1500);
  };

  const handleDevMode = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(true);
    }, 1000);
  };

  const handleEmailLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(false);
    }, 1500);
  };

  const toggleDevMode = () => {
    setShowDevMode(!showDevMode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1e293b', '#334155', '#475569']}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Ionicons name="wallet" size={40} color="#10b981" />
              </View>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your SMB Finance OS account</Text>
          </View>

          {/* Email/Password Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#64748b"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#64748b"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleEmailLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Icons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialIcon, styles.googleIcon]}
              onPress={() => handleSocialLogin('Google')}
              disabled={isLoading}
            >
              <Ionicons name="logo-google" size={24} color="#EA4335" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialIcon, styles.facebookIcon]}
              onPress={() => handleSocialLogin('Facebook')}
              disabled={isLoading}
            >
              <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialIcon, styles.twitterIcon]}
              onPress={() => handleSocialLogin('X (Twitter)')}
              disabled={isLoading}
            >
              <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
          </View>

          {/* Dev Mode Toggle */}
          <TouchableOpacity style={styles.devModeToggle} onPress={toggleDevMode}>
            <Ionicons name="settings" size={16} color="#64748b" />
            <Text style={styles.devModeText}>Developer Mode</Text>
          </TouchableOpacity>

          {/* Dev Mode Button */}
          {showDevMode && (
            <Animated.View
              style={[
                styles.devModeContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.devModeButton}
                onPress={handleDevMode}
                disabled={isLoading}
              >
                <Ionicons name="code-slash" size={20} color="#10b981" />
                <Text style={styles.devModeButtonText}>
                  {isLoading ? 'Loading Dev Data...' : 'Login with Mock Data'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  loginButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    backgroundColor: '#6b7280',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#475569',
  },
  dividerText: {
    color: '#94a3b8',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  socialIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleIcon: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  facebookIcon: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  twitterIcon: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  devModeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  devModeText: {
    color: '#64748b',
    fontSize: 14,
    marginLeft: 8,
  },
  devModeContainer: {
    marginTop: 16,
  },
  devModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  devModeButtonText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  footerLink: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen; 