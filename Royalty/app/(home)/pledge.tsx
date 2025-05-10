"use client"

import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { ArrowLeft } from "react-native-feather"
import { useRouter } from "expo-router"

export default function PledgeScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pledge</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.pledgeCard}>
          <Text style={styles.pledgeTitle}>As a worldchanger</Text>

          <Text style={styles.pledgeItem}>I pledge to __________ land my nation</Text>

          <Text style={styles.pledgeItem}>To acknowledge that God brought me here by divine design</Text>

          <Text style={styles.pledgeItem}>To commit to love, cherish and adore her always</Text>

          <Text style={styles.pledgeItem}>To accept my sacred responsibility to transform and develop her</Text>

          <Text style={styles.pledgeItem}>To not forget her wherever I go</Text>

          <Text style={styles.pledgeItem}>
            To preserve her future and do everything within my power to ensure her continuity
          </Text>

          <Text style={styles.pledgeClosing}>This I will do with God's help, Amen.</Text>
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
  pledgeCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: SPACING.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pledgeTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.md,
    textAlign: "center",
  },
  pledgeItem: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.md,
    lineHeight: 24,
  },
  pledgeClosing: {
    ...TYPOGRAPHY.body,
    marginTop: SPACING.md,
    fontWeight: "500",
    textAlign: "center",
    fontStyle: "italic",
  },
})
