"use client"

import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { ArrowLeft } from "react-native-feather"
import { useRouter } from "expo-router"

type ProgrammeItem = {
  name: string
  month: string
}

export default function SpecialServicesScreen() {
  const router = useRouter()

  const programmes: ProgrammeItem[] = [
    { name: "Vision Watch", month: "January" },
    { name: "Anniversary", month: "March/April" },
    { name: "Pastor's Birthday", month: "May" },
    { name: "Mothers Day", month: "May" },
    { name: "Sisters Day", month: "June" },
    { name: "Fathers Day", month: "July" },
    { name: "Relationship Days", month: "August" },
    { name: "Pastor's Appreciation", month: "September" },
    { name: "Month of Fun", month: "October" },
    { name: "Thanksgiving", month: "December" },
    { name: "Crossover Night", month: "December" },
  ]

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Special Programmes</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.programmesList}>
          {programmes.map((programme, index) => (
            <View key={index} style={styles.programmeItem}>
              <Text style={styles.programmeName}>{programme.name}</Text>
              <Text style={styles.programmeMonth}>{programme.month}</Text>
            </View>
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
  programmesList: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  programmeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  programmeName: {
    ...TYPOGRAPHY.body,
    fontWeight: "500",
  },
  programmeMonth: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
})
