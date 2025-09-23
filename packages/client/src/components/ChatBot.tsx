import React, { useRef, useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button.tsx'
import { ArrowUp } from 'lucide-react'
import { useForm } from 'react-hook-form'

type FormData = {
  prompt: string
}

type ChatResponse = {
  message: string
}

type Message = {
  content: string
  role: 'user' | 'bot'
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const conversationId = useRef(crypto.randomUUID())
  const { register, handleSubmit, reset, formState } = useForm<FormData>()

  const onSubmit = async ({ prompt }: FormData) => {
    setMessages((prev) => [...prev, { content: prompt, role: 'user' }])

    reset()

    const { data } = await axios.post<ChatResponse>('/api/chat', {
      prompt,
      conversationId: conversationId.current,
    })
    setMessages((prev) => [...prev, { content: data.message, role: 'bot' }])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  return (
    <div className={'container mx-auto'}>
      <div className={'flex flex-col gap-3 mb-10'}>
        {messages.map((message, index) => (
          <p
            key={index}
            className={`px-3 py-1 rounded-xl ${
              message.role === 'user'
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-100 text-black self-start'
            }`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </p>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
        className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
      >
        <textarea
          {...register('prompt', {
            required: true,
            validate: (value) => value.trim().length > 0,
          })}
          className={'w-full border-none focus:outline-none resize-none'}
          placeholder={'Ask anything'}
          maxLength={1000}
        />
        <Button
          disabled={!formState.isValid}
          size={'icon'}
          className={'rounded-full cursor-pointer'}
        >
          <ArrowUp />
        </Button>
      </form>
    </div>
  )
}

export default ChatBot
