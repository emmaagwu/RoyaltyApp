import { Text as RNText, type TextProps, StyleSheet } from "react-native"
import { COLORS, TYPOGRAPHY } from "../../constants/theme"

export function Text({ style, ...props }: TextProps) {
  return <RNText style={[styles.text, style]} {...props} />
}

const styles = StyleSheet.create({
  text: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
})
