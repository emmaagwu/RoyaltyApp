import React, { useState } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Text, IconButton, Button } from 'react-native-paper';
import { format } from 'date-fns';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { useAuth } from '../auth-context'; // Import your auth context

export const HomeHeader = () => {
  const { user, logout } = useAuth(); // Get user and signOut from your auth context
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const today = format(new Date(), 'MMMM d');

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout(); // Call the signOut function from your auth context
      setModalVisible(false); // Close the modal after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.dateText}>Today, {today}</Text>

      {/* Profile Icon/Image */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {user?.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
        ) : (
          <IconButton
            icon="account-circle"
            size={30}
            iconColor={COLORS.primary}
          />
        )}
      </TouchableOpacity>

      {/* Modal for User Details */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* User Email */}
            <Text style={styles.modalText}>Email: {user?.email}</Text>

            {/* Go to Profile Button */}
            <Button
              mode="contained"
              onPress={() => {
                // Navigate to profile screen (you can implement this later)
                console.log('Navigate to profile');
                setModalVisible(false);
              }}
              style={styles.modalButton}
            >
              Go to Profile
            </Button>

            {/* Logout Button */}
            <Button
              mode="outlined"
              onPress={handleLogout}
              style={styles.modalButton}
            >
              Logout
            </Button>

            {/* Close Modal Button */}
            <Button
              mode="text"
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  dateText: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.text,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.md,
  },
  modalButton: {
    width: '100%',
    marginVertical: SPACING.xs,
  },
});
