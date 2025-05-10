import { Header } from "../common/Header"

export function OutlineHeader() {
  const handleNotificationPress = () => {
    console.log("Navigate to notifications")
  }

  return <Header title="Sunday School Outline" onNotificationPress={handleNotificationPress} />
}
