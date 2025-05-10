import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../auth-context'; // Import from project root
import { GoogleButton } from '../../components/auth/GoogleButton';
import { InputField } from '../../components/auth/InputField';
import { Button } from '../../components/auth/Button';
import Checkbox from 'expo-checkbox';

export default function Login() {
  // Get authentication functions from our context
  const { login, signInWithGoogle } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });
  const [loading, setLoading] = useState(false);

  // Handle regular email/password login
  const handleLogin = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      const { email, password } = formData;
      
      if (!email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      // Use the login function from our auth context
      await login(email, password);
      // No need to manually navigate - the auth context handles this automatically
      
    } catch (error: any) {
      Alert.alert(
        'Login Error',
        error.message || 'An error occurred during login'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
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
        'Google Login Error',
        errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <Text style={styles.title}>Log In</Text>

      <GoogleButton 
        onPress={handleGoogleLogin} 
        disabled={loading}
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

      <View style={styles.rowContainer}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formData.rememberMe}
            onValueChange={(value) => setFormData(prev => ({ ...prev, rememberMe: value }))}
            color={formData.rememberMe ? '#000000' : undefined}
            disabled={loading}
          />
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => router.push('./forgot-password')}
          disabled={loading}
        >
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <Button 
        onPress={handleLogin} 
        title={loading ? "Logging in..." : "Log In"}
        disabled={loading}
      />

      <TouchableOpacity 
        style={styles.signupLink}
        onPress={() => router.push('./signup')}
        disabled={loading}
      >
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupTextBold}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 25,
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333333',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#666666',
  },
  signupTextBold: {
    fontWeight: '600',
    color: '#000000',
  },
});