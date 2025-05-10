import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { Search } from "react-native-feather"
import { COLORS, SPACING } from "../../constants/theme"

type SearchBarProps = {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChangeText, placeholder = "Search" }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.textSecondary}
      />
      <TouchableOpacity style={styles.iconContainer}>
        <Search width={18} height={18} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    height: "100%",
  },
  iconContainer: {
    padding: SPACING.xs,
  },
})