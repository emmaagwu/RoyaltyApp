import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { COLORS, SPACING } from '../constants/theme';

export const Footer = () => {
  const router = useRouter();
  const currentPath = usePathname();

  // Navigation items configuration
  const navItems = [
    {
      label: 'Home',
      icon: ({ color }: { color: string }) => (
        <MaterialIcons name="home" size={24} color={color} />
      ),
      path: '/',
    },
    {
      label: 'Devotional',
      icon: ({ color }: { color: string }) => (
        <MaterialIcons name="book" size={24} color={color} />
      ),
      path: '/devotional',
    },
    {
      label: 'Messages',
      icon: ({ color }: { color: string }) => (
        <MaterialIcons name="headset" size={24} color={color} />
      ),
      path: '/messages',
    },
    {
      label: 'Home Cell',
      icon: ({ color }: { color: string }) => (
        <Ionicons name="people" size={24} color={color} />
      ),
      path: '/homecell',
    },
    {
      label: 'More',
      icon: ({ color }: { color: string }) => (
        <MaterialIcons name="menu" size={24} color={color} />
      ),
      path: '/more',
    },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item, index) => {
        const isActive = currentPath === item.path;
        return (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => router.push(item.path)}
          >
            {item.icon({ 
              color: isActive ? COLORS.primary : COLORS.text 
            })}
            <Text
              style={[
                styles.navLabel,
                { color: isActive ? COLORS.primary : COLORS.text },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? SPACING.xl : SPACING.sm, // Extra padding for iOS home indicator
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});