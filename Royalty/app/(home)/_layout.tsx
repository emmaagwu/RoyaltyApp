"use client"

import { Slot } from "expo-router"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { Footer } from "../../components/common/Footer"
import { Header } from "../../components/common/Header"
import { COLORS } from "../../constants/theme"
import { usePathname } from "expo-router"

export default function HomeLayout() {
  const pathname = usePathname()

  // Determine which tab should be active based on the current path
  const getActiveTab = () => {
    if (pathname === "/") return "home"
    if (pathname.includes("/devotional")) return "devotional"
    if (pathname.includes("/messages")) return "messages"
    if (pathname.includes("/home-cell")) return "homeCell"
    if (
      pathname.includes("/more") ||
      pathname.includes("/sunday-school-outline") ||
      pathname.includes("/settings") ||
      pathname.includes("/about")
    )
      return "more"
    return "home"
  }

  // Determine the header title based on the current path
  const getHeaderTitle = () => {
    if (pathname === "/") return "Today,"
    if (pathname.includes("/devotional")) return "Daily Devotional"
    if (pathname.includes("/messages")) return "Messages"
    if (pathname.includes("/home-cell")) return "Home Cell"
    if (pathname.includes("/more")) return "More"
    if (pathname.includes("/sunday-school-outline")) return "Sunday School Outline"
    if (pathname.includes("/settings")) return "Settings"
    if (pathname.includes("/about")) return "About Us"
    return "Worldchangers Church"
  }

  // Get current date for the home screen subtitle
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" }
  const formattedDate = today.toLocaleDateString("en-US", options)

  // Only show subtitle on home screen
  const headerSubtitle = pathname === "/" ? formattedDate : undefined

  const handleNotificationPress = () => {
    console.log("Navigate to notifications")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={getHeaderTitle()} subtitle={headerSubtitle} onNotificationPress={handleNotificationPress} />

      <View style={styles.content}>
        <Slot />
      </View>

      <Footer activeTab={getActiveTab()} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
})
