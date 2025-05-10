"use client"

import { useState } from "react"
import { View, StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native"
import { Text } from "../common/Text"
import { FileText, MoreVertical, Share2, Download, Printer, X } from "react-native-feather"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"

export type OutlineData = {
  id: string
  title: string
  date: string
  content: string[]
  teacher: string
  references: string[]
}

type OutlineCardProps = {
  data: OutlineData
  onPress: (outlineId: string) => void
}

export function OutlineCard({ data, onPress }: OutlineCardProps) {
  const [menuVisible, setMenuVisible] = useState(false)

  const handleMenuPress = () => {
    setMenuVisible(true)
  }

  const handleCloseMenu = () => {
    setMenuVisible(false)
  }

  const handleShare = () => {
    console.log("Share outline:", data.id)
    setMenuVisible(false)
  }

  const handleDownload = () => {
    console.log("Download outline:", data.id)
    setMenuVisible(false)
  }

  const handlePrint = () => {
    console.log("Print outline:", data.id)
    setMenuVisible(false)
  }

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => onPress(data.id)}>
        <View style={styles.iconContainer}>
          <FileText width={24} height={24} color={COLORS.text} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.date}>{data.date}</Text>
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <MoreVertical width={20} height={20} color={COLORS.text} />
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={handleCloseMenu}>
        <Pressable style={styles.modalOverlay} onPress={handleCloseMenu}>
          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>{data.title}</Text>
              <TouchableOpacity onPress={handleCloseMenu}>
                <X width={20} height={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
              <Share2 width={20} height={20} color={COLORS.text} />
              <Text style={styles.menuItemText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleDownload}>
              <Download width={20} height={20} color={COLORS.text} />
              <Text style={styles.menuItemText}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handlePrint}>
              <Printer width={20} height={20} color={COLORS.text} />
              <Text style={styles.menuItemText}>Print</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    marginRight: SPACING.md,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.subtitle,
    fontWeight: "600",
    marginBottom: SPACING.xs / 2,
  },
  date: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  menuButton: {
    padding: SPACING.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    width: "80%",
    padding: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuTitle: {
    ...TYPOGRAPHY.subtitle,
    flex: 1,
    marginRight: SPACING.sm,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  menuItemText: {
    ...TYPOGRAPHY.body,
    marginLeft: SPACING.md,
  },
})
