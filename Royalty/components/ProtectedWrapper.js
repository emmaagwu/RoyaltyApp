// import { useEffect } from 'react';
// import { router, Slot, useSegments } from 'expo-router';
// import { useAuth } from '../auth-context';
// import { View, ActivityIndicator } from 'react-native';

// export function ProtectedWrapper() {
//   const { user, loading } = useAuth();
//   const segments = useSegments();

//   useEffect(() => {
//     const inAuthGroup = segments[0] === '(auth)';
    
//     if (!loading) {
//       if (!user && !inAuthGroup) {
//         // If user is not signed in and not on an auth page, redirect to login
//         router.replace('/(auth)/login');
//       } else if (user && inAuthGroup) {
//         // If user is signed in and on an auth page, redirect to home
//         router.replace('/(tabs)');
//       }
//     }
//   }, [user, loading, segments]);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return <Slot />;
// }


import { useEffect } from 'react';
import { router, Slot, useSegments } from 'expo-router';
import { useAuth } from '../auth-context';
import { View, ActivityIndicator, Text } from 'react-native';

// export function ProtectedWrapper() {
//   const { user, loading } = useAuth();
//   const segments = useSegments();
  
//   useEffect(() => {
//     const inAuthGroup = segments[0] === '(auth)';
//     console.log("ProtectedWrapper - Auth state:", { 
//       user: user ? `${user.email} (${user.uid})` : 'null', 
//       loading, 
//       inAuthGroup, 
//       currentSegment: segments[0] 
//     });
    
//     if (!loading) {
//       if (!user && !inAuthGroup) {
//         console.log("Redirecting to login because no user and not in auth group");
//         router.replace('/(auth)/login');
//       } else if (user && inAuthGroup) {
//         console.log("Redirecting to tabs because user exists and in auth group");
//         router.replace('/(tabs)');
//       } else {
//         console.log("No navigation needed. Current path is appropriate for auth state.");
//       }
//     }
//   }, [user, loading, segments]);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//         <Text style={{ marginTop: 10 }}>Loading authentication...</Text>
//       </View>
//     );
//   }

//   return <Slot />;
// }

export function ProtectedWrapper() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  
  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    console.log("ProtectedWrapper - Auth state:", {
      currentSegment: segments[0],
      inAuthGroup,
      loading,
      user: user ? `${user.email} (${user.uid})` : 'null'
    });
    
    // Only handle routing when not in loading state
    if (!loading) {
      if (!user && !inAuthGroup) {
        console.log("Redirecting to login because no user and not in auth group");
        router.replace('/(auth)/login');
      } else if (user && inAuthGroup) {
        console.log("Redirecting to tabs because user exists and in auth group");
        router.replace('/(tabs)');
      } else {
        console.log("No navigation needed. Current path is appropriate for auth state.");
      }
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading authentication...</Text>
      </View>
    );
  }

  return <Slot />;
}

