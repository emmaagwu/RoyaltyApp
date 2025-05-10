"use client"

import { useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "../common/Text"
import { ChevronLeft, ChevronRight } from "react-native-feather"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"

type DailyCalendarProps = {
  onDateChange: (date: Date) => void
  initialDate?: Date
}

export function DailyCalendar({ onDateChange, initialDate = new Date() }: DailyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate)
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth())
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear)

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = []
    const previousMonthDays = getDaysInMonth(currentMonth - 1, currentYear)

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: previousMonthDays - i,
        isCurrentMonth: false,
        isSelectable: false,
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i)
      date.setHours(0, 0, 0, 0)

      // Can't select future dates beyond today
      const isSelectable = date <= today

      days.push({
        day: i,
        isCurrentMonth: true,
        isSelectable,
        isToday: date.getTime() === today.getTime(),
        isSelected: date.getTime() === currentDate.getTime(),
      })
    }

    // Next month days to fill the grid
    const totalDaysShown = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7
    for (let i = 1; i <= totalDaysShown - (daysInMonth + firstDayOfMonth); i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isSelectable: false,
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    // Don't allow navigating to future months beyond current month
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear

    const isNextMonthInFuture =
      nextYear > today.getFullYear() || (nextYear === today.getFullYear() && nextMonth > today.getMonth())

    if (!isNextMonthInFuture) {
      setCurrentMonth(nextMonth)
      setCurrentYear(nextYear)
    }
  }

  const handleDayPress = (day: number, isSelectable: boolean) => {
    if (isSelectable) {
      const newDate = new Date(currentYear, currentMonth, day)
      setCurrentDate(newDate)
      onDateChange(newDate)
    }
  }

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePreviousMonth} style={styles.navButton}>
          <ChevronLeft width={20} height={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.monthYear}>
          {monthNames[currentMonth]}, {currentYear}
        </Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <ChevronRight width={20} height={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekdaysContainer}>
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <Text key={index} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysContainer}>
        {calendarDays.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              !item.isCurrentMonth && styles.otherMonthDay,
              item.isToday && styles.today,
              item.isSelected && styles.selectedDay,
            ]}
            onPress={() => handleDayPress(item.day, item.isSelectable)}
            disabled={!item.isSelectable}
          >
            <Text
              style={[
                styles.dayText,
                !item.isCurrentMonth && styles.otherMonthDayText,
                item.isToday && styles.todayText,
                item.isSelected && styles.selectedDayText,
                !item.isSelectable && item.isCurrentMonth && styles.disabledDayText,
              ]}
            >
              {item.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  navButton: {
    padding: SPACING.xs,
  },
  monthYear: {
    ...TYPOGRAPHY.subtitle,
    fontWeight: "600",
  },
  weekdaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: SPACING.xs,
  },
  weekday: {
    width: 24,
    textAlign: "center",
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  dayButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 4,
  },
  dayText: {
    ...TYPOGRAPHY.caption,
    textAlign: "center",
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  otherMonthDayText: {
    color: COLORS.textSecondary,
  },
  today: {
    backgroundColor: COLORS.primary + "20", // 20% opacity
  },
  todayText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  selectedDay: {
    backgroundColor: COLORS.text,
    borderRadius: 4,
  },
  selectedDayText: {
    color: COLORS.cardBackground,
    fontWeight: "bold",
  },
  disabledDayText: {
    color: COLORS.textSecondary,
    opacity: 0.5,
  },
})
