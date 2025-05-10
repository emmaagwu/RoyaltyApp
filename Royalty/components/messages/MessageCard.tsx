"use client"

import { useState } from "react"
import { View, StyleSheet, Image, TouchableOpacity, type ImageSourcePropType } from "react-native"
import { Text } from "../common/Text"
import { Heart, Download, Share2, Play, Pause } from "react-native-feather"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"

export type MessageData = {
  id: string
  title: string
  speaker: string
  date: string
  thumbnail: ImageSourcePropType
  audioUrl: string
  isFavorite?: boolean
}

type MessageCardProps = {
  message: MessageData
  onToggleFavorite: (id: string) => void
  onDownload: (id: string) => void
  onShare: (id: string) => void
  onPlay: (id: string) => void
}

export function MessageCard({ message, onToggleFavorite, onDownload, onShare, onPlay }: MessageCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPress = () => {
    setIsPlaying(!isPlaying)
    onPlay(message.id)
  }

  return (
    <View style={styles.container}>
      <Image source={message.thumbnail} style={styles.thumbnail} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{message.title}</Text>
        <Text style={styles.speaker}>Dr. {message.speaker}</Text>
        <Text style={styles.date}>{message.date}</Text>

        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => onToggleFavorite(message.id)}>
            <Heart
              width={20}
              height={20}
              color={message.isFavorite ? COLORS.error : COLORS.textSecondary}
              fill={message.isFavorite ? COLORS.error : "none"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDownload(message.id)}>
            <Download width={20} height={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onShare(message.id)}>
            <Share2 width={20} height={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
            {isPlaying ? (
              <Pause width={20} height={20} color={COLORS.cardBackground} />
            ) : (
              <Play width={20} height={20} color={COLORS.cardBackground} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    ...TYPOGRAPHY.subtitle,
    fontWeight: "600",
    marginBottom: 2,
  },
  speaker: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  date: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACING.xs,
    width: "80%",
  },
  playButton: {
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
})
