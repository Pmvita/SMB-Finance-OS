import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import InvoicesScreen from './screens/InvoicesScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import WalletScreen from './screens/WalletScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

type AppState = 'splash' | 'onboarding' | 'login' | 'main';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      
      if (!hasSeenOnboarding) {
        setAppState('onboarding');
      } else if (!isLoggedIn) {
        setAppState('login');
      } else {
        setAppState('main');
      }
    } catch (error) {
      console.error('Error checking first launch:', error);
      setAppState('onboarding');
    }
  };

  const handleSplashComplete = () => {
    checkFirstLaunch();
  };

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setAppState('login');
    } catch (error) {
      console.error('Error saving onboarding state:', error);
      setAppState('login');
    }
  };

  const handleLogin = async (devMode: boolean) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsDevMode(devMode);
      setAppState('main');
    } catch (error) {
      console.error('Error saving login state:', error);
      setIsDevMode(devMode);
      setAppState('main');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      setAppState('login');
      setIsDevMode(false);
    } catch (error) {
      console.error('Error during logout:', error);
      setAppState('login');
      setIsDevMode(false);
    }
  };

  // Render different screens based on app state
  if (appState === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appState === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (appState === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Main app with navigation
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1e293b" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Invoices') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            } else if (route.name === 'Expenses') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } else if (route.name === 'Wallet') {
              iconName = focused ? 'wallet' : 'wallet-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#10b981', // Emerald green
          tabBarInactiveTintColor: '#64748b', // Slate gray
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e2e8f0',
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 8,
            height: 80,
            paddingHorizontal: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
          headerStyle: {
            backgroundColor: '#1e293b', // Slate 800
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{ title: 'Dashboard' }}
        />
        <Tab.Screen 
          name="Invoices" 
          component={InvoicesScreen}
          options={{ title: 'Invoices' }}
        />
        <Tab.Screen 
          name="Expenses" 
          component={ExpensesScreen}
          options={{ title: 'Expenses' }}
        />
        <Tab.Screen 
          name="Wallet" 
          component={WalletScreen}
          options={{ title: 'Wallet' }}
        />
        <Tab.Screen 
          name="Profile" 
          options={{ title: 'Profile' }}
        >
          {() => <ProfileScreen onLogout={handleLogout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
