import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import { HomeHeader } from '../../components/HomeHeader';
import { WordCard } from '../../components/WordCard';
import { ServiceCard } from '../../components/ServiceCard';

import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function HomeScreen() {
  const services = [
    {
      title: 'Sunday School',
      time: '8:00 AM - 9:00 AM',
      description: 'Join us for an hour of biblical teaching and discussion.',
      imageSource: require('../../assets/sunday-school.jpg'), // You'll need to add these images
      buttonText: 'View Outline',
      navigationPath: '/sunday-school-outline', // We'll create this route later
    },
    {
      title: 'Sunday Service',
      time: '9:30 AM - 11:30 AM',
      description: 'Our main worship service with praise, prayer, and preaching.',
      imageSource: require('../../assets/sunday-service.jpg'),
      buttonText: 'Stream Service',
      navigationPath: '/live-stream',
    },
    {
      title: "Children's Church",
      time: '9:30 AM - 11:30 AM',
      description: 'Age-appropriate worship and learning for our young ones.',
      imageSource: require('../../assets/children-church.jpg'),
      buttonText: 'Partner',
      navigationPath: '/partnership',
    },
  ];

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <HomeHeader />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <WordCard />
            <Text style={styles.sectionTitle}>Services</Text>
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
            <View style={styles.bottomSpacing} />
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* <Footer /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionTitle: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  bottomSpacing: {
    height: SPACING.xl,
  },
});