"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { WeekCalendar } from "../../components/calender/WeekCalender"
import { MoreVertical, Heart, Share2, MessageCircle, Bookmark } from "react-native-feather"
import { getDevotionalForDate } from "../../mocks/devotional-data"

export default function DevotionalScreen() {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [currentDevotional, setCurrentDevotional] = useState(
    getDevotionalForDate(today.getFullYear(), today.getMonth(), today.getDate()),
  )

  // Update devotional when date changes
  useEffect(() => {
    const devotional = getDevotionalForDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    setCurrentDevotional(devotional)
  }, [selectedDate])

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    console.log("Share devotional")
  }

  const handleComment = () => {
    console.log("Open comments")
  }

  const handleMoreOptions = () => {
    console.log("Show more options")
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <WeekCalendar onDateChange={handleDateChange} initialDate={selectedDate} />

      <View style={styles.devotionalCard}>
        <View style={styles.devotionalHeader}>
          <View>
            <Text style={styles.devotionalTitle}>{currentDevotional.title}</Text>
            <Text style={styles.devotionalVerse}>{currentDevotional.verse}</Text>
          </View>
          <TouchableOpacity onPress={handleMoreOptions}>
            <MoreVertical width={20} height={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <Text style={styles.devotionalContent}>{currentDevotional.content}</Text>

        <View style={styles.actionBar}>
          <View style={styles.leftActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <Heart
                width={20}
                height={20}
                color={COLORS.text}
                fill={isLiked ? COLORS.error : "none"}
                stroke={isLiked ? COLORS.error : COLORS.text}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
              <MessageCircle width={20} height={20} color={COLORS.text} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Share2 width={20} height={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
            <Bookmark
              width={20}
              height={20}
              color={COLORS.text}
              fill={isBookmarked ? COLORS.primary : "none"}
              stroke={isBookmarked ? COLORS.primary : COLORS.text}
            />
          </TouchableOpacity>
        </View>
      </View>
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
  devotionalCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  devotionalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
  },
  devotionalTitle: {
    ...TYPOGRAPHY.h2,
    fontWeight: "bold",
    marginBottom: SPACING.xs,
  },
  devotionalVerse: {
    ...TYPOGRAPHY.caption,
    fontStyle: "italic",
    color: COLORS.textSecondary,
  },
  devotionalContent: {
    ...TYPOGRAPHY.body,
    lineHeight: 24,
    marginBottom: SPACING.md,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: SPACING.xs,
    marginRight: SPACING.sm,
  },
})
