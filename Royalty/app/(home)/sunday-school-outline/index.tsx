"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text } from "../../../components/common/Text"
import { SearchBar } from "../../../components/common/SearchBar"
import { OutlineCard } from "../../../components/outline/OutlineCard"
import { COLORS, SPACING } from "../../../constants/theme"
import { outlinesData } from "../../../mocks/outlines-data"
import { useRouter } from "expo-router"

export default function SundaySchoolOutlineScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Filter outlines based on search query
  const filteredOutlines = outlinesData.filter(
    (outline) =>
      outline.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outline.teacher.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get recent outlines (first 3)
  const recentOutlines = filteredOutlines.slice(0, 3)

  // Get previous outlines (rest)
  const previousOutlines = filteredOutlines.slice(3)

  const handleOutlinePress = (outlineId: string) => {
    router.push(`/sunday-school-outline/${outlineId}`)
  }

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Recent Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent</Text>
          {recentOutlines.map((outline) => (
            <OutlineCard key={outline.id} data={outline} onPress={handleOutlinePress} />
          ))}
        </View>

        {/* Previous Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previous</Text>
          {previousOutlines.map((outline) => (
            <OutlineCard key={outline.id} data={outline} onPress={handleOutlinePress} />
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
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: SPACING.md,
  },
})
