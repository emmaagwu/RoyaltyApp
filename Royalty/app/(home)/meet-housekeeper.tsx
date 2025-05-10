"use client"

import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { Text } from "../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { ArrowLeft } from "react-native-feather"
import { useRouter } from "expo-router"

export default function MeetHousekeeperScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meet the Housekeeper</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.contentCard}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: "/placeholder.svg?height=200&width=200" }} style={styles.pastorImage} />
          </View>

          <Text style={styles.pastorName}>Dr. Anya Oko</Text>
          <Text style={styles.pastorTitle}>Senior Pastor & Founder</Text>

          <Text style={styles.sectionTitle}>About the Housekeeper</Text>
          <Text style={styles.paragraph}>
            Dr. Anya Oko is a visionary leader, teacher of the Word, and passionate world changer. With over two decades
            in ministry, he has dedicated his life to raising a generation of believers who understand their royal
            identity and divine purpose.
          </Text>

          <Text style={styles.paragraph}>
            His dynamic teaching style combines deep biblical insights with practical life applications, making complex
            spiritual truths accessible to people from all walks of life. Dr. Anya is known for his emphasis on
            excellence, integrity, and compassionate service.
          </Text>

          <Text style={styles.paragraph}>
            Under his leadership, Royalty Assembly has grown from a small gathering to a thriving community of believers
            committed to transforming their world through the power of the Gospel.
          </Text>

          <Text style={styles.sectionTitle}>Family</Text>
          <Text style={styles.paragraph}>
            Dr. Anya is happily married to his lovely wife, Amazing Anya, who serves alongside him in ministry.
            Together, they exemplify the godly partnership that they teach and model for the congregation.
          </Text>

          <Text style={styles.sectionTitle}>Vision</Text>
          <Text style={styles.paragraph}>
            Dr. Anya's vision is to see every member of Royalty Assembly equipped to maximize their God-given potential
            and make a significant impact in their sphere of influence. He believes that when believers understand who
            they are in Christ, they naturally become agents of positive change in society.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    fontWeight: "bold",
  },
  contentCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: SPACING.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  pastorImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  pastorName: {
    ...TYPOGRAPHY.h1,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: SPACING.xs,
    color: COLORS.primary,
  },
  pastorTitle: {
    ...TYPOGRAPHY.subtitle,
    textAlign: "center",
    marginBottom: SPACING.lg,
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontWeight: "bold",
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    color: COLORS.text,
  },
  paragraph: {
    ...TYPOGRAPHY.body,
    lineHeight: 24,
    marginBottom: SPACING.md,
    color: COLORS.textSecondary,
  },
})
