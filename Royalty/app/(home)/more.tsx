"use client"

import type React from "react"

import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { Link } from "expo-router"
import { DollarSign, Grid, Heart, Calendar, Award, Book, Home, User, Info } from "react-native-feather"

type MenuItem = {
  id: string
  title: string
  icon: React.ReactNode
  path: string
  hasDivider?: boolean
}

export default function MoreScreen() {
  const menuItems: MenuItem[] = [
    {
      id: "giving",
      title: "Giving",
      icon: <DollarSign width={24} height={24} color={COLORS.text} />,
      path: "/giving",
    },
    {
      id: "service-units",
      title: "Service Units",
      icon: <Grid width={24} height={24} color={COLORS.text} />,
      path: "/service-units",
    },
    {
      id: "relationship-groups",
      title: "Relationship Groups",
      icon: <Heart width={24} height={24} color={COLORS.text} />,
      path: "/relationship-groups",
      hasDivider: true,
    },
    {
      id: "special-services",
      title: "Special Services",
      icon: <Calendar width={24} height={24} color={COLORS.text} />,
      path: "/special-services",
    },
    {
      id: "pledge",
      title: "Pledge",
      icon: <Award width={24} height={24} color={COLORS.text} />,
      path: "/pledge",
    },
    {
      id: "creed",
      title: "Creed",
      icon: <Book width={24} height={24} color={COLORS.text} />,
      path: "/creed",
      hasDivider: true,
    },
    {
      id: "branches",
      title: "Branches",
      icon: <Home width={24} height={24} color={COLORS.text} />,
      path: "/branches",
    },
    {
      id: "meet-housekeeper",
      title: "Meet the Housekeeper",
      icon: <User width={24} height={24} color={COLORS.text} />,
      path: "/meet-housekeeper",
    },
    {
      id: "about",
      title: "About",
      icon: <Info width={24} height={24} color={COLORS.text} />,
      path: "/about",
    },
  ]

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <View key={item.id}>
            <Link href={item.path} asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.iconContainer}>{item.icon}</View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            </Link>
            {item.hasDivider && <View style={styles.divider} />}
          </View>
        ))}
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
  menuContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  menuItemText: {
    ...TYPOGRAPHY.body,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
})
