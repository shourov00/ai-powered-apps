import { useRef, useState } from 'react'
import axios from 'axios'
import TypingIndicator from '@/components/chat/TypingIndicator.tsx'
import ChatMessages, { type Message } from '@/components/chat/ChatMessages.tsx'
import ChatInput, { type ChatFormData } from './ChatInput'
import PopSound from '@/assets/sounds/pop.mp3'
import NotificationSound from '@/assets/sounds/notification.mp3'

const popAudio = new Audio(PopSound)
popAudio.volume = 0.2

const notificationAudio = new Audio(NotificationSound)
notificationAudio.volume = 0.2

type ChatResponse = {
  message: string
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const conversationId = useRef(crypto.randomUUID())

  const onSubmit = async ({ prompt }: ChatFormData) => {
    try {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }])
      setIsBotTyping(true)
      setError('')
      await popAudio.play()

      const { data } = await axios.post<ChatResponse>('/api/chat', {
        prompt,
        conversationId: conversationId.current,
      })
      setMessages((prev) => [...prev, { content: data.message, role: 'bot' }])
      await notificationAudio.play()
    } catch (error) {
      console.log(error)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsBotTyping(false)
    }
  }

  return (
    <div className={'flex flex-col h-full'}>
      <div className={'flex flex-col flex-1 gap-3 mb-10 overflow-y-auto'}>
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <p className={'text-red-500'}>{error}</p>}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  )
}

export default ChatBot
