"use client"

import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { ArrowLeft } from "react-native-feather"
import { useRouter } from "expo-router"
import { ServiceUnitCard } from "../../components/service-units/ServiceUnitCard"
import { serviceUnitsData } from "../../mocks/service-units-data"

export default function ServiceUnitsScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Service Units</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.unitsContainer}>
          {serviceUnitsData.map((unit) => (
            <ServiceUnitCard key={unit.id} unit={unit} />
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
  unitsContainer: {
    gap: SPACING.md,
  },
})
