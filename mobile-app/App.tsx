import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import InvoicesScreen from './screens/InvoicesScreen';
import WalletScreen from './screens/WalletScreen';
import ProfileScreen from './screens/ProfileScreen';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
const MainTabs = ({ route }: { route: any }) => {
  const { refreshSession } = route.params || {};
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Expenses') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Invoices') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#1e293b',
          borderTopColor: '#334155',
        },
        headerStyle: {
          backgroundColor: '#1e293b',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStatusBarStyle: 'light-content',
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Expenses" 
        component={ExpensesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Invoices" 
        component={InvoicesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ headerShown: false }}
        initialParams={{ refreshSession }}
      />
    </Tab.Navigator>
  );
};

// Main App component
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  // Check for existing authentication on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authData = await AsyncStorage.getItem('authData');
      if (authData) {
        const { isAuthenticated: savedAuth, isDevMode: savedDevMode, loginTime } = JSON.parse(authData);
        
        // Check if session is still valid (24 hours)
        if (loginTime) {
          const loginDate = new Date(loginTime);
          const now = new Date();
          const hoursSinceLogin = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
          
          if (hoursSinceLogin < 24) {
            setIsAuthenticated(savedAuth);
            setIsDevMode(savedDevMode);
          } else {
            // Session expired, clear auth data
            await AsyncStorage.removeItem('authData');
            console.log('Session expired, user logged out');
          }
        } else {
          setIsAuthenticated(savedAuth);
          setIsDevMode(savedDevMode);
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSplashComplete = () => {
    // Splash screen is now handled by checkAuthStatus
  };

  const handleLogin = async (devMode: boolean) => {
    try {
      setIsDevMode(devMode);
      setIsAuthenticated(true);
      
      // Save authentication data to AsyncStorage
      const authData = {
        isAuthenticated: true,
        isDevMode: devMode,
        loginTime: new Date().toISOString()
      };
      await AsyncStorage.setItem('authData', JSON.stringify(authData));
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      setIsAuthenticated(false);
      setIsDevMode(false);
      
      // Clear authentication data from AsyncStorage
      await AsyncStorage.removeItem('authData');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  const refreshSession = async () => {
    try {
      const authData = await AsyncStorage.getItem('authData');
      if (authData) {
        const parsedData = JSON.parse(authData);
        const updatedAuthData = {
          ...parsedData,
          loginTime: new Date().toISOString()
        };
        await AsyncStorage.setItem('authData', JSON.stringify(updatedAuthData));
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  if (isLoading) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1e293b" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs}
          initialParams={{ refreshSession }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
