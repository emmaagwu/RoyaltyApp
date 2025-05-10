"use client"

import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../../constants/theme"
import { ArrowLeft, FileText } from "react-native-feather"
import { useLocalSearchParams, useRouter } from "expo-router"

// Mock detailed content for each service
const serviceDetails = {
  "sunday-school": {
    title: "Sunday School",
    description:
      "Our Sunday School program is designed to provide in-depth biblical teaching and discussion for leaders and members.",
    schedule: "Every Sunday, 7:30 - 8:30am",
    location: "Main Church Building, Rooms 101-105",
    content: [
      "Sunday School is a foundational part of our church's discipleship program. It provides an opportunity for deeper study of God's Word in a smaller group setting.",
      "Each class is led by experienced teachers who are committed to helping you understand and apply biblical principles to your daily life.",
      "Classes are organized by age groups and leadership levels to ensure relevant teaching for everyone.",
      "Current Curriculum: 'Foundations of Faith' - A 12-week study on the core doctrines of Christianity.",
    ],
    contactPerson: "John Smith",
    contactEmail: "john.smith@church.org",
  },
  "sunday-service": {
    title: "Sunday Service",
    description: "Our main worship service brings together the entire congregation for praise, prayer, and preaching.",
    schedule: "Every Sunday, 9:00 - 11:30am",
    location: "Main Sanctuary",
    content: [
      "Our Sunday Service is the highlight of our week as we gather together as a church family to worship God and hear His Word.",
      "The service includes contemporary worship led by our praise team, prayer time, announcements of church activities, and a biblically-based sermon from our pastor.",
      "Communion is served on the first Sunday of each month.",
      "Translation services are available for Spanish and French speakers.",
    ],
    contactPerson: "Pastor David Johnson",
    contactEmail: "pastor@church.org",
  },
  "childrens-church": {
    title: "Children's Church",
    description: "Age-appropriate worship and learning experiences for children ages 3-12.",
    schedule: "Every Sunday, 9:00 - 11:30am (during main service)",
    location: "Children's Wing, Rooms 201-205",
    content: [
      "Our Children's Church program provides a safe, fun, and educational environment where children can learn about God's love and biblical principles at their own level.",
      "Children are grouped by age: Preschool (3-5), Elementary (6-9), and Pre-teens (10-12).",
      "Each session includes worship songs, Bible stories, crafts, games, and small group discussions.",
      "Our curriculum is designed to help children develop a strong foundation of faith and character.",
      "All our children's workers undergo background checks and training to ensure the safety and well-being of your children.",
    ],
    contactPerson: "Sarah Williams",
    contactEmail: "children@church.org",
  },
}

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()

  // Get the service details based on the ID
  const details = serviceDetails[id as keyof typeof serviceDetails]

  if (!details) {
    return (
      <View style={styles.centerContent}>
        <Text>Service not found</Text>
      </View>
    )
  }

  // Show the Sunday School Outlines button only for the Sunday School service
  const showOutlinesButton = id === "sunday-school"

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft width={24} height={24} color={COLORS.text} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{details.description}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Schedule</Text>
        <Text style={styles.infoText}>{details.schedule}</Text>

        <Text style={styles.infoTitle}>Location</Text>
        <Text style={styles.infoText}>{details.location}</Text>
      </View>

      <Text style={styles.sectionTitle}>About This Service</Text>

      {details.content.map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>
          {paragraph}
        </Text>
      ))}

      {showOutlinesButton && (
        <TouchableOpacity style={styles.outlinesButton} onPress={() => router.push("/sunday-school-outline")}>
          <FileText width={20} height={20} color="#FFFFFF" />
          <Text style={styles.outlinesButtonText}>View Sunday School Outlines</Text>
        </TouchableOpacity>
      )}

      <View style={styles.contactBox}>
        <Text style={styles.contactTitle}>Contact Information</Text>
        <Text style={styles.contactText}>{details.contactPerson}</Text>
        <Text style={styles.contactEmail}>{details.contactEmail}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  backButtonContainer: {
    marginBottom: SPACING.md,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: SPACING.xs,
    color: COLORS.text,
  },
  description: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  infoBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  infoTitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  infoText: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.md,
  },
  paragraph: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.md,
    lineHeight: 24,
  },
  outlinesButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.md,
    marginVertical: SPACING.lg,
  },
  outlinesButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    marginLeft: SPACING.sm,
  },
  contactBox: {
    backgroundColor: COLORS.primary + "10", // 10% opacity of primary color
    borderRadius: 12,
    padding: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  contactTitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  contactText: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.xs,
  },
  contactEmail: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
