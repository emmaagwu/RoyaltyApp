"use client"

import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../../constants/theme"
import { ArrowLeft, Share2, Download, Printer } from "react-native-feather"
import { outlinesData } from "../../../mocks/outlines-data"
import { useLocalSearchParams, useRouter } from "expo-router"

export default function OutlineDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()

  // Find the outline data based on the ID
  const outline = outlinesData.find((o) => o.id === id)

  if (!outline) {
    return (
      <View style={styles.centerContent}>
        <Text>Outline not found</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft width={24} height={24} color={COLORS.text} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{outline.title}</Text>
      <Text style={styles.date}>{outline.date}</Text>
      <Text style={styles.teacher}>Teacher: {outline.teacher}</Text>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 width={20} height={20} color={COLORS.primary} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Download width={20} height={20} color={COLORS.primary} />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Printer width={20} height={20} color={COLORS.primary} />
          <Text style={styles.actionText}>Print</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.outlineContainer}>
        {outline.content.map((line, index) => (
          <Text key={index} style={styles.outlineLine}>
            {line}
          </Text>
        ))}
      </View>

      <View style={styles.referencesContainer}>
        <Text style={styles.referencesTitle}>Scripture References:</Text>
        {outline.references.map((reference, index) => (
          <Text key={index} style={styles.reference}>
            • {reference}
          </Text>
        ))}
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
  title: {
    ...TYPOGRAPHY.h1,
    marginBottom: SPACING.xs,
  },
  date: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  teacher: {
    ...TYPOGRAPHY.body,
    fontStyle: "italic",
    marginBottom: SPACING.md,
  },
  actionsContainer: {
    flexDirection: "row",
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.lg,
  },
  actionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  outlineContainer: {
    marginBottom: SPACING.lg,
  },
  outlineLine: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.sm,
    lineHeight: 24,
  },
  referencesContainer: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.lg,
  },
  referencesTitle: {
    ...TYPOGRAPHY.subtitle,
    marginBottom: SPACING.sm,
  },
  reference: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.xs,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
