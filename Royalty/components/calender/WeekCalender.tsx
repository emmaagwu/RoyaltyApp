"use client"

import { useState, useEffect, useRef } from "react"
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { Text } from "../common/Text"
import { ChevronLeft, ChevronRight } from "react-native-feather"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"

type WeekCalendarProps = {
  onDateChange: (date: Date) => void
  initialDate?: Date
}

export function WeekCalendar({ onDateChange, initialDate = new Date() }: WeekCalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate)
  const [visibleDates, setVisibleDates] = useState<Date[]>([])
  const scrollViewRef = useRef<ScrollView>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const screenWidth = Dimensions.get("window").width
  const dayWidth = 40 // Width of each day item
  const visibleDaysCount = 7 // Number of days visible at once
  const totalDaysToRender = 31 // Total days to render (should be enough for a month)

  // Initialize visible dates
  useEffect(() => {
    generateDates(currentDate)
  }, [])

  // Generate dates centered around the selected date
  const generateDates = (centerDate: Date) => {
    const dates: Date[] = []
    const middleIndex = Math.floor(totalDaysToRender / 2)

    for (let i = 0; i < totalDaysToRender; i++) {
      const date = new Date(centerDate)
      date.setDate(centerDate.getDate() - middleIndex + i)
      dates.push(date)
    }

    setVisibleDates(dates)

    // Scroll to the center date
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: middleIndex * dayWidth - (screenWidth - dayWidth) / 2 + dayWidth / 2,
        animated: false,
      })
    }, 0)
  }

  const handleDatePress = (date: Date) => {
    setCurrentDate(date)
    onDateChange(date)
    generateDates(date)
  }

  const handleScroll = (event: any) => {
    setScrollPosition(event.nativeEvent.contentOffset.x)
  }

  const handleScrollEnd = (event: any) => {
    const newPosition = event.nativeEvent.contentOffset.x

    // If we're near the beginning or end, regenerate dates
    if (newPosition < dayWidth * 5 || newPosition > dayWidth * (totalDaysToRender - visibleDaysCount - 5)) {
      // Find the date that's currently in the center of the view
      const centerIndex = Math.floor(newPosition / dayWidth) + Math.floor(visibleDaysCount / 2)
      if (visibleDates[centerIndex]) {
        generateDates(visibleDates[centerIndex])
      }
    }
  }

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(1) // Go to the first day of the current month
    newDate.setMonth(newDate.getMonth() - 1) // Go to the previous month
    setCurrentDate(newDate)
    onDateChange(newDate)
    generateDates(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(1) // Go to the first day of the current month
    newDate.setMonth(newDate.getMonth() + 1) // Go to the next month
    setCurrentDate(newDate)
    onDateChange(newDate)
    generateDates(newDate)
  }

  // Double tap on month name to return to today
  const handleMonthYearPress = () => {
    const today = new Date()
    setCurrentDate(today)
    onDateChange(today)
    generateDates(today)
  }

  // Get the month and year of the current date
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"]

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePreviousMonth} style={styles.navButton}>
          <ChevronLeft width={20} height={20} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMonthYearPress}>
          <Text style={styles.monthYear}>
            {monthNames[currentMonth]}, {currentYear}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <ChevronRight width={20} height={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {visibleDates.map((date, index) => {
          const isToday = isSameDay(date, today)
          const isSelected = isSameDay(date, currentDate)
          const isInCurrentMonth = isCurrentMonth(date)
          const dayName = dayNames[date.getDay()]

          return (
            <TouchableOpacity key={`date-${index}`} style={styles.dayContainer} onPress={() => handleDatePress(date)}>
              <Text
                style={[
                  styles.dayName,
                  !isInCurrentMonth && styles.otherMonthText,
                  isSelected && styles.selectedDayName,
                ]}
              >
                {dayName}
              </Text>
              <View style={[styles.dateCircle, isSelected && styles.selectedCircle]}>
                <Text
                  style={[
                    styles.dateText,
                    !isInCurrentMonth && styles.otherMonthText,
                    isSelected && styles.selectedDateText,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  navButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  monthYear: {
    ...TYPOGRAPHY.subtitle,
    fontWeight: "600",
    color: COLORS.text,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xs,
  },
  dayContainer: {
    width: 40,
    alignItems: "center",
    paddingVertical: SPACING.xs,
  },
  dayName: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
    fontWeight: "500",
  },
  dateCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },
  selectedCircle: {
    backgroundColor: "#000000",
  },
  selectedDateText: {
    color: "#FFFFFF",
  },
  selectedDayName: {
    color: COLORS.text,
  },
  otherMonthText: {
    opacity: 0.3,
  },
})
