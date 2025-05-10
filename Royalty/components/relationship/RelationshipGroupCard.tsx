import { View, StyleSheet, TouchableOpacity, ImageBackground, Linking } from "react-native"
import { Text } from "../common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"

export type RelationshipGroup = {
  id: string
  name: string
  meetingTime: string
  image: string
  whatsappLink: string
  backgroundColor: string
}

type RelationshipGroupCardProps = {
  group: RelationshipGroup
}

export function RelationshipGroupCard({ group }: RelationshipGroupCardProps) {
  const handleJoinWhatsApp = () => {
    Linking.openURL(group.whatsappLink)
  }

  return (
    <ImageBackground
      source={{ uri: group.image }}
      style={[styles.container, { backgroundColor: group.backgroundColor }]}
    >
      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{group.name}</Text>
          <Text style={styles.meetingTime}>{group.meetingTime}</Text>
        </View>

        <TouchableOpacity style={styles.whatsappButton} onPress={handleJoinWhatsApp}>
          <Text style={styles.whatsappButtonText}>Join WhatsApp group</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: SPACING.md,
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  meetingTime: {
    ...TYPOGRAPHY.body,
    color: "#FFFFFF",
    marginTop: SPACING.xs,
  },
  whatsappButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  whatsappButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.text,
  },
})
