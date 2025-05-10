"use client"

import { StyleSheet, ScrollView } from "react-native"
import { WordCard } from "../../components/word/WordCard"
import { getTodaysWord } from "../../mocks/word-data"
import { ServicesSection } from "../../components/services/ServicesSection"
import { servicesData } from "../../mocks/services-data"
import { SPACING } from "../../constants/theme"
import { useRouter } from "expo-router"

export default function HomeScreen() {
  const router = useRouter()
  const todaysWord = getTodaysWord()

  const handleWordExpand = (wordId: string) => {
    // Only pass the ID to the word detail page
    router.push({
      pathname: "/word-detail",
      params: { id: wordId },
    })
  }

  const handleServiceButtonPress = (navigationPath: string) => {
    router.push(`/service-detail/${navigationPath}`)
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <WordCard data={todaysWord} onExpand={handleWordExpand} />
      <ServicesSection services={servicesData} onServiceButtonPress={handleServiceButtonPress} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: SPACING.lg,
  },
})
