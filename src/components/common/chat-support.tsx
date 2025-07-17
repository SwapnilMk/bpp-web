import { useState } from 'react'
import { chatData, findMatchingQuestion } from '@/data/chat/chat-data'
import { Mail, MessageCircle, Phone, Send } from 'lucide-react'
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble'
import { ChatInput } from '@/components/ui/chat/chat-input'
import { ChatMessageList } from '@/components/ui/chat/chat-message-list'
import {
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatFooter,
  ExpandableChatHeader,
} from '@/components/ui/chat/expandable-chat'
import { TypingIndicator } from '@/components/ui/typing-indicator'
import { Button } from '../ui/button'

interface Message {
  role: 'user' | 'bot'
  content: string
}

export default function ChatSupport() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content:
        'Hello! How can I help you today? Please select one of these common questions:',
    },
  ])
  const [input, setInput] = useState('')
  const [showQuestions, setShowQuestions] = useState(true)
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showResolutionOptions, setShowResolutionOptions] = useState(false)
  const [showContactOptions, setShowContactOptions] = useState(false)
  const [showAllQuestions, setShowAllQuestions] = useState(false)

  const simulateTyping = async () => {
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsTyping(false)
  }

  const displayedQuestions = showAllQuestions
    ? chatData.questions
    : chatData.questions.slice(0, 3)

  const handleQuestionClick = async (
    question: (typeof chatData.questions)[0]
  ) => {
    setMessages((prev) => [...prev, { role: 'user', content: question.text }])
    setShowQuestions(false)
    await simulateTyping()
    setMessages((prev) => [...prev, { role: 'bot', content: question.answer }])
    setCurrentSuggestions(question.suggestions)
    setShowResolutionOptions(false)
  }

  const handleSuggestionClick = async (suggestion: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: suggestion }])
    await simulateTyping()
    setMessages((prev) => [
      ...prev,
      {
        role: 'bot',
        content: `Here's more information about ${suggestion}. [Additional content would be added here based on the suggestion]`,
      },
    ])
    setShowResolutionOptions(true)
    setCurrentSuggestions([])
  }

  const handleResolutionClick = async (
    resolution: (typeof chatData.resolutionOptions)[0]
  ) => {
    setMessages((prev) => [...prev, { role: 'user', content: resolution.text }])
    await simulateTyping()
    setMessages((prev) => [
      ...prev,
      { role: 'bot', content: resolution.response },
    ])
    setShowResolutionOptions(false)

    if (resolution.id === 'unresolved') {
      setShowContactOptions(true)
    }
  }

  const handleCustomQuestion = async (input: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: input }])
    await simulateTyping()

    const matchingQuestion = findMatchingQuestion(input)

    if (matchingQuestion) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content:
            'I found this answer that might help:\n\n' +
            matchingQuestion.answer,
        },
      ])
      setCurrentSuggestions(matchingQuestion.suggestions)
      setShowResolutionOptions(true)
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content:
            "I apologize, but I couldn't find a specific answer to your question. Let me connect you with our support team who can better assist you.",
        },
      ])
      setShowContactOptions(true)
    }
    setInput('')
    setShowQuestions(false)
  }

  return (
    <ExpandableChat size='md' position='bottom-right'>
      <ExpandableChatHeader className='flex-col justify-center bg-muted/60 text-center'>
        <h1 className='text-xl font-semibold'>Chat Support ✨</h1>
        <p>Get quick answers to common questions</p>
        <div className='flex items-center gap-2 pt-2'>
          <Button
            variant='secondary'
            onClick={() => {
              setMessages([
                {
                  role: 'bot',
                  content:
                    'Hello! How can I help you today? Please select one of these common questions:',
                },
              ])
              setShowQuestions(true)
              setCurrentSuggestions([])
              setIsTyping(false)
              setShowResolutionOptions(false)
              setShowContactOptions(false)
            }}
          >
            New Chat
          </Button>
        </div>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList className='bg-muted/25'>
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              variant={message.role === 'user' ? 'sent' : 'received'}
            >
              <ChatBubbleAvatar
                src=''
                fallback={message.role === 'user' ? '👤' : '🤖'}
              />
              <ChatBubbleMessage>{message.content}</ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isTyping && (
            <ChatBubble variant='received'>
              <ChatBubbleAvatar src='' fallback='🤖' />
              <ChatBubbleMessage>
                <TypingIndicator />
              </ChatBubbleMessage>
            </ChatBubble>
          )}

          {showQuestions && !isTyping && (
            <div className='mt-4 flex flex-col gap-2'>
              {displayedQuestions.map((question) => (
                <Button
                  key={question.id}
                  variant='outline'
                  className='text-left'
                  onClick={() => handleQuestionClick(question)}
                >
                  {question.text}
                </Button>
              ))}
              {!showAllQuestions && chatData.questions.length > 3 && (
                <Button
                  variant='secondary'
                  className='mt-2'
                  onClick={() => setShowAllQuestions(true)}
                >
                  Show All Questions
                </Button>
              )}
            </div>
          )}

          {currentSuggestions.length > 0 && !isTyping && (
            <div className='mt-4 flex flex-wrap gap-2'>
              {currentSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant='secondary'
                  size='sm'
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}

          {showResolutionOptions && !isTyping && (
            <div className='mt-4 flex flex-col gap-2'>
              {chatData.resolutionOptions.map((option) => (
                <Button
                  key={option.id}
                  variant='outline'
                  className='text-left'
                  onClick={() => handleResolutionClick(option)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          )}

          {showContactOptions && !isTyping && (
            <div className='mt-4 flex flex-col gap-2'>
              <Button
                variant='default'
                className='flex items-center gap-2'
                onClick={() =>
                  window.open(
                    `https://wa.me/${chatData.contactOptions.whatsapp}`
                  )
                }
              >
                <MessageCircle className='h-4 w-4' />
                Contact on WhatsApp
              </Button>
              <Button
                variant='default'
                className='flex items-center gap-2'
                onClick={() =>
                  (window.location.href = `mailto:${chatData.contactOptions.email}`)
                }
              >
                <Mail className='h-4 w-4' />
                Email Us
              </Button>
              <Button
                variant='default'
                className='flex items-center gap-2'
                onClick={() =>
                  (window.location.href = `tel:${chatData.contactOptions.phone}`)
                }
              >
                <Phone className='h-4 w-4' />
                Call Us
              </Button>
            </div>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter className='bg-muted/25'>
        <form
          className='relative flex gap-2'
          onSubmit={async (e) => {
            e.preventDefault()
            if (!input.trim()) return
            await handleCustomQuestion(input)
          }}
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='min-h-12 bg-background shadow-none'
            placeholder='Type your question...'
          />
          <Button
            className='absolute right-2 top-1/2 -translate-y-1/2 transform'
            type='submit'
            size='icon'
            disabled={!input.trim()}
          >
            <Send className='size-4' />
          </Button>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}
