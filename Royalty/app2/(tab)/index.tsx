import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../auth-context'; // Import from project root
import { GoogleButton } from '../../components/auth/GoogleButton';
import { InputField } from '../../components/auth/InputField';
import { Button } from '../../components/auth/Button';
import Checkbox from 'expo-checkbox';

export default function SignUp() {
  // Get authentication functions from our context
  const { signup, signInWithGoogle } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    rememberMe: true,
  });
  const [loading, setLoading] = useState(false);

  // Handle regular email/password signup
  const handleSignUp = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      const { email, password, fullName } = formData;
      
      if (!email || !password || !fullName) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      // Use the signUp function from our auth context
      await signup(email, password, fullName);
      // No need to manually navigate - the auth context handles this automatically
      
    } catch (error) {
      Alert.alert(
        'Sign Up Error', error.message || 'An error occurred during sign up'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Google signup
  const handleGoogleSignUp = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      // Use the signInWithGoogle function from our auth context
      await signInWithGoogle();
      // No need to manually navigate - the auth context handles this automatically
    } catch (error: any) {

      // More specific error handling
      let errorMessage = 'An error occurred during Google login';
      if (error.message.includes('cancelled')) {
        errorMessage = 'Sign in was cancelled';
      } else if (error.message.includes('No access token')) {
        errorMessage = 'Unable to get access from Google. Please try again.';
      }
      Alert.alert(
        'Google Sign Up Error',
        error.message || 'An error occurred during Google sign up'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <StatusBar style="dark" />
      
      <Text style={styles.title}>Sign Up</Text>

      <GoogleButton 
        onPress={handleGoogleSignUp} 
        disabled={loading}
      />

      <InputField
        placeholder="John Doe"
        value={formData.fullName}
        onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
        label="First & Last Name"
        editable={!loading}
      />

      <InputField
        placeholder="johndoe@example.com"
        value={formData.email}
        onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
        label="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <InputField
        placeholder="••••••••"
        value={formData.password}
        onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
        label="Password"
        secureTextEntry
        editable={!loading}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={formData.rememberMe}
          onValueChange={(value) => setFormData(prev => ({ ...prev, rememberMe: value }))}
          color={formData.rememberMe ? '#000000' : undefined}
          disabled={loading}
        />
        <Text style={styles.checkboxLabel}>Remember me</Text>
      </View>

      <Button 
        onPress={handleSignUp} 
        title={loading ? "Signing up..." : "Continue"}
        disabled={loading}
      />

      <TouchableOpacity 
        style={styles.loginLink}
        onPress={() => router.push('/(auth)/login')}
      >
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginTextBold}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F2F2F2',
    padding: 25,
    justifyContent: 'center',
  },
  title: {
    marginTop: 75,
    width: 106,
    height: 47,    
    fontFamily: Platform.OS === 'ios' ? 'Chopin-Trial' : 'chopin-trial',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 46,
    color: '#000000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333333',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666666',
  },
  loginTextBold: {
    fontWeight: '600',
    color: '#000000',
  },
});

// import { View, Text, StyleSheet } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';

// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <ThemedText>Home</ThemedText>
//       <Text style={{ color: 'green', fontSize: 40 }}>Home</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

