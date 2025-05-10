import type { TextStyle } from "react-native"

export const COLORS = {
  primary: "#3E4095", // Church blue color
  secondary: "#F15A29", // Church orange/accent color
  background: "#F5F5F5", // Light gray background
  cardBackground: "#FFFFFF", // White for cards
  surface: "#FFFFFF", // White surface
  text: "#333333",
  textSecondary: "#666666",
  border: "#EEEEEE",
  error: "#D32F2F",
  success: "#388E3C",
  warning: "#F57C00",
  info: "#1976D2",
}

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const TYPOGRAPHY: Record<string, TextStyle> = {
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 26,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    textTransform: "uppercase",
  },
}
