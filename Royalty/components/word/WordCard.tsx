import { View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"
import { Text } from "../common/Text"
import { Heart, Send } from "react-native-feather"
import { COLORS, SPACING } from "../../constants/theme"
import type { WordData } from "../../mocks/word-data"

type WordCardProps = {
  data: WordData
  onExpand: (wordId: string) => void
}

export function WordCard({ data, onExpand }: WordCardProps) {
  // Display only a preview of the content (first 150 characters)
  const previewContent = data.content.length > 150 ? data.content.substring(0, 150) + "..." : data.content

  return (
    <View style={styles.container}>
      <ImageBackground source={data.backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.content}>{previewContent}</Text>

          <View style={styles.footer}>
            <View style={styles.interactions}>
              <TouchableOpacity style={styles.interactionButton}>
                <Heart width={20} height={20} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.interactionText}>{data.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.interactionButton}>
                <Send width={20} height={20} color="#FFFFFF" />
                <Text style={styles.interactionText}>{data.shares}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.expandButton} onPress={() => onExpand(data.id)}>
              <Text style={styles.expandButtonText}>Expand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 16,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: SPACING.md,
    justifyContent: "space-between",
    borderRadius: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  content: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 24,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  interactions: {
    flexDirection: "row",
    alignItems: "center",
  },
  interactionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  interactionText: {
    color: "#FFFFFF",
    marginLeft: SPACING.xs,
    fontSize: 14,
  },
  expandButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
  },
  expandButtonText: {
    color: COLORS.text,
    fontWeight: "500",
    fontSize: 14,
  },
})
