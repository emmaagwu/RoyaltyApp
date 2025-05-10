import { View, StyleSheet, TouchableOpacity, Image, type ImageSourcePropType } from "react-native"
import { Text } from "../common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"

export type ServiceData = {
  id: string
  title: string
  description: string
  time: string
  image: ImageSourcePropType
  buttonText: string
  navigationPath: string
}

type ServiceCardProps = {
  data: ServiceData
  onButtonPress: (navigationPath: string) => void
}

export function ServiceCard({ data, onButtonPress }: ServiceCardProps) {
  return (
    <View style={styles.container}>
      <Image source={data.image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.time}>{data.time}</Text>

        <TouchableOpacity style={styles.button} onPress={() => onButtonPress(data.navigationPath)}>
          <Text style={styles.buttonText}>{data.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  content: {
    padding: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h2,
    marginBottom: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  time: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.md,
  },
  button: {
    backgroundColor: COLORS.text,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 14,
  },
})
