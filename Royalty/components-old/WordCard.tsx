import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, IconButton, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { Link } from 'expo-router';

export const WordCard = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/word-background.jpg')} // You'll need to add this image
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <Text style={styles.title}>WORLDCHANGERS WORD FOR TODAY</Text>
          <Text style={styles.excerpt} numberOfLines={4}>
            Highly Cherished, don't allow people's concern for your good kill the dream God put in your heart.
          </Text>
          <View style={styles.footer}>
            <View style={styles.actions}>
              <IconButton
                icon="heart-outline"
                size={24}
                iconColor="white"
                onPress={() => {}}
              />
              <IconButton
                icon="chat-outline"
                size={24}
                iconColor="white"
                onPress={() => {}}
              />
              <IconButton
                icon="share-outline"
                size={24}
                iconColor="white"
                onPress={() => {}}
              />
            </View>            
            <Link href="/devotionalDetail" asChild>
              <Button
                mode="contained"
                style={styles.expandButton}
                labelStyle={styles.expandButtonText}
              >
                Expand
              </Button>
            </Link>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: SPACING.md,
    height: 280,
    borderRadius: 12,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'space-between',
  },
  title: {
    ...TYPOGRAPHY.title,
    color: 'white',
    marginBottom: SPACING.sm,
  },
  excerpt: {
    ...TYPOGRAPHY.body,
    color: 'white',
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  actions: {
    flexDirection: 'row',
  },
  expandButton: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  expandButtonText: {
    color: COLORS.text,
  },
});