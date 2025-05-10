"use client"

import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native"
import { Text } from "../../components/common/Text"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"
import { ArrowLeft, MapPin, Phone, Globe } from "react-native-feather"
import { useRouter } from "expo-router"

type Branch = {
  id: string
  name: string
  address: string
  phone: string
  serviceTimes: string
  mapLink: string
}

export default function BranchesScreen() {
  const router = useRouter()

  const branches: Branch[] = [
    {
      id: "1",
      name: "Aba Headquarters",
      address: "82 Asa Rd, Aba, Abia State",
      phone: "08012345678",
      serviceTimes: "Sundays: 8:00am & 10:30am | Wednesdays: 6:00pm",
      mapLink: "https://maps.google.com/?q=82+Asa+Rd+Aba",
    },
    {
      id: "2",
      name: "Lagos Branch",
      address: "15 Victoria Island, Lagos",
      phone: "08023456789",
      serviceTimes: "Sundays: 8:00am & 10:30am | Wednesdays: 6:00pm",
      mapLink: "https://maps.google.com/?q=Victoria+Island+Lagos",
    },
    {
      id: "3",
      name: "Port Harcourt Branch",
      address: "24 Aba Road, Port Harcourt, Rivers State",
      phone: "08034567890",
      serviceTimes: "Sundays: 8:00am & 10:30am | Wednesdays: 6:00pm",
      mapLink: "https://maps.google.com/?q=Aba+Road+Port+Harcourt",
    },
  ]

  const campusFellowships = [
    "University of Port Harcourt",
    "Rivers State University",
    "Abia State University",
    "University of Lagos",
    "University of Nigeria, Nsukka",
  ]

  const handleOpenMap = (mapLink: string) => {
    Linking.openURL(mapLink)
  }

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft width={24} height={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Branches</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.sectionTitle}>Main Branches</Text>

        {branches.map((branch) => (
          <View key={branch.id} style={styles.branchCard}>
            <Text style={styles.branchName}>{branch.name}</Text>

            <View style={styles.branchDetail}>
              <MapPin width={18} height={18} color={COLORS.primary} style={styles.icon} />
              <Text style={styles.detailText}>{branch.address}</Text>
              <TouchableOpacity onPress={() => handleOpenMap(branch.mapLink)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>View Map</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.branchDetail}>
              <Phone width={18} height={18} color={COLORS.primary} style={styles.icon} />
              <Text style={styles.detailText}>{branch.phone}</Text>
              <TouchableOpacity onPress={() => handleCall(branch.phone)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Call</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.branchDetail}>
              <Globe width={18} height={18} color={COLORS.primary} style={styles.icon} />
              <Text style={styles.detailText}>{branch.serviceTimes}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Campus Fellowships</Text>
        <View style={styles.campusCard}>
          {campusFellowships.map((campus, index) => (
            <View key={index} style={styles.campusItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.campusText}>{campus}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Campus Coordinator</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    fontWeight: "bold",
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontWeight: "bold",
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  branchCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  branchName: {
    ...TYPOGRAPHY.h3,
    fontWeight: "bold",
    marginBottom: SPACING.md,
    color: COLORS.primary,
  },
  branchDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  detailText: {
    ...TYPOGRAPHY.body,
    flex: 1,
  },
  actionButton: {
    backgroundColor: COLORS.primary + "20",
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 16,
  },
  actionButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: "500",
  },
  campusCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  campusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: SPACING.sm,
  },
  campusText: {
    ...TYPOGRAPHY.body,
  },
  contactButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: SPACING.md,
  },
  contactButtonText: {
    ...TYPOGRAPHY.button,
    color: "#FFFFFF",
  },
})
