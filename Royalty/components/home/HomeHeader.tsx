import { Header } from "../common/Header"

export function HomeHeader() {
  // Get current date
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" }
  const formattedDate = today.toLocaleDateString("en-US", options)

  const handleNotificationPress = () => {
    // Navigate to notifications screen
    console.log("Navigate to notifications")
  }

  return <Header title="Today," subtitle={formattedDate} onNotificationPress={handleNotificationPress} />
}
