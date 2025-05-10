"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text } from "../../components/common/Text"
import { SearchBar } from "../../components/common/SearchBar"
import { LocationCard, type LocationData } from "../../components/homecell/LocationCard"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"

// Mock data for locations
const locationsData: LocationData[] = [
  {
    id: "1",
    address: "54 Akainna by Faults Road",
    time: "10:00am",
    phoneNumber: "08035555555",
    status: "Gabriel Oyedepo",
  },
  {
    id: "2",
    address: "54 Akainna by Faults Road",
    time: "4:00pm",
    phoneNumber: "08045666666",
    status: "Gabriel Oyedepo",
  },
  {
    id: "3",
    address: "54 Akainna by Faults Road",
    time: "6:00pm",
    phoneNumber: "08035555555",
    status: "Gabriel Oyedepo",
  },
]

export default function HomeCellScreen() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleShare = (id: string) => {
    console.log("Share location:", id)
  }

  const handleNavigate = (id: string) => {
    console.log("Navigate to location:", id)
  }

  // Filter locations based on search query
  const filteredLocations = locationsData.filter(
    (location) =>
      location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Locations</Text>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {filteredLocations.map((location) => (
            <LocationCard key={location.id} location={location} onShare={handleShare} onNavigate={handleNavigate} />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  sectionContainer: {
    flex: 1,
    paddingTop: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.lg,
  },
})
