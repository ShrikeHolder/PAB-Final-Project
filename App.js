import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import SavedScreen from './src/screens/SavedScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2196F3' }}>
          <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>⚠️ Oops!</Text>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', paddingHorizontal: 30 }}>
            Terjadi kesalahan dalam aplikasi. Silakan restart aplikasi.
          </Text>
        </SafeAreaProvider>
      );
    }

    return this.props.children;
  }
}

// Main App Component
export default function App() {
  // Cek jika ada eksport ganda dari expo-router
  useEffect(() => {
    // Log untuk debugging
    console.log('App component mounted');
    
    // Cek jika ada konflik dengan expo-router
    if (typeof window !== 'undefined') {
      const hasExpoRouter = window.location.pathname.includes('_expo');
      if (hasExpoRouter) {
        console.warn('Expo router detected, may cause navigation issues');
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
        <NavigationContainer
          onStateChange={(state) => {
            // Debug navigation state
            console.log('Navigation state changed:', state);
          }}
          onReady={() => {
            console.log('NavigationContainer ready');
          }}
        >
          <Stack.Navigator 
            initialRouteName="Splash"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#2196F3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
              },
              headerBackTitleStyle: {
                fontSize: 14,
              },
              cardStyle: {
                backgroundColor: '#FFFFFF',
              },
              animationEnabled: true,
              gestureEnabled: true,
            }}
          >
            <Stack.Screen 
              name="Splash" 
              component={SplashScreen} 
              options={{ 
                headerShown: false,
                gestureEnabled: false 
              }}
            />
            
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ 
                headerShown: false,
                gestureEnabled: false 
              }}
            />
            
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{ 
                headerShown: false,
                gestureEnabled: true 
              }}
            />
            
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ 
                headerShown: false,
                gestureEnabled: false 
              }}
            />
            
            <Stack.Screen 
              name="Saved" 
              component={SavedScreen} 
              options={{ 
                title: 'Kota Tersimpan',
                headerBackTitle: 'Kembali',
                headerBackTitleVisible: true,
                headerTitleAlign: 'center',
              }}
            />
            
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ 
                title: 'Profil Pengguna',
                headerBackTitle: 'Kembali',
                headerBackTitleVisible: true,
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}