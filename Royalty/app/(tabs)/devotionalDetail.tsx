// import React, { useEffect, useState } from 'react';
// import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
// import { Text, IconButton } from 'react-native-paper';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Link } from 'expo-router';
// import { Footer } from '@/components/Footer';
// import { db } from '@/config/firebaseConfig'; // Import your Firebase config
// import { collection, query, where, onSnapshot } from 'firebase/firestore';



// const DevotionalDetail = ({ navigation }) => {
//   const [devotional, setDevotional] = useState(null);
//   const currentDate = "2025-02-22"; // Hardcoded date string

//   // Set up a real-time listener for the devotional
//   useEffect(() => {
//     const q = query(collection(db, 'devotionals'), where('date', '==', currentDate));

//     // Subscribe to real-time updates
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       if (!querySnapshot.empty) {
//         // Get the first document (assuming there's only one devotional per day)
//         const doc = querySnapshot.docs[0];
//         setDevotional(doc.data());
//       } else {
//         console.log('No devotional found for today.');
//         setDevotional(null); // Clear the devotional if none is found
//       }
//     });

//     // Clean up the listener when the component unmounts
//     return () => unsubscribe();
//   }, [currentDate]);

//   if (!devotional) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text>Loading...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (       
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.navigationHeader}>
//           <Text style={styles.headerTitle}>{devotional.title}</Text>
//           <IconButton
//             icon="bell-outline"
//             size={24}
//             onPress={() => {}}
//           />
//           <IconButton
//             icon="account-outline"
//             size={24}
//             onPress={() => {}}
//           />
//         </View>
        
//         <View style={styles.dateSelector}>
//           <IconButton
//             icon="chevron-left"
//             size={24}
//             onPress={() => {}}
//           />
//           <Text style={styles.dateText}>{currentDate}</Text>
//           <IconButton
//             icon="chevron-right"
//             size={24}
//             onPress={() => {}}
//           />
//         </View>
//       </View>

//       <ScrollView style={styles.content}>
//         <View style={styles.devotionalCard}>
//           <LinearGradient
//             colors={['#1a1a1a', '#2d2d2d']}
//             style={styles.gradientCard}
//           >
//             <Text style={styles.devotionalText}>
//               {devotional.content}
//             </Text>
            
//             <View style={styles.interactionBar}>
//               <View style={styles.stats}>
//                 <Text style={styles.statText}>156</Text>
//                 <IconButton
//                   icon="heart-outline"
//                   size={20}
//                   iconColor="white"
//                   onPress={() => {}}
//                 />
//                 <Text style={styles.statText}>80</Text>
//                 <IconButton
//                   icon="share-outline"
//                   size={20}
//                   iconColor="white"
//                   onPress={() => {}}
//                 />
//               </View>
//               <Link href="/" asChild>
//                 <IconButton
//                   icon="window-minimize"
//                   size={24}
//                   iconColor="white"
//                   // onPress={() => navigation.goBack()}
//                   style={styles.minimizeButton}
//                 />
//               </Link>
//             </View>
//           </LinearGradient>          
//         </View>
//       </ScrollView>
//     </SafeAreaView>     
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     backgroundColor: '#fff',
//     paddingTop: 8,
//   },
//   navigationHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//   },
//   headerTitle: {
//     flex: 1,
//     fontSize: 20,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
//   dateSelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 8,
//   },
//   dateText: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginHorizontal: 16,
//   },
//   content: {
//     flex: 1,
//   },
//   devotionalCard: {
//     margin: 16,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   gradientCard: {
//     padding: 16,
//     minHeight: 200,
//   },
//   devotionalText: {
//     color: 'white',
//     fontSize: 16,
//     lineHeight: 24,
//     marginBottom: 16,
//   },
//   interactionBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   stats: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statText: {
//     color: 'white',
//     marginHorizontal: 4,
//   },
//   minimizeButton: {
//     marginLeft: 'auto',
//   },
// });

// export default DevotionalDetail;

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const DevotionalDetail = () => {
  return (
    <View>
      <Text style={{ color: "red" }}>Hello World</Text>
    </View>
  );
}

export default DevotionalDetail;