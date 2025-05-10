import { Header } from "../common/Header"

export function WordHeader() {
  const handleNotificationPress = () => {
    // Navigate to notifications screen
    console.log("Navigate to notifications")
  }

  return <Header title="Word for Today" onNotificationPress={handleNotificationPress} />
}
