"use client"

import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { ArrowLeft, Gift } from "react-native-feather"
import { useRouter } from "expo-router"

export default function GivingScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft width={24} height={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giving</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.comingSoonContainer}>
        <Gift width={80} height={80} color={COLORS.primary} />
        <Text style={styles.comingSoonTitle}>Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          We're working on making online giving available. This feature will be ready soon!
        </Text>
        <Text style={styles.comingSoonSubtext}>"God loves a cheerful giver" - 2 Corinthians 9:7</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  comingSoonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  comingSoonTitle: {
    ...TYPOGRAPHY.h1,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  comingSoonText: {
    ...TYPOGRAPHY.body,
    textAlign: "center",
    marginBottom: SPACING.lg,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  comingSoonSubtext: {
    ...TYPOGRAPHY.subtitle,
    fontStyle: "italic",
    textAlign: "center",
    color: COLORS.text,
  },
})
