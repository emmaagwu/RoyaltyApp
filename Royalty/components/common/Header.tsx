"use client"

import { useState } from "react"
import { View, StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native"
import { Text } from "./Text"
import { Bell, User, LogOut, Settings, User as UserIcon, X } from "react-native-feather"
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme"

type HeaderProps = {
  title: string
  subtitle?: string
  onNotificationPress?: () => void
}

// Mock user data
const mockUser = {
  email: "user@example.com",
  name: "John Doe",
}

export function Header({ title, subtitle, onNotificationPress }: HeaderProps) {
  const [modalVisible, setModalVisible] = useState(false)

  const handleProfilePress = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleProfileAction = () => {
    console.log("Navigate to profile")
    setModalVisible(false)
  }

  const handleSettingsAction = () => {
    console.log("Navigate to settings")
    setModalVisible(false)
  }

  const handleLogoutAction = () => {
    console.log("Logout user")
    setModalVisible(false)
  }

  return (
    <>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
            <Bell width={24} height={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleProfilePress}>
            <User width={24} height={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Account</Text>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <X width={24} height={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <User width={40} height={40} color={COLORS.primary} />
              </View>
              <Text style={styles.userName}>{mockUser.name}</Text>
              <Text style={styles.userEmail}>{mockUser.email}</Text>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.actionButton} onPress={handleProfileAction}>
              <UserIcon width={20} height={20} color={COLORS.text} />
              <Text style={styles.actionText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleSettingsAction}>
              <Settings width={20} height={20} color={COLORS.text} />
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutAction}>
              <LogOut width={20} height={20} color={COLORS.error} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    fontWeight: "bold",
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: SPACING.md,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  modalTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  userInfo: {
    alignItems: "center",
    marginVertical: SPACING.md,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary + "20", // 20% opacity
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  userName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  userEmail: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
  },
  actionText: {
    ...TYPOGRAPHY.body,
    marginLeft: SPACING.md,
    color: COLORS.text,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    marginTop: SPACING.sm,
  },
  logoutText: {
    ...TYPOGRAPHY.body,
    marginLeft: SPACING.md,
    color: COLORS.error,
  },
})
