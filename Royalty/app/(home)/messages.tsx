"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text } from "../../components/common/Text"
import { SearchBar } from "../../components/common/SearchBar"
import { MessageCard, type MessageData } from "../../components/messages/MessageCard"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"

// Mock data for messages
const messagesData: MessageData[] = [
  {
    id: "1",
    title: "Reason for Worship",
    speaker: "Anya Odo",
    date: "Sunday, March 3",
    thumbnail: require("../../assets/sermon.jpeg"),
    audioUrl: "https://example.com/audio1.mp3",
    isFavorite: false,
  },
  {
    id: "2",
    title: "Loving the Right Way",
    speaker: "Anya Odo",
    date: "Sunday, March 3",
    thumbnail: require("../../assets/sermon.jpeg"),
    audioUrl: "https://example.com/audio2.mp3",
    isFavorite: true,
  },
  {
    id: "3",
    title: "Planning for a Successful Living",
    speaker: "Anya Odo",
    date: "Sunday, March 3",
    thumbnail: require("../../assets/sermon.jpeg"),
    audioUrl: "https://example.com/audio3.mp3",
    isFavorite: true,
  },
  {
    id: "4",
    title: "Blessings of Limitation",
    speaker: "Anya Odo",
    date: "Sunday, March 3",
    thumbnail: require("../../assets/sermon.jpeg"),
    audioUrl: "https://example.com/audio4.mp3",
    isFavorite: true,
  },
]

type TabType = "recent" | "favourites" | "older"

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<TabType>("recent")
  const [messages, setMessages] = useState<MessageData[]>(messagesData)

  const handleToggleFavorite = (id: string) => {
    setMessages(
      messages.map((message) => (message.id === id ? { ...message, isFavorite: !message.isFavorite } : message)),
    )
  }

  const handleDownload = (id: string) => {
    console.log("Download message:", id)
  }

  const handleShare = (id: string) => {
    console.log("Share message:", id)
  }

  const handlePlay = (id: string) => {
    console.log("Play/pause message:", id)
  }

  // Filter messages based on active tab and search query
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.speaker.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "favourites") {
      return matchesSearch && message.isFavorite
    } else if (activeTab === "older") {
      return matchesSearch // In a real app, you'd filter by date
    } else {
      return matchesSearch // Recent tab
    }
  })

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "recent" && styles.activeTab]}
          onPress={() => setActiveTab("recent")}
        >
          <Text style={[styles.tabText, activeTab === "recent" && styles.activeTabText]}>Recent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "favourites" && styles.activeTab]}
          onPress={() => setActiveTab("favourites")}
        >
          <Text style={[styles.tabText, activeTab === "favourites" && styles.activeTabText]}>Favourites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "older" && styles.activeTab]}
          onPress={() => setActiveTab("older")}
        >
          <Text style={[styles.tabText, activeTab === "older" && styles.activeTabText]}>Older</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {filteredMessages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            onToggleFavorite={handleToggleFavorite}
            onDownload={handleDownload}
            onShare={handleShare}
            onPlay={handlePlay}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
  },
  tab: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    marginRight: SPACING.xs,
  },
  activeTab: {
    backgroundColor: COLORS.text,
  },
  tabText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text,
  },
  activeTabText: {
    color: COLORS.cardBackground,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
})
