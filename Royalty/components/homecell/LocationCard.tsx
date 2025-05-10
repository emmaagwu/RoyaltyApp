import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "../common/Text"
import { MapPin, Clock, Phone, Share2, Navigation } from "react-native-feather"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"

export type LocationData = {
  id: string
  address: string
  time: string
  phoneNumber: string
  status: string
}

type LocationCardProps = {
  location: LocationData
  onShare: (id: string) => void
  onNavigate: (id: string) => void
}

export function LocationCard({ location, onShare, onNavigate }: LocationCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.addressContainer}>
        <MapPin width={16} height={16} color={COLORS.primary} />
        <Text style={styles.address}>{location.address}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Clock width={14} height={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{location.status}</Text>
          <Text style={styles.timeText}>{location.time}</Text>
        </View>

        <View style={styles.detailRow}>
          <Phone width={14} height={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>Phone Number</Text>
          <Text style={styles.phoneText}>{location.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onShare(location.id)}>
          <Share2 width={20} height={20} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => onNavigate(location.id)}>
          <Navigation width={20} height={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  address: {
    ...TYPOGRAPHY.subtitle,
    fontWeight: "600",
    marginLeft: SPACING.xs,
  },
  detailsContainer: {
    marginBottom: SPACING.sm,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.xs,
  },
  detailText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
    flex: 1,
  },
  timeText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text,
  },
  phoneText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: SPACING.xs,
  },
  actionButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
  },
})
