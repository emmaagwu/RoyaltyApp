// Mock data for daily words
export type WordData = {
  id: string
  title: string
  content: string
  fullContent: string
  backgroundImage: any
  likes: number
  shares: number
  date: {
    year: number
    month: number
    day: number
  }
}

// Function to generate dynamic dates for the last 5 days
const generateDailyWords = (): WordData[] => {
  const today = new Date()
  const words: WordData[] = []

  for (let i = 0; i < 5; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    const id = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    words.push({
      id,
      title: "WORLDCHANGERS WORD FOR TODAY",
      content: getContentPreview(i),
      fullContent: getFullContent(i),
      backgroundImage: require("../assets/word-background.jpg"),
      likes: 150 - i * 10,
      shares: 80 - i * 5,
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // JavaScript months are 0-indexed
        day: date.getDate(),
      },
    })
  }

  return words
}

// Helper function to get content preview based on index
const getContentPreview = (index: number): string => {
  const contents = [
    "Highly Cherished, don't allow people's concern for your good kill the dream God put in your heart.",
    "Trust in the Lord with all your heart and lean not on your own understanding.",
    "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you.",
    "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you.",
    "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures.",
  ]

  return contents[index] || contents[0]
}

// Helper function to get full content based on index
const getFullContent = (index: number): string => {
  const fullContents = [
    `Highly Cherished, don't allow people's concern for your good kill the dream God put in your heart.

Many times, well-meaning friends and family may discourage you from pursuing God's calling because they're concerned about your welfare. They may point out the risks, the uncertainties, or the conventional path that seems safer.

Remember that Joseph's brothers mocked his dreams, and even his father questioned his vision. Yet, God's purpose prevailed in his life.

Your divine assignment may not make sense to others, but what matters is that it makes sense to God. He placed that dream in your heart for a reason.

Stand firm in your conviction. Seek wisdom and counsel, but ultimately follow the leading of the Holy Spirit. The dream God has given you is not just for your benefit but for the blessing of many.

"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future." - Jeremiah 29:11`,

    `Trust in the Lord with all your heart and lean not on your own understanding.

In all your ways acknowledge Him, and He shall direct your paths. Do not be wise in your own eyes; Fear the Lord and depart from evil. It will be health to your flesh, and strength to your bones.

When we trust in our own understanding, we limit ourselves to human wisdom and perspective. But when we trust in God, we tap into divine wisdom that sees beyond our current circumstances.

Today, practice surrendering your plans, worries, and decisions to God. Acknowledge His sovereignty in every area of your life, and watch how He directs your path in ways you couldn't have imagined.

"Trust in the Lord with all your heart, and lean not on your own understanding; In all your ways acknowledge Him, and He shall direct your paths." - Proverbs 3:5-6`,

    `For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.

When God makes a promise, He keeps it. His plans for your life are good, even when circumstances seem to suggest otherwise. In the midst of challenges, remember that God is working all things together for your good.

Just as He had a plan for the Israelites even during their exile in Babylon, He has a plan for you in every season of life. Your current situation is not your final destination.

Today, take courage in knowing that God's thoughts toward you are thoughts of peace and not of evil. He is orchestrating events and aligning circumstances to fulfill His purpose in your life.

"Call to Me, and I will answer you, and show you great and mighty things, which you do not know." - Jeremiah 33:3`,

    `Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.

Fear and discouragement are two of the enemy's most effective weapons. They paralyze us, preventing us from stepping into God's promises and fulfilling our divine purpose.

Joshua faced the daunting task of leading Israel after Moses' death. The challenge was enormous, but God's command was clear: be strong and courageous. Why? Because God's presence was guaranteed.

The same God who was with Joshua is with you today. His presence is not dependent on your performance or perfection, but on His faithful character and promises.

Whatever challenge you're facing, remember that you're not facing it alone. God is with you, empowering you with His strength and courage.

"Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go." - Joshua 1:9`,

    `The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.

In a world that constantly tells us we need more—more success, more possessions, more recognition—Psalm 23 reminds us that with the Lord as our shepherd, we lack nothing truly essential.

Like a good shepherd, God provides for our needs, gives us rest, and leads us to places of nourishment and refreshment. He knows when we need to pause and be restored.

Even in the darkest valleys of life, we can find comfort in His presence. His rod and staff—symbols of protection and guidance—are always active in our lives.

Today, rest in the assurance that you are being cared for by the Good Shepherd who knows you by name and is committed to your wellbeing.

"Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the LORD forever." - Psalm 23:6`,
  ]

  return fullContents[index] || fullContents[0]
}

export const dailyWords = generateDailyWords()

// Function to get a word for a specific date
export const getWordForDate = (year: number, month: number, day: number): WordData | null => {
  // JavaScript months are 0-indexed, but our data uses 1-indexed months
  const jsMonth = month + 1

  // Try to find an exact match
  const exactMatch = dailyWords.find(
    (word) => word.date.year === year && word.date.month === jsMonth && word.date.day === day,
  )

  if (exactMatch) {
    return exactMatch
  }

  // If no exact match, return null to indicate no word for this date
  return null
}

// Get today's word for easy access
export const getTodaysWord = (): WordData => {
  const today = new Date()
  const word = getWordForDate(today.getFullYear(), today.getMonth(), today.getDate())

  // This should always exist since we generate it, but just in case
  return word || dailyWords[0]
}
