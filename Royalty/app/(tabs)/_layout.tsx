import React from 'react';
import { Tabs, Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Footer } from '@/components/Footer';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Tabs screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="devotionalDetail" />
        {/* Add other tab screens as needed */}
      </Tabs>
      <Footer />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});