import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { Home, BookOpen, Headphones, Users, Menu } from "react-native-feather"
import { COLORS, SPACING } from "../../constants/theme"
import { Link } from "expo-router"

type FooterProps = {
  activeTab: string
}

export function Footer({ activeTab }: FooterProps) {
  const footerItems = [
    {
      key: "home",
      label: "Home",
      icon: <Home width={24} height={24} color={activeTab === "home" ? COLORS.primary : COLORS.textSecondary} />,
      href: "/",
    },
    {
      key: "devotional",
      label: "Devotional",
      icon: (
        <BookOpen width={24} height={24} color={activeTab === "devotional" ? COLORS.primary : COLORS.textSecondary} />
      ),
      href: "/devotional",
    },
    {
      key: "messages",
      label: "Messages",
      icon: (
        <Headphones width={24} height={24} color={activeTab === "messages" ? COLORS.primary : COLORS.textSecondary} />
      ),
      href: "/messages",
    },
    {
      key: "homeCell",
      label: "Home Cell",
      icon: <Users width={24} height={24} color={activeTab === "homeCell" ? COLORS.primary : COLORS.textSecondary} />,
      href: "/home-cell",
    },
    {
      key: "more",
      label: "More",
      icon: <Menu width={24} height={24} color={activeTab === "more" ? COLORS.primary : COLORS.textSecondary} />,
      href: "/more",
    },
  ]

  return (
    <View style={styles.container}>
      {footerItems.map((item) => (
        <Link key={item.key} href={item.href} asChild>
          <TouchableOpacity style={styles.tabButton}>
            <View style={styles.tabContent}>
              {activeTab === item.key && <View style={styles.activeIndicator} />}
              <View style={styles.iconContainer}>{item.icon}</View>
              <Text style={[styles.tabLabel, activeTab === item.key ? styles.activeLabel : styles.inactiveLabel]}>
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  )
}

const { width } = Dimensions.get("window")
const TAB_WIDTH = width / 5

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
    height: 80,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: SPACING.sm, // Add some padding at the bottom for devices with home indicator
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: TAB_WIDTH,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    width: "60%",
    height: 3,
    backgroundColor: COLORS.text,
    borderRadius: 1.5,
  },
  iconContainer: {
    marginBottom: SPACING.xs,
  },
  tabLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  activeLabel: {
    color: COLORS.text,
    fontWeight: "500",
  },
  inactiveLabel: {
    color: COLORS.textSecondary,
  },
})
