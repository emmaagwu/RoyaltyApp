import { View, StyleSheet, TouchableOpacity, Image, Linking } from "react-native"
import { Text } from "../common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { Copy } from "react-native-feather"
import * as Clipboard from "expo-clipboard"

export type ServiceUnit = {
  id: string
  name: string
  meetingTime: string
  venue: string
  leader: string
  contact: string
  image: string
  whatsappLink: string
}

type ServiceUnitCardProps = {
  unit: ServiceUnit
}

export function ServiceUnitCard({ unit }: ServiceUnitCardProps) {
  const handleCopyContact = () => {
    Clipboard.setStringAsync(unit.contact)
  }

  const handleJoinWhatsApp = () => {
    Linking.openURL(unit.whatsappLink)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: unit.image }} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{unit.name}</Text>

          <View style={styles.detailsRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Meeting Time</Text>
              <Text style={styles.detailValue}>{unit.meetingTime}</Text>
            </View>

            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Venue</Text>
              <Text style={styles.detailValue}>{unit.venue}</Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Leader</Text>
              <Text style={styles.detailValue}>{unit.leader}</Text>
            </View>

            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Contact</Text>
              <View style={styles.contactContainer}>
                <Text style={styles.detailValue}>{unit.contact}</Text>
                <TouchableOpacity onPress={handleCopyContact} style={styles.copyButton}>
                  <Copy width={16} height={16} color={COLORS.text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.whatsappButton} onPress={handleJoinWhatsApp}>
        <Text style={styles.whatsappButtonText}>Join WhatsApp group</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  content: {
    flexDirection: "row",
    padding: SPACING.md,
  },
  image: {
    width: 80,
    height: 140,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    ...TYPOGRAPHY.h3,
    fontWeight: "bold",
    marginBottom: SPACING.sm,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    ...TYPOGRAPHY.body,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  whatsappButton: {
    backgroundColor: "#000000",
    paddingVertical: SPACING.sm,
    alignItems: "center",
  },
  whatsappButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
})
