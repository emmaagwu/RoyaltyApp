import { View, StyleSheet } from "react-native"
import { Text } from "../common/Text"
import { ServiceCard, type ServiceData } from "./ServiceCard"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"

type ServicesSectionProps = {
  services: ServiceData[]
  onServiceButtonPress: (navigationPath: string) => void
}

export function ServicesSection({ services, onServiceButtonPress }: ServicesSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Services</Text>

      {services.map((service) => (
        <ServiceCard key={service.id} data={service} onButtonPress={onServiceButtonPress} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h1,
    marginBottom: SPACING.md,
  },
})
