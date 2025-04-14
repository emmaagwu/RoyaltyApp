import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

type ServiceCardProps = {
  title: string;
  time: string;
  description: string;
  imageSource: any;
  buttonText: string;
  navigationPath: string;
};

export const ServiceCard = ({ 
  title, 
  time, 
  description, 
  imageSource, 
  buttonText,
  navigationPath 
}: ServiceCardProps) => {
  // Calculate dimensions
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth - (SPACING.md * 2);
  const imageHeight = 180;

  // Truncate description if it's too long (roughly 100 characters)
  const truncatedDescription = description.length > 100 
    ? `${description.substring(0, 97)}...` 
    : description;

  return (
    <Card style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={[styles.image, { width: cardWidth - SPACING.md * 2, height: imageHeight }]}
          resizeMode="cover"
        />
      </View>
      
      <Card.Content style={styles.contentContainer}>
        {/* Text content container */}
        <View style={styles.textContent}>
          <Text style={styles.serviceTitle}>{title}</Text>
          <Text style={styles.serviceDescription} numberOfLines={2}>
            {truncatedDescription}
          </Text>
          <Text style={styles.serviceTime}>{time}</Text>
        </View>
        
        {/* Button container */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => router.push(navigationPath)}
            style={styles.actionButton}
            labelStyle={styles.buttonLabel}
            buttonColor={COLORS.text}
          >
            {buttonText}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
  },
  imageContainer: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  image: {
    borderRadius: 8,
  },
  contentContainer: {
    paddingTop: 0,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  textContent: {
    alignItems: 'flex-start', // Ensures left alignment
    marginBottom: SPACING.lg, // Space between text and button
  },
  serviceTitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    textAlign: 'left',
  },
  serviceDescription: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'left',
  },
  serviceTime: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text,
    textAlign: 'left',
  },
  buttonContainer: {
    alignItems: 'flex-end', // Aligns button to the right
    marginTop: 'auto', // Pushes button to the bottom
  },
  actionButton: {
    borderRadius: 20, // Matches WordCard button style
    width: 120, // Fixed width for consistency
    marginLeft: 'auto', // Helps with right alignment
  },
  buttonLabel: {
    color: 'white',
    ...TYPOGRAPHY.body,
    fontSize: 14, // Slightly smaller text
  },
});