"use client"

import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { ArrowLeft } from "react-native-feather"
import { useRouter } from "expo-router"

export default function CreedScreen() {
  const router = useRouter()

  const creedStatements = [
    "I'm Royalty",
    "I'm anointed a saviour to my generation",
    "I'm blessed",
    "I'm equipped with all I need to be great",
    "I shine",
    "I actualize my blessing",
    "I work hard to maximize my resources",
    "I share my blessing",
    "I make life better for those who are in contact with me",
    "I'm a worldchanger!",
    "I influence my world to the glory of God",
    "Wow! I am blessed!",
  ]

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Creed</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.creedCard}>
          {creedStatements.map((statement, index) => (
            <Text key={index} style={styles.creedStatement}>
              {statement}
            </Text>
          ))}
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
  creedCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: SPACING.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  creedStatement: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.md,
    lineHeight: 24,
    fontWeight: "500",
  },
})
