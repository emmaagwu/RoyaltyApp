"use client"

import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { Text } from "../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { ArrowLeft } from "react-native-feather"
import { useRouter } from "expo-router"

export default function AboutScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.logoContainer}>
          <Image source={{ uri: "/placeholder.svg?height=120&width=120" }} style={styles.logo} />
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.churchName}>Royalty Assembly</Text>

          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.paragraph}>
            Royalty Assembly is committed to raising a generation of world changers who are equipped to transform their
            communities and influence the world for the glory of God.
          </Text>

          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.paragraph}>
            To create an environment where people discover their royal identity in Christ, develop their God-given
            potential, and deploy their gifts to make a positive impact in the world.
          </Text>

          <Text style={styles.sectionTitle}>Our Values</Text>
          <Text style={styles.paragraph}>
            • Excellence in all we do{"\n"}• Integrity and character development{"\n"}• Compassion and service to
            humanity{"\n"}• Empowerment through biblical teaching{"\n"}• Unity in diversity
          </Text>

          <Text style={styles.sectionTitle}>Our Commitment</Text>
          <Text style={styles.paragraph}>
            At Royalty Assembly, we are committed to helping every member recognize their royal heritage, maximize their
            resources, and make life better for those around them. We believe that as we share our blessings and work
            hard to fulfill our divine assignments, we truly become world changers who influence our generation for
            good.
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
  logoContainer: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
  churchName: {
    ...TYPOGRAPHY.h1,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: SPACING.lg,
    color: COLORS.primary,
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
