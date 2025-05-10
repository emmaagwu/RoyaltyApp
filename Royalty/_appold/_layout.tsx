import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ActivityIndicator, View, Linking } from 'react-native';
import { ProtectedWrapper } from '../components/ProtectedWrapper';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '../auth-context';
import Constants from 'expo-constants';
import { supabase } from '@/lib/supabase';


// Initialize WebBrowser to handle OAuth redirects
WebBrowser.maybeCompleteAuthSession();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  // Set up deep link handler
  // Keep a simple version in RootLayout.tsx
  // useEffect(() => {
  //   const subscription = Linking.addEventListener('url', ({ url }) => {
  //     console.log('Received deep link:', url);

  //     // Only dismiss auth session if needed
  //     if (!(Platform.OS === 'android' && Constants.appOwnership === 'expo')) {
  //       try {
  //         WebBrowser.dismissAuthSession();
  //       } catch (dismissError) {
  //         console.log('Error dismissing auth session:', dismissError);
  //       }
  //     }
  //   });

  //   return () => subscription.remove();
  // }, []);
  // _layout.tsx
  // useEffect(() => {
  //   const handleDeepLink = async (url: string | null) => {
  //     if (!url) return;

  //     console.log('Processing deep link:', url);

  //     // Handle Supabase OAuth completion
  //     if (url.includes('#access_token=') || url.includes('code=')) {
  //       // await supabase.auth.startAutoRefresh();

  //       // // Delay slightly to ensure auth state updates
  //       // setTimeout(() => {
  //       //   router.replace('/(tabs)');
  //       // }, 500);
  //       await supabase.auth.startAutoRefresh();
  //     }
  //   };

  //   const subscription = Linking.addEventListener('url', ({ url }) => {
  //     handleDeepLink(url);
  //   });

  //   // Handle cold starts
  //   Linking.getInitialURL().then(handleDeepLink);

  //   return () => subscription.remove();
  // }, []);

  // useEffect(() => {
  //   const handleDeepLink = async (url: string | null) => {
  //     if (!url) return;
  
  //     console.log('Processing deep link:', url);
  
  //     // Handle Supabase OAuth completion
  //     if (url.includes('#access_token=') || url.includes('code=')) {
  //       try {
  //         // For token-based flow (most common in mobile)
  //         if (url.includes('#access_token=')) {
  //           const fragment = url.split('#')[1];
  //           const params = new URLSearchParams(fragment);
  //           const accessToken = params.get('access_token');
  //           const refreshToken = params.get('refresh_token');
            
  //           if (accessToken) {
  //             // Set the session manually
  //             const { data, error } = await supabase.auth.setSession({
  //               access_token: accessToken,
  //               refresh_token: refreshToken || '',
  //             });
              
  //             if (error) {
  //               console.log('Error setting session:', error);
  //             } else {
  //               console.log('Session set successfully:', data);
  //               // Force refresh the auth state
  //               await supabase.auth.startAutoRefresh();
  //             }
  //           }
  //         }
  //         // For code-based flow
  //         else if (url.includes('code=')) {
  //           const urlObj = new URL(url);
  //           const code = urlObj.searchParams.get('code');
            
  //           if (code) {
  //             const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  //             if (error) {
  //               console.log('Error exchanging code:', error);
  //             } else {
  //               console.log('Code exchanged successfully:', data);
  //               await supabase.auth.startAutoRefresh();
  //             }
  //           }
  //         }
  //       } catch (e) {
  //         console.error('Error processing auth redirect:', e);
  //       }
  //     }
  //   };
  
  //   const subscription = Linking.addEventListener('url', ({ url }) => {
  //     handleDeepLink(url);
  //   });
  
  //   // Handle cold starts
  //   Linking.getInitialURL().then(handleDeepLink);
  
  //   return () => subscription.remove();
  // }, []);

  // In _layout.tsx

  useEffect(() => {
    const handleDeepLink = async (url: string | null) => {
      if (!url) return;

      console.log('Processing deep link:', url);

      // Handle Supabase OAuth completion
      if (url.includes('#access_token=') || url.includes('code=')) {
        try {
          // For token-based flow (most common in mobile)
          if (url.includes('#access_token=')) {
            const fragment = url.split('#')[1];
            const params = new URLSearchParams(fragment);
            const accessToken = params.get('access_token');
            const refreshToken = params.get('refresh_token');

            if (accessToken) {
              console.log('Setting session with access token from deep link');

              // Set the session manually
              const { data, error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken || '',
              });

              if (error) {
                console.log('Error setting session:', error);
              } else {
                console.log('Session set successfully from deep link:', data?.user?.email);
                await supabase.auth.startAutoRefresh();

                // Force navigation after a short delay
                setTimeout(() => {
                  router.replace('/(tabs)');
                }, 500);
              }
            }
          }
          // For code-based flow
          else if (url.includes('code=')) {
            const urlObj = new URL(url);
            const code = urlObj.searchParams.get('code');

            if (code) {
              console.log('Exchanging code for session');
              const { data, error } = await supabase.auth.exchangeCodeForSession(code);
              if (error) {
                console.log('Error exchanging code:', error);
              } else {
                console.log('Code exchanged successfully:', data?.user?.email);
                await supabase.auth.startAutoRefresh();

                // Force navigation after a short delay
                setTimeout(() => {
                  router.replace('/(tabs)');
                }, 500);
              }
            }
          }
        } catch (e) {
          console.error('Error processing auth redirect:', e);
          // Make sure loading is turned off even if there's an error
          // You might need to add a function to update loading state here
        }
      }
    };

    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // Handle cold starts
    Linking.getInitialURL().then(handleDeepLink);

    return () => subscription.remove();
  }, []);

  if (!loaded) return null;

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <ProtectedWrapper />
      </ThemeProvider>
    </AuthProvider>
  );
}