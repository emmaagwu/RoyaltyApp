import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

interface GoogleButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export function GoogleButton({ onPress, disabled }: GoogleButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/google-logo.png')}
          style={styles.icon}
        />
        <Text style={styles.text}>Sign up with Google</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 340,
    height: 50,
    backgroundColor: '#E5E5E5',
    borderRadius: 16,
    marginTop: 167,
    padding: 12,
    alignSelf: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7.44,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
});