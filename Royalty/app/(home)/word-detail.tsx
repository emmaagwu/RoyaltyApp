"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from "react-native"
import { Text } from "../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { Heart, Share2, Calendar } from "react-native-feather"
import { useLocalSearchParams, useRouter } from "expo-router"
import { WeekCalendar } from "../../components/calender/WeekCalender"
import { getWordForDate, dailyWords, type WordData } from "../../mocks/word-data"

export default function WordDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)
  const [isLiked, setIsLiked] = useState(false)
  const [currentWord, setCurrentWord] = useState<WordData | null>(null)

  // Initialize with the word from the ID if provided, otherwise use today's date
  useEffect(() => {
    if (id) {
      const wordFromId = dailyWords.find((word) => word.id === id)
      if (wordFromId) {
        setCurrentWord(wordFromId)
        // Set the selected date to match the word's date
        setSelectedDate(new Date(wordFromId.date.year, wordFromId.date.month - 1, wordFromId.date.day))
        return
      }
    }

    // Fallback to today's word if ID not found
    const todayWord = getWordForDate(today.getFullYear(), today.getMonth(), today.getDate())
    setCurrentWord(todayWord)
  }, [id])

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    // Update the current word based on the selected date
    const word = getWordForDate(date.getFullYear(), date.getMonth(), date.getDate())
    setCurrentWord(word)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleShare = () => {
    console.log("Share word")
  }

  const handleMinimize = () => {
    // Navigate back to home page when minimize is clicked
    router.back()
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <WeekCalendar onDateChange={handleDateChange} initialDate={selectedDate} />

      {currentWord ? (
        <ImageBackground
          source={currentWord.backgroundImage}
          style={styles.wordCard}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.wordContent}>{currentWord.fullContent}</Text>

            <View style={styles.actionBar}>
              <View style={styles.interactionContainer}>
                <TouchableOpacity style={styles.interactionButton} onPress={handleLike}>
                  <Heart width={24} height={24} color="#FFFFFF" fill={isLiked ? "#FFFFFF" : "none"} />
                  <Text style={styles.interactionText}>{currentWord.likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.interactionButton} onPress={handleShare}>
                  <Share2 width={24} height={24} color="#FFFFFF" />
                  <Text style={styles.interactionText}>{currentWord.shares}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.minimizeButton} onPress={handleMinimize}>
                <Text style={styles.minimizeText}>Minimize</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.noWordContainer}>
          <Calendar width={48} height={48} color={COLORS.textSecondary} />
          <Text style={styles.noWordTitle}>No Word Available</Text>
          <Text style={styles.noWordMessage}>
            There is no Word for Today available for the selected date. Please select another date or check back later.
          </Text>
          <TouchableOpacity
            style={styles.todayButton}
            onPress={() => {
              const today = new Date()
              setSelectedDate(today)
              const todayWord = getWordForDate(today.getFullYear(), today.getMonth(), today.getDate())
              setCurrentWord(todayWord)
            }}
          >
            <Text style={styles.todayButtonText}>Go to Today's Word</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  wordCard: {
    borderRadius: 12,
    overflow: "hidden",
    minHeight: 400,
  },
  backgroundImage: {
    borderRadius: 12,
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: SPACING.md,
    flex: 1,
    justifyContent: "space-between",
    minHeight: 400,
    borderRadius: 12,
  },
  wordContent: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.md,
  },
  interactionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  interactionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  interactionText: {
    color: "#FFFFFF",
    marginLeft: SPACING.xs,
  },
  minimizeButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
  },
  minimizeText: {
    color: COLORS.text,
    fontWeight: "500",
  },
  noWordContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: SPACING.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  noWordTitle: {
    ...TYPOGRAPHY.h2,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  noWordMessage: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  todayButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
  },
  todayButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
})
