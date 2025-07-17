interface ChatQuestion {
  id: number
  text: string
  answer: string
  suggestions: string[]
  keywords: string[]
}

export const chatData = {
  questions: [
    {
      id: 1,
      text: 'I forgot my password. How can I reset it?',
      answer:
        "To reset your password:\n1. Click on 'Forgot Password'\n2. Enter your email address or phone number\n3. Follow the steps to create a new password",
      suggestions: ['Account Security', 'Login Issues', 'Email Not Received'],
      keywords: [
        'password',
        'reset',
        'forgot',
        'login',
        "can't login",
        'change password',
        'new password',
        'access',
      ],
    },
    {
      id: 3,
      text: 'Why am I unable to log in to my account?',
      answer:
        "If you're unable to log in:\n1. Ensure your email and password are correct.\n2. Check your internet connection.\n3. Reset your password if you've forgotten it.\n4. Contact support if the issue persists.",
      suggestions: ['Forgot Password', 'Account Locked', 'Support'],
      keywords: [
        'login',
        "can't login",
        'issue',
        'unable',
        'access',
        'sign in',
      ],
    },
    // {
    //     id: 4,
    //     text: "What file formats are supported for uploading my documents?",
    //     answer: "The app supports the following file formats for uploads:\n1. PDF\n2. JPG\n3. PNG\nEnsure your file meets these requirements.",
    //     suggestions: ["Upload Guidelines", "Document Issues", "File Types"],
    //     keywords: ["file", "format", "upload", "document", "support", "type"]
    // },
    {
      id: 4,
      text: 'How can I refer my friends for the app?',
      answer:
        'To invite your friends:\n1. Go to the dashboard where you will find the referral code.\n2. Share this code with your friends and ask them to sign up using that code. Encourage your friends to join and explore the app.',
      suggestions: ['Share App', 'Invite Friends', 'Download Link'],
      keywords: ['invite', 'friends', 'download', 'app', 'share'],
    },
    {
      id: 5,
      text: 'How do I give feedback on the app?',
      answer:
        "To give feedback:\n1. Go to the 'Feedback' section in the app.\n2. Fill out the feedback form.\n3. Submit your suggestions, issues, or compliments.",
      suggestions: ['Feedback Form', 'App Improvement', 'Support'],
      keywords: ['feedback', 'suggestion', 'issue', 'comment', 'improve'],
    },
  ],
  contactOptions: {
    whatsapp: '+918828477674',
    email: 'bpp.headoffice@gmail.com',
    phone: '+918828477674',
  },
  resolutionOptions: [
    {
      id: 'resolved',
      text: 'Yes, my issue is resolved',
      response:
        'Great! Glad we could help. If you have any more questions, feel free to ask!',
    },
    {
      id: 'unresolved',
      text: 'No, I need more help',
      response:
        "I'm sorry to hear that. Here are ways to get additional support:",
    },
  ],
}

// Helper function to find matching question
export function findMatchingQuestion(input: string): ChatQuestion | null {
  const normalizedInput = input.toLowerCase().trim()

  // First try exact keyword match
  const exactMatch = chatData.questions.find((question) =>
    question.keywords.some((keyword) =>
      normalizedInput.includes(keyword.toLowerCase())
    )
  )
  if (exactMatch) return exactMatch

  // Then try fuzzy matching
  const words = normalizedInput.split(' ')
  for (const question of chatData.questions) {
    const matchCount = words.filter((word) =>
      question.keywords.some(
        (keyword) =>
          keyword.toLowerCase().includes(word) ||
          word.includes(keyword.toLowerCase())
      )
    ).length

    // If more than 50% of words match keywords, consider it a match
    if (matchCount / words.length > 0.5) {
      return question
    }
  }

  return null
}
